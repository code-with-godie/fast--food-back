//imports
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import notFound from './middlewares/notFound.js';
import connectDB from './db/connect.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import usersRoutes from './api/v1/routes/userRoutes.js';
import productRoutes from './api/v1/routes/productRoutes.js';
import paymentRoutes from './api/v1/routes/paymentRoute.js';
import orderRoutes from './api/v1/routes/orderRoutes.js';
// import { formatWines, getPizza } from './lib/lib.js';
import Product from './api/v1/models/Product.js';
//app config
dotenv.config();
const app = express();

//extra security packages
app.use(cors());
app.use(helmet());

//middlewares
app.use(express.json({ limit: 10000000000 }));
// app.use(express);

//api  routes
app.get('/api/v1/fast-food', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'my fast-food app!!!',
    });
});
// app.get('/populate', async (req, res) => {
//     let products = await getPizza();
//     // let products = formatWines()
//     products = await Product.create(products);
//     console.log(products);
//     res.json({
//         success:true,
//         message:'data populated',
//         products
//     })
// });
app.use('/api/v1/fast-food/users', usersRoutes);
app.use('/api/v1/fast-food/products', productRoutes);
app.use('/api/v1/fast-food/pay', paymentRoutes);
app.use('/api/v1/fast-food/order', orderRoutes);


//not found route
app.use(notFound);

//error handlermindleware
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server listening at port ${port}...`));
};

start();
