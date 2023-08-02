import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {type:String,required:true}, 
  desc: {type:String,required:true},
  category:{type:String,required:true},
  isFeatured:{type:Boolean,default:false},
  isTrending:{type:Boolean,default:false},
  imgUrl: {type:String},
  price:{type:Number,required:true,default:10000}
 
});

const Product = mongoose.model('Product', ProductSchema);

export default Product