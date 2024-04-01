import { Request, Response } from 'express';
import Blog from '../models/blogSchema';
export const createBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content } = req.body;
        // getting the user from the token
        const userId = req.user.id; 

        const newPost = new Blog({
            title,
            content,
            userId
        });

        await newPost.save();

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }


}

export const getBlogs = async (req: Request, res: Response): Promise<void> => {

    try {

        const blogs = await Blog.find()
        if (!blogs) {
            res.status(404).json({ message: 'No blogs found' });
        }

        res.status(200).json({ blogs });

    } catch (error) {
        res.status(500).json({ message: 'internal server error occured' });
    }
}


export const getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error occurred' });
    }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id;
        const { title, content } = req.body;

        // Find the blog by ID and update it
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content }, { new: true });

        // Check if blog is not found
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error occurred' });
    }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id;

        // Find the blog by ID and delete it
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        // Check if blog is not found
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error occurred' });
    }
};