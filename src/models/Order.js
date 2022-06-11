import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    products: Array,
    total: String,
    customer: Object,
    created_at: Date,
    updated_at: Date,
    status: String,
    events: Array,
    driver: Object,
    location: String,
});

const Order = mongoose.model('Order', OrderSchema, 'orders');

export default Order;