const mongoose = require('mongoose') , 
      {Schema} = mongoose;

const productSchema = new Schema({
    name : {type : String , required : true} , 
    price : {type : Number , required : true} , 
    vendor : {type : String , required : true}
} , {
    timestamps : true , 
    versionKey : false
})

module.exports = mongoose.model('Product' , productSchema);