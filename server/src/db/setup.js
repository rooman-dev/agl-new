import pool from '../config/database.js';

export async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Setting up database tables...');

    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ admin_users table created');

    // Create blog_posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        title_ar VARCHAR(500),
        slug VARCHAR(500) UNIQUE NOT NULL,
        excerpt TEXT,
        excerpt_ar TEXT,
        content TEXT,
        content_ar TEXT,
        category VARCHAR(100),
        author VARCHAR(200),
        image_url VARCHAR(500),
        published_at TIMESTAMP WITH TIME ZONE,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ blog_posts table created');

    // Create index on slug for faster lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
    `);
    
    // Create index on is_published for filtering
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
    `);
    console.log('✅ Indexes created');

    // Insert default admin user if not exists (password: agl@admin2024)
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash('agl@admin2024', 10);
    
    await client.query(`
      INSERT INTO admin_users (username, password_hash)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING;
    `, ['admin', hashedPassword]);
    console.log('✅ Default admin user created (username: admin)');

    // Insert sample blog posts if table is empty
    const { rows } = await client.query('SELECT COUNT(*) FROM blog_posts');
    if (parseInt(rows[0].count) === 0) {
      await client.query(`
        INSERT INTO blog_posts (title, title_ar, slug, excerpt, excerpt_ar, content, content_ar, category, author, image_url, published_at, is_published)
        VALUES 
        (
          '10 SEO Strategies to Boost Your Rankings in 2024',
          '10 استراتيجيات تحسين محركات البحث لتعزيز ترتيبك في 2024',
          'seo-strategies-2024',
          'Discover proven SEO techniques that will help your website rank higher in search results.',
          'اكتشف تقنيات تحسين محركات البحث المثبتة التي ستساعد موقعك على الترتيب الأعلى في نتائج البحث.',
          '<h2>Introduction</h2><p>Search Engine Optimization (SEO) continues to evolve, and staying ahead of the curve is essential for businesses looking to improve their online visibility.</p><h2>1. Focus on User Experience</h2><p>Google''s algorithm increasingly prioritizes user experience. Ensure your website loads quickly, is mobile-friendly, and provides valuable content.</p><h2>2. Create Quality Content</h2><p>Content is still king. Focus on creating comprehensive, well-researched content that answers your audience''s questions.</p><h2>3. Optimize for Voice Search</h2><p>With the rise of smart speakers and voice assistants, optimizing for conversational queries is more important than ever.</p><h2>Conclusion</h2><p>Implementing these strategies will help you achieve better rankings and drive more organic traffic to your website.</p>',
          '<h2>مقدمة</h2><p>يستمر تحسين محركات البحث في التطور، والبقاء في المقدمة أمر ضروري للشركات التي تتطلع إلى تحسين ظهورها على الإنترنت.</p>',
          'SEO',
          'AdsGeniusLab Team',
          '/images/blog-1.jpg',
          '2024-11-01',
          true
        ),
        (
          'The Role of Social Media Marketing in Modern Business Growth',
          'دور التسويق عبر وسائل التواصل الاجتماعي في نمو الأعمال الحديثة',
          'social-media-marketing-growth',
          'Discover how social media has become a critical growth channel for building brand visibility.',
          'اكتشف كيف أصبحت وسائل التواصل الاجتماعي قناة نمو حاسمة لبناء رؤية العلامة التجارية.',
          '<h2>The Power of Social Media</h2><p>Social media platforms have transformed how businesses connect with their audience. With billions of active users, these platforms offer unprecedented opportunities for brand growth.</p><h2>Key Strategies</h2><p>Develop a consistent posting schedule, engage with your audience, and leverage paid advertising to maximize reach.</p>',
          '<h2>قوة وسائل التواصل الاجتماعي</h2><p>غيرت منصات التواصل الاجتماعي طريقة تواصل الشركات مع جمهورها.</p>',
          'Social Media',
          'AdsGeniusLab Team',
          '/images/blog-2.jpg',
          '2024-11-19',
          true
        ),
        (
          'Content Marketing: How to Create Content That Converts',
          'تسويق المحتوى: كيفية إنشاء محتوى يحقق التحويل',
          'content-marketing-converts',
          'Learn the art of creating valuable content that drives engagement and converts visitors into loyal customers.',
          'تعلم فن إنشاء محتوى قيم يدفع المشاركة ويحول الزوار إلى عملاء مخلصين.',
          '<h2>Understanding Your Audience</h2><p>The foundation of effective content marketing is understanding your target audience''s needs, pain points, and preferences.</p>',
          '<h2>فهم جمهورك</h2><p>أساس تسويق المحتوى الفعال هو فهم احتياجات جمهورك المستهدف ونقاط الألم والتفضيلات.</p>',
          'Content',
          'AdsGeniusLab Team',
          '/images/blog-3.jpg',
          '2024-12-03',
          true
        );
      `);
      console.log('✅ Sample blog posts inserted');
    }

    console.log('\n🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run setup if called directly
setupDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
