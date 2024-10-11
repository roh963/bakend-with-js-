import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new Schema ({
  username:{
     type:String,
     required :[true,"user name must be required"],
     lowercase:[true,"user name will be lower case"],
     unique:true,
     trim:true,
     index:true
  },
  email:{
     type:String,
     required :[true,"email must be required"],
     lowercase:[true,"email  will be lower case"],
     unique:true,
     trim:true,
  },
  fullname:{
     type:String,
     required :[true,"full name must be required"],
     trim:true,
     index:true
  },
  avator:{
    type:String,
    required:true
  },
  coverImage:{
    type:String,
  },
  watchHistory:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
  }],
  password:{
    type:String,
    required:[true,'password isrequired']
  },
  refreshToken:{
    type:String
  }
},{
    timestamps:true
})

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next()
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
 return  await  bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken =  function () {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET
        ,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET
        ,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)