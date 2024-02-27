import { StatusCodes } from 'http-status-codes';
// import NotFoundError from '../../../errors/not-found.js';
// import BadRequestError from '../../../errors/bad-request.js';
import Order from '../models/Order.js';
import { SendEmail } from '../../../middlewares/mailServices.js';

export const createOrder = async (req, res, next) => {
    try {
        const {user:{userID:user}} = req;
         const order = await Order.create({...req.body,user});
         req.order = order;
         next();
    } catch (error) {
        next(error);
    }
};
export const getUserOrders = async (req, res, next) => {
    try {
        const {params:{userID:user}} = req;
         const orders = await Order.find({user}).populate({ path:'user', select:'name profilePic'});
        return res.status(StatusCodes.OK).json({ success: true, orders });
    } catch (error) {
        next(error);
    }
};
export const getUserOrdersItems = async (req, res, next) => {
    try {
        const {params:{orderID}} = req;
         const items = await Order.findById(orderID,{orderItems:1}).populate({path:'orderItems'})
        return res.status(StatusCodes.OK).json({ success: true, items });
    } catch (error) {
        next(error);
    }
};
// export const getCategoryProducts = async (req, res, next) => {
//     try {
//         const {query:{cat}} = req;
//         let products;
//         if(cat){
//             products = await Products.find({categories:{$in:cat}});
//         }else{
            
//             products = await Products.find({}).limit(100);
//         }
//         return res.status(StatusCodes.OK).json({ success: true, products });
//     } catch (error) {
//         next(error);
//     }
// };
// export const getCategoryTitle = async (req, res, next) => {
//     try {
//             const categories = await Products.distinct('categories');
       
//         return res.status(StatusCodes.OK).json({ success: true, categories });
//     } catch (error) {
//         next(error);
//     }
// };
// export const getPopulary = async (req, res, next) => {
//     try {
//             const categories = await Products.distinct('categories').limit(6);
//             const products = Products.aggregate([
//                 {
//                     $match:{categories:{$in:categories}}
//                 }
//             ])
//         return res.status(StatusCodes.OK).json({ success: true, products });
//     } catch (error) {
//         next(error);
//     }
// };
