const mongoose=require('mongoose');
let EmployeeSchema= new mongoose.Schema({
   name:{
       type:String,
       require:true
   },
   designation:{
       type:String,
       require:true
   },
   salary:{
       type:Number,
       require:true
   }
       
   
})
module.exports=mongoose.model('employee',EmployeeSchema);