import { Router } from "express";
import auth from '../middleware/auth';
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../controllers/BlogController";

const router = Router();

router.post('/createBlog', auth, createBlog);
router.get('/getBlog/:id', auth, getBlogById);
router.get('/getBlogs', auth, getBlogs);
router.put('/updateBlog', auth, updateBlog);
router.delete('/deleteBlog', auth, deleteBlog);