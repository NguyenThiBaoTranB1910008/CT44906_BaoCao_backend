const ApiError = require("../api-error");
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) =>{
    try{
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        console.log(req.body);
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
};

exports.findAll = async (req , res, next) =>{
    let documents =[];

    try{
        const orderService = new OrderService(MongoDB.client);
        const { name } = req.query;
        if (name){
            documents = await orderService.findByName(name);
        } else{
            documents = await orderService.find({});
        }
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while retrieving orders")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req , res, next) =>{
    try{
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
        if (!document){
            return next( new ApiError(404, "Order not found"));
        }
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving order with id=${req.params.id}`
            )
        );
    }
};

