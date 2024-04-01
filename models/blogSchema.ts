import mongoose, { Schema, Document } from 'mongoose';

export interface BlogInterface extends Document {
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true }, // Assuming userId is a string
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<BlogInterface>('Blog', BlogSchema);
