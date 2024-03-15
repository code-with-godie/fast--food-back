import express from 'express'
import { payWithMpesa, payWithPaypal, payWithPaypalV2, payWithPaypalV2GetOrder, payWithStripe } from '../controllers/paymentController.js';

const Router = express.Router()
Router.route('/card').post(payWithStripe);
Router.route('/mpesa').post(payWithMpesa);
Router.route('/paypal').get(payWithPaypal);
Router.route('/paypalV2').post(payWithPaypalV2);
Router.route('/paypalV2GetOrder/:orderID/:payerID').get(payWithPaypalV2GetOrder);
export default Router