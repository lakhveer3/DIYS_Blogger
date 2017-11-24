const mongoose = require('mongoose')
    , Schema = mongoose.Schema;


let ingredientSchema = new Schema({
  url : String,
  procedure : String,
  title:String,
  MainIngredient :[
    {
      name:String,
      quantity:String,
      unit :String
    }
  ],
 EssentialIngredient :[
   {
     name:String,
 }]
});

module.exports = mongoose.model('details', ingredientSchema);
