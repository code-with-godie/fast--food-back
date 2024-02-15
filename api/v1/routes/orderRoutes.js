import express from 'express'
import { createOrder, getUserOrders, getUserOrdersItems } from '../controllers/ordersControlller.js';
import authorize from '../../../middlewares/authentication.js';

const Router = express.Router()
Router.route('/').post(authorize,createOrder).get(authorize,getUserOrders)
Router.route('/items/:orderID').get(authorize,getUserOrdersItems);
Router.route('/:userID').get(authorize,getUserOrders);
export default Router