import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:[true,'please provide userwho ordered the items']
        },
        amount: {
            type: Number,
            required:[true,'please provide order amount']
        },
        address: {
            type: String,
        },
        receipt_url: {
            type: String,
        },
        paymentType: {
            type:String,
            enum: ['card','paypal','mpesa'],
            required:[true,'please payment method']
        },
        phone: {
            type: String,
        },
        orderItems: {
            type:[{type:mongoose.Schema.Types.ObjectId,ref:'products'}],
        },
    },
    { timestamps: true }
);

export default mongoose.model('orders', orderSchema);
