import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'user'
    },
    mediaUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Politics', 'Business', 'Health', 'Design', 'Sports', 'Technology', 'Others']
    }
}, { timestamps: true })

export default mongoose.models.blog || mongoose.model('blog', blogSchema)
