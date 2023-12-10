import express from 'express';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';
import { isAuth } from '../utils.js';
import { isAdmin } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post('/' ,isAuth ,expressAsyncHandler( async (req , res) => {
    
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({...x , product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    })

    const order =  await newOrder.save();

    //{ message: "New Order Created" , order}
    res.status(201).send({ message: "New Order Created" , order});
}));

/*
$group Stage:

It groups the documents based on the date extracted from the createdAt field, formatted as '%Y-%m-%d' (year-month-day).
orders: { $sum: 1 } calculates the total number of orders for each group.
sales: { $sum: '$totalPrice' } calculates the total sales for each group by summing up the 'totalPrice' field in each document.
$sort Stage:

It sorts the result by the grouped date (_id) in ascending order (1).
*/

orderRouter.get('/summary', isAuth , isAdmin, expressAsyncHandler(async (req, res) => {

    try{
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);
        console.log(orders);
    
        const users = await User.aggregate([ 
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        console.log(users);
    
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPrice' },
                },
            },
            { $sort: { _id: 1 } },
    
        ]);
        console.log(dailyOrders);
    
        const productCategories = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);

        console.log(productCategories);
        res.send({ users, orders, dailyOrders, productCategories });
        
    }catch(err){
        res.status(404).send({message: err.message})
    }

}));



//Before :id 
//Return the orders of current user
orderRouter.get('/mine' , isAuth , expressAsyncHandler(async (req , res) => {

    //req.user._id is come from inAuth
    const orders  = await Order.find({user: req.user._id});
    res.send(orders);
}))


orderRouter.get('/:id' ,isAuth ,expressAsyncHandler( async (req , res) => {

    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send({message: 'Order Not Found'});
    }
}))

export default orderRouter;