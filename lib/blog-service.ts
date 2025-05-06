import { authenticatedFetch } from './auth';

export interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
}

const API_URL = 'http://localhost:3001';

// Get all blog posts
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get a single blog post by slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
};

// Create a new blog post
export const createPost = async (post: BlogPost): Promise<BlogPost | null> => {
  try {
    const response = await authenticatedFetch(`${API_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

// Update an existing blog post
export const updatePost = async (id: number, post: BlogPost): Promise<BlogPost | null> => {
  try {
    const response = await authenticatedFetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    return null;
  }
};

// Delete a blog post
export const deletePost = async (id: number): Promise<boolean> => {
  try {
    const response = await authenticatedFetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    
    return response.ok;
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    return false;
  }
};
