import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    quantity: Number,
});

const Product = mongoose.model('Product', ProductSchema, 'products');

export default Product;