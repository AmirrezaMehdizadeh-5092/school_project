const mongose = require("mongoose");

const StudentInfo = mongose.Schema({
	first_name:
	{
		type:String,
	    required:true,
	},
	last_name:
	{
		type:String,
	    required:true,
	},
    code_meli:
    {
        type:String,
	    required:true,
        index:
	    {
	      unique:true,
	      dropDups:true
	    }
    },
    reshte_diplom:
	{
		type:String,
	    required:true,
	},
    university:
    {
        type:String,
	    required:true,
    },
	reshte:
	{
		type:String,
        required : true,
	},
    year:
    {
        type:String,
        required : true,
    },
    image:
    {
        type:String,
        required : true,
    },
    original_image_name:
	{
		type:String,
	    required:true,
	},
    joinDate:
    {
      type:Date,
      default : Date.now
    }
})

Student = mongose.model("Student" , StudentInfo);
module.exports = Student;