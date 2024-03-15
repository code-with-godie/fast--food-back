import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import Paypal from '@paypal/checkout-server-sdk'
import paypal from 'paypal-rest-sdk'
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
        const PaypalClient = new Paypal.core.PayPalHttpClient(new Paypal.core.SandboxEnvironment("AYgKJt_pjU92vIqidgQAdt0dt1GgySeNhVg9MLqOq3txO4lTYEkSw9fTzZkxtLxi0slumTK03pUXpjWs","ECtLDkH9cnJN2-s7gS4FS-2NtW8S4TQ3SWetQU7UvEclbDS8atUS0SHN5FElTOrtaRzKlWw40YNHRIHE"))
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
    let approvalUrl = order.result.links.find(link => link.rel === 'approve').href;
    // res.redirect(approvalUrl)
    // console.log(approvalUrl);
    return res.json({success:true,approvalUrl}) 
    // return res.json({success:true,id:order?.result?.id,order}) 
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


export const payWithPaypalV2 = async (req, res, next) => {
    const { body: { total } } = req;
    const amount = total / 100;
    console.log('Payment amount:', amount);

    try {
        paypal.configure({
            'mode': 'sandbox', // sandbox or live
            'client_id': "Ac_V17-Uqu3rwRtmzfVrjeeodF0FpDljx7GggUxmW1p5api5SlZO7QSd8e63_Z_0M4n2fhuSvXncoEzR",
            'client_secret': "EF1jnpGGuVa4og29v7zf283oRU74vOi7UqKfv9TdvC-9Ut7NRL2NuxS_v35KUfIyDgYgWtcguSE4cKIi"
        });

        let create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/failed"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": amount.toFixed(2) // Ensure total is formatted as a string with two decimal places
                },
                "description": "pay ed_cleaners"
            }]
        };

        console.log('Create payment request:', create_payment_json);

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.error('Error creating payment:', error);
                return next(error);
            } else {
                console.log('Create payment response:', payment);

                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        return res.json({ link: payment.links[i].href });
                    }
                }
                console.error('Approval URL not found in payment response');
                return next(new Error('Approval URL not found in payment response'));
            }
        });
    } catch (error) {
        console.error('Error in payWithPaypalV2:', error);
        next(error);
    }
};

export const payWithPaypalV2GetOrder = async (req,res,next)=>{
    const {params:{orderID,payerID}} = req;
    console.log('trying getting order');
    try {
    paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id':"Ac_V17-Uqu3rwRtmzfVrjeeodF0FpDljx7GggUxmW1p5api5SlZO7QSd8e63_Z_0M4n2fhuSvXncoEzR",
  'client_secret':"EF1jnpGGuVa4og29v7zf283oRU74vOi7UqKfv9TdvC-9Ut7NRL2NuxS_v35KUfIyDgYgWtcguSE4cKIi"
});
     const execute_payment_json = {
    "payer_id": payerID,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        }
    }]
  };

  paypal.payment.execute(orderID, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        next(error)
        return
    } else {
        console.log(JSON.stringify(payment));
        res.json({message:'Success',payment});
    }
});


    } catch (error) {
        next(error)
    }
}