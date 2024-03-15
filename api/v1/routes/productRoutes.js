import express from 'express';
import { createProduct, deleteProduct, getCategoryProducts, getCategoryTitle, getSingleProduct, updateProduct } from '../controllers/ProductController.js';

const Router = express.Router();

Router.route('/').post(createProduct).get(getCategoryProducts);
Router.route('/nav').get(getCategoryTitle);
Router.route('/single/:id').get(getSingleProduct).post(updateProduct).delete(deleteProduct);

export default Router;
