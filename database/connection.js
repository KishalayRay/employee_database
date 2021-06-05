const mongoose = require('mongoose');
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect('mongodb://localhost:27017/EmployeeDatabase',{
          useCreateIndex:true,
          
          useNewUrlParser:true,
          useUnifiedTopology:true,
          useFindAndModify:false,
        })
        console.log(`connection sucessfull ${conn.connection.host}`)
    }catch(e){
        console.log(e);
        process.exit(1);
    }

}
module.exports = connectDB;