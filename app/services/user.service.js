const { ObjectId, ReturnDocument } = require("mongodb");

class UserService{
    constructor(client){
        this.User = client.db().collection("users");
    }

    extractConactData(payload){
        const user = {
            name:payload.name,
            phone:payload.phone,
            pass: payload.pass,
        };
        

        return user;
    }
    
    async create(payload){
        const user = this.extractConactData(payload);
        const result = await this.User.insertOne(
            user,
        );
        return user;
    }

    async find(filter){
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.User.findOne({
            name:name,
        });
    }

    async findAccount(payload){
        var user= await this.User.findOne({
            name: payload.name,
            pass: payload.pass
        })
        if(user==null)
        return false;
        return true;
    }

    async findById(id){
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

}

module.exports = UserService;