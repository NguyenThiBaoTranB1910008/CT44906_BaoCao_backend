const { ObjectId, ReturnDocument } = require("mongodb");

class CartService{
    constructor(client){
        this.Cart = client.db().collection("cart");
    }

    extractConactData(payload){
        const cart = {
            title: payload.title,
            imageUrl:payload.imageUrl,
            quatity: payload.quatity,
            price: payload.price,
            idproduct: payload.idproduct,
        };
        
        return cart;
    }
    
    async create(payload){
        const cart = this.extractConactData(payload);
        const result = await this.Cart.insertOne(
            cart,
        );
        return cart;
    }

    async find(filter){
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }

    async findById(id){
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        };
        const update= this.extractConactData(payload);
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }
    
    async delete(id){
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll(){
        const result = await this.Cart.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = CartService;