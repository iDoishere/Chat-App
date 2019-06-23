 
class dbS{
    async initDB(){         
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://idocohen:1111@cluster0-yhqcd.mongodb.net/test?retryWrites=true&w=majority";
        const client= await MongoClient.connect(uri , { useNewUrlParser: true } )   
        this.db = await client.db('chat'); 
    }   
    async getAll(collectionName){
       
        const collection = await  this.db.collection(collectionName)
        const result= await collection.find().toArray()
        return result
    } 
    async insertOne(item,collectionName){
        const collection = await this.db.collection(collectionName)
        const result= await collection.insertOne(item)
        return result
     }  
}
module.exports = dbS


 
 