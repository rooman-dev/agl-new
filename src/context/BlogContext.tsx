import { createContext, useContext, useState, useEffect, useCallback, ReactNode, FC } from 'react';
import apiService, { BlogPost } from '../services/api';

// Re-export BlogPost type for convenience
export type { BlogPost } from '../services/api';

interface BlogContextType {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  refreshPosts: () => Promise<void>;
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => Promise<BlogPost>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<BlogPost>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts on mount
  const refreshPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get all posts if authenticated, otherwise get published only
      const token = sessionStorage.getItem('agl_admin_token');
      const fetchedPosts = token 
        ? await apiService.getAllPosts()
        : await apiService.getPublishedPosts();
      
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      // Fallback to published posts if all posts fails
      try {
        const publishedPosts = await apiService.getPublishedPosts();
        setPosts(publishedPosts);
      } catch (fallbackErr) {
        setError('Failed to load posts. Please check your connection.');
        console.error('Fallback error:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  const addPost = useCallback(async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> => {
    const newPost = await apiService.createPost(post);
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  }, []);

  const updatePost = useCallback(async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
    const updatedPost = await apiService.updatePost(id, updates);
    setPosts(prev => prev.map(post => 
      post.id === id ? updatedPost : post
    ));
    return updatedPost;
  }, []);

  const deletePost = useCallback(async (id: string): Promise<void> => {
    await apiService.deletePost(id);
    setPosts(prev => prev.filter(post => post.id !== id));
  }, []);

  const getPost = useCallback((id: string) => {
    return posts.find(post => post.id === id);
  }, [posts]);

  const getPostBySlug = useCallback((slug: string) => {
    return posts.find(post => post.slug === slug);
  }, [posts]);

  const getPublishedPosts = useCallback(() => {
    return posts.filter(post => post.isPublished).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [posts]);

  const value: BlogContextType = {
    posts,
    loading,
    error,
    refreshPosts,
    addPost,
    updatePost,
    deletePost,
    getPost,
    getPostBySlug,
    getPublishedPosts,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export default BlogContext;
