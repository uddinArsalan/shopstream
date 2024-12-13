import mongoose from "mongoose";
const DB_NAME = "shopstream";
const { MONGODB_URI } = process.env;
 
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};  
async function connectDB() {  
    if (!MONGODB_URI) {  
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');  
    }  
    if (cached.connection) {  
        return cached.connection;  
    }  
    if (!cached.promise) {  
        const opts = {  
            bufferCommands: false,  
        };  
        cached.promise = mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, opts);  
        console.log('MONGODB Connected')
    }  
    try {  
        cached.connection = await cached.promise;  
    } catch (e) {  
        cached.promise = undefined;  
        throw e;  
    }  
    return cached.connection;  
}  
export default connectDB;


//`${MONGODB_URI}/${DB_NAME}`