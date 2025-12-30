import { createContext, useContext, useState, useEffect, useCallback, ReactNode, FC } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  category: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_KEY = 'agl_blog_posts';

// Default blog posts (can be edited/deleted by admin)
const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 SEO Strategies to Boost Your Rankings in 2024',
    titleAr: '10 استراتيجيات تحسين محركات البحث لتعزيز ترتيبك في 2024',
    slug: 'seo-strategies-2024',
    excerpt: 'Discover proven SEO techniques that will help your website rank higher in search results.',
    excerptAr: 'اكتشف تقنيات تحسين محركات البحث المثبتة التي ستساعد موقعك على الترتيب الأعلى في نتائج البحث.',
    content: `<h2>Introduction</h2><p>Search Engine Optimization (SEO) continues to evolve, and staying ahead of the curve is essential for businesses looking to improve their online visibility.</p><h2>1. Focus on User Experience</h2><p>Google's algorithm increasingly prioritizes user experience. Ensure your website loads quickly, is mobile-friendly, and provides valuable content.</p><h2>2. Create Quality Content</h2><p>Content is still king. Focus on creating comprehensive, well-researched content that answers your audience's questions.</p><h2>3. Optimize for Voice Search</h2><p>With the rise of smart speakers and voice assistants, optimizing for conversational queries is more important than ever.</p><h2>Conclusion</h2><p>Implementing these strategies will help you achieve better rankings and drive more organic traffic to your website.</p>`,
    contentAr: `<h2>مقدمة</h2><p>يستمر تحسين محركات البحث في التطور، والبقاء في المقدمة أمر ضروري للشركات التي تتطلع إلى تحسين ظهورها على الإنترنت.</p><h2>1. التركيز على تجربة المستخدم</h2><p>تعطي خوارزمية جوجل الأولوية بشكل متزايد لتجربة المستخدم. تأكد من أن موقعك يتم تحميله بسرعة ومتوافق مع الجوال ويوفر محتوى قيمًا.</p>`,
    category: 'SEO',
    author: 'AdsGeniusLab Team',
    imageUrl: '/images/blog-1.jpg',
    publishedAt: '2024-11-01',
    isPublished: true,
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'The Role of Social Media Marketing in Modern Business Growth',
    titleAr: 'دور التسويق عبر وسائل التواصل الاجتماعي في نمو الأعمال الحديثة',
    slug: 'social-media-marketing-growth',
    excerpt: 'Discover how social media has become a critical growth channel for building brand visibility.',
    excerptAr: 'اكتشف كيف أصبحت وسائل التواصل الاجتماعي قناة نمو حاسمة لبناء رؤية العلامة التجارية.',
    content: `<h2>The Power of Social Media</h2><p>Social media platforms have transformed how businesses connect with their audience. With billions of active users, these platforms offer unprecedented opportunities for brand growth.</p><h2>Key Strategies</h2><p>Develop a consistent posting schedule, engage with your audience, and leverage paid advertising to maximize reach.</p>`,
    contentAr: `<h2>قوة وسائل التواصل الاجتماعي</h2><p>غيرت منصات التواصل الاجتماعي طريقة تواصل الشركات مع جمهورها.</p>`,
    category: 'Social Media',
    author: 'AdsGeniusLab Team',
    imageUrl: '/images/blog-2.jpg',
    publishedAt: '2024-11-19',
    isPublished: true,
    createdAt: '2024-11-19T10:00:00Z',
    updatedAt: '2024-11-19T10:00:00Z',
  },
  {
    id: '3',
    title: 'Content Marketing: How to Create Content That Converts',
    titleAr: 'تسويق المحتوى: كيفية إنشاء محتوى يحقق التحويل',
    slug: 'content-marketing-converts',
    excerpt: 'Learn the art of creating valuable content that drives engagement and converts visitors into loyal customers.',
    excerptAr: 'تعلم فن إنشاء محتوى قيم يدفع المشاركة ويحول الزوار إلى عملاء مخلصين.',
    content: `<h2>Understanding Your Audience</h2><p>The foundation of effective content marketing is understanding your target audience's needs, pain points, and preferences.</p>`,
    contentAr: `<h2>فهم جمهورك</h2><p>أساس تسويق المحتوى الفعال هو فهم احتياجات جمهورك المستهدف ونقاط الألم والتفضيلات.</p>`,
    category: 'Content',
    author: 'AdsGeniusLab Team',
    imageUrl: '/images/blog-3.jpg',
    publishedAt: '2024-11-20',
    isPublished: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
  },
];

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultPosts;
        }
      }
    }
    return defaultPosts;
  });

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = useCallback((post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const updatePost = useCallback((id: string, updates: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ));
  }, []);

  const deletePost = useCallback((id: string) => {
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
