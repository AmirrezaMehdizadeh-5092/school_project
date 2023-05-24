const mongose = require("mongoose");

const ImageGallery = mongose.Schema({
	image:
	{
		type:String,
	    required:true,
	},
	original_name:
	{
		type:String,
	    required:true,
	},
	caption:
	{
		type:String,
	},
    joinDate:
    {
      type:Date,
      default : Date.now
    }
})

Image = mongose.model("Image" , ImageGallery);
module.exports = Image;