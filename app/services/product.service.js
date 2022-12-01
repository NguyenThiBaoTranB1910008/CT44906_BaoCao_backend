const { ObjectId, ReturnDocument } = require("mongodb");

class ProductService{
    constructor(client){
        this.Product = client.db().collection("product");
    }

    extractConactData(payload){
        const product = {
            title: payload.title,
            imageUrl: payload.imageUrl,
            description: payload.description,
            price: payload.price,
        };
        
        return product;
    }
    
    async create(payload){
        const product = this.extractConactData(payload);
        const result = await this.Product.insertOne(
            product
        );
        return product;
    }

    async find(filter){
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id){
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        };
        const update= this.extractConactData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }
    
    async delete(id){
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll(){
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ProductService;