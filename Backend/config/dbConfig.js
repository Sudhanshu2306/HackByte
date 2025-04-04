import mongoose from "mongoose"
export const ConnectDB = async () => {
    try{
                await mongoose.connect(`${process.env.MONGOURL}/${process.env.DBNAME}`);
        console.log("MongoDB is Connected!!");
    }catch(error){
        console.log("Error has occured while connecting to mongodb",error)
        process.exit(1);

    }
}