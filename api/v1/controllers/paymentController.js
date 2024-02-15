import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
export const payWithStripe = async  (req,res,next)=>{
    try {
        const stripe = new Stripe(process.env.STRIPE_KEY);
        stripe.charges.create({
            source:req.body.tokenId,
            amount:req.body.amount,
            currency:'usd'
        },(stripeError,stripeRes)=>{
            if(stripeError){
               return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false,message:stripeError})
            }
            return  res.status(StatusCodes.OK).json({success:true,payment:stripeRes})

        })
    } catch (error) {
        next(error)
    }
}
export const payWithPaypal = async  (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
export const payWithMpesa = async  (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}