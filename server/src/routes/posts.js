import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Helper function to convert snake_case to camelCase
const toCamelCase = (row) => ({
  id: row.id.toString(),
  title: row.title,
  titleAr: row.title_ar,
  slug: row.slug,
  excerpt: row.excerpt,
  excerptAr: row.excerpt_ar,
  content: row.content,
  contentAr: row.content_ar,
  category: row.category,
  author: row.author,
  imageUrl: row.image_url,
  publishedAt: row.published_at,
  isPublished: row.is_published,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Get all published posts (public)
router.get('/published', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM blog_posts WHERE is_published = true ORDER BY published_at DESC'
    );
    res.json(rows.map(toCamelCase));
  } catch (error) {
    console.error('Error fetching published posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all posts (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    res.json(rows.map(toCamelCase));
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get post by ID
router.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT * FROM blog_posts WHERE id = $1',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(toCamelCase(rows[0]));
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get post by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { rows } = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1',
      [slug]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(toCamelCase(rows[0]));
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new post (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      titleAr,
      slug,
      excerpt,
      excerptAr,
      content,
      contentAr,
      category,
      author,
      imageUrl,
      publishedAt,
      isPublished,
    } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO blog_posts 
        (title, title_ar, slug, excerpt, excerpt_ar, content, content_ar, category, author, image_url, published_at, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [title, titleAr, slug, excerpt, excerptAr, content, contentAr, category, author, imageUrl, publishedAt, isPublished]
    );

    res.status(201).json(toCamelCase(rows[0]));
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'A post with this slug already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update post (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      titleAr,
      slug,
      excerpt,
      excerptAr,
      content,
      contentAr,
      category,
      author,
      imageUrl,
      publishedAt,
      isPublished,
    } = req.body;

    const { rows } = await pool.query(
      `UPDATE blog_posts SET
        title = COALESCE($1, title),
        title_ar = COALESCE($2, title_ar),
        slug = COALESCE($3, slug),
        excerpt = COALESCE($4, excerpt),
        excerpt_ar = COALESCE($5, excerpt_ar),
        content = COALESCE($6, content),
        content_ar = COALESCE($7, content_ar),
        category = COALESCE($8, category),
        author = COALESCE($9, author),
        image_url = COALESCE($10, image_url),
        published_at = COALESCE($11, published_at),
        is_published = COALESCE($12, is_published),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $13
       RETURNING *`,
      [title, titleAr, slug, excerpt, excerptAr, content, contentAr, category, author, imageUrl, publishedAt, isPublished, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(toCamelCase(rows[0]));
  } catch (error) {
    console.error('Error updating post:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'A post with this slug already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete post (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'DELETE FROM blog_posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
