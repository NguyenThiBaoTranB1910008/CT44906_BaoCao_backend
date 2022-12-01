const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) =>{
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};

exports.findOne = async (req , res, next) =>{
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.findByName(req.params.name);
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving user with name=${req.params.name}`
            )
        );
    }
};

exports.checkAccount = async (req , res, next) =>{
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.findAccount(req.body);
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving user with id=${req.params.id}`
            )
        );
    }
};

exports.findAll = async (req , res, next) =>{
    let documents =[];

    try{
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name){
            documents = await userService.findByName(name);
        } else{
            documents = await userService.find({});
        }
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while retrieving users")
        );
    }

    return res.send(documents);
};


