import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import Paypal from '@paypal/checkout-server-sdk'
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
        const request = new Paypal.orders.OrdersCreateRequest();
        const PaypalClient = new Paypal.core.PayPalHttpClient(new Paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID,process.env.PAYPAL_CLIENT_SECRET))
         request.prefer('return=representation');
        request.requestBody({
        intent:'CAPTURE',
        purchase_units:[
            {
                amount:{
                    currency_code:'USD',
                    value:100,
                    // currency_code:'USD',
                    // item_total:{
                    //     currency_code:'USD',
                    //     value:req.body.amount,
                        
                    // }
                }
            }
        ]
    })
    const order = await PaypalClient.execute(request);  
    return res.json({success:true,id:order?.result?.id,order}) 
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