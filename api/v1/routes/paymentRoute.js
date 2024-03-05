import express from 'express'
import { payWithMpesa, payWithPaypal, payWithStripe } from '../controllers/paymentController.js';

const Router = express.Router()
Router.route('/card').post(payWithStripe);
Router.route('/mpesa').post(payWithMpesa);
Router.route('/paypal').get(payWithPaypal);
export default Router