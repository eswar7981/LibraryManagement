const mongoose=require('mongoose')


const User=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"your password is too less"],
        lowercase:true,
        maxLength:40,

        validate:()=>`hi ${this.name} welcome`

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})


exports.User =mongoose.model('User',User)