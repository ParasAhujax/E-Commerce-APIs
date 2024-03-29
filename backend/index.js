const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const morgan = require('morgan');
app.use(morgan('dev'))

const {checkAuth} = require('./middleware/authMiddleware')
app.use(checkAuth)

const {connectToMongoDb} = require('./connect');
connectToMongoDb("mongodb://127.0.0.1:27017/ecommerce");

const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const cartRoute = require('./routes/cartRoutes');
const orderRoute = require('./routes/orderRoutes');

app.use('/api/product',productRoute)
app.use('/api/user',userRoute)
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);


app.listen(3000,()=>{
    console.log("running on port 3000");
})