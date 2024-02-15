import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: '',
        },
        price: {
            type: String,
            default:'',
        },
        company: {
            type: String,
            default:'',
        },
        company: {
            type: String,
            default:'',
        },
        description: {
            type: String,
            default:'',
        },
        size: {
            type: String,
            default:'',
        },
        categories: {
            type: [],
        },
        ingridients: {
            type: [],
        },
        isAcoholic: {
            type: String,
        },
        glass: {
            type: String,
        },
        instructions: {
            type: [],
        },
        image: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model('products', productSchema);
