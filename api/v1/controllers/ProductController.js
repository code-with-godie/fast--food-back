import Products from '../models/Product.js';
import Users from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../../../errors/not-found.js';
import BadRequestError from '../../../errors/bad-request.js';

export const createProduct = async (req, res, next) => {
    try {
         const products = await Products.create({...req.body});
        return res.status(StatusCodes.OK).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};
export const getCategoryProducts = async (req, res, next) => {
    try {
        const {query:{cat}} = req;
        let products;
        if(cat && cat !== 'all'){
            products = await Products.find({categories:{$in:cat}});
        }else{ 
            products = await Products.aggregate([{
                $sample:{size:200}
            }])
        }
        return res.status(StatusCodes.OK).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};
export const getSingleProduct = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        const product = await Products.findById(id);
        return res.status(StatusCodes.OK).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
export const getCategoryTitle = async (req, res, next) => {
    try {
            const categories = await Products.distinct('categories');
       
        return res.status(StatusCodes.OK).json({ success: true, categories });
    } catch (error) {
        next(error);
    }
};
export const getPopulary = async (req, res, next) => {
    try {
            const categories = await Products.distinct('categories').limit(6);
            const products = Products.aggregate([
                {
                    $match:{categories:{$in:categories}}
                }
            ])
        return res.status(StatusCodes.OK).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};
