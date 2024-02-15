import express from 'express';
import { createProduct, getCategoryProducts, getCategoryTitle, getSingleProduct } from '../controllers/ProductController.js';

const Router = express.Router();

Router.route('/').post(createProduct).get(getCategoryProducts);
Router.route('/nav').get(getCategoryTitle);
Router.route('/single/:id').get(getSingleProduct);

export default Router;
