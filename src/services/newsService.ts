import { NewsItem, NewsCategory } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const WEBHOOK_URL = 'https://your-webhook-url.com/news';

const mapPostsToNews = (posts: any[]): NewsItem[] => {
  const categories: NewsCategory[] = [
    'technology',
    'politics',
    'sports',
    'business',
    'entertainment',
    'health',
    'science'
  ];

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    body: post.body,
    category: categories[post.id % categories.length],
    userId: post.userId
  }));
};

const notifyWebhook = async (category: NewsCategory) => {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    });
  } catch (error) {
    console.error('Error notifying webhook:', error);
  }
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const posts = await response.json();
    return mapPostsToNews(posts);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const fetchNewsByCategory = async (category: NewsCategory): Promise<NewsItem[]> => {
  try {
    await notifyWebhook(category);
    const allNews = await fetchNews();
    return allNews.filter(item => item.category === category);
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
};