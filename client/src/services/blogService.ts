import api from './api';

export interface BlogPost {
    _id: string;
    title: string;
    description: string;
    content: string;
    coverImage?: string;
    tags: string[];
    createdAt: string;
    readTime?: string;
}

export const fetchBlogs = async (): Promise<BlogPost[]> => {
    const { data } = await api.get('/blogs');
    return data;
};

export const fetchBlogById = async (id: string): Promise<BlogPost> => {
    const { data } = await api.get(`/blogs/${id}`);
    return data;
};