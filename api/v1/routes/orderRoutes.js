import express from 'express'
import { createOrder, getUserOrders, getUserOrdersItems } from '../controllers/ordersControlller.js';
import authorize from '../../../middlewares/authentication.js';
import { SendEmail } from '../../../middlewares/mailServices.js';
import { slowSelling } from '../controllers/ProductController.js';

const Router = express.Router()
Router.route('/').post(authorize,createOrder,SendEmail).get(authorize,getUserOrders)
Router.route('/items/:orderID').get(authorize,getUserOrdersItems);
Router.route('/slowSelling').get(slowSelling);
Router.route('/:userID').get(authorize,getUserOrders);
export default Router