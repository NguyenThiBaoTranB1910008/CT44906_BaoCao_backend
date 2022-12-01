const { ObjectId, ReturnDocument } = require("mongodb");

class OrderService{
    constructor(client){
        this.Order = client.db().collection("order");
    }

    extractConactData(payload){
        const order = {
            email: payload.email,
            firstname:payload.firstname,
            lastname: payload.lastname,
            address: payload.address,
            city: payload.city,
            country: payload.country,
            products: payload.products,
        };
        

        return order;
    }
    
    async create(payload){
        const order = this.extractConactData(payload);
        const result = await this.Order.insertOne(
            order,
        );
        return order;
    }

    async find(filter){
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id){
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
}

module.exports = OrderService;