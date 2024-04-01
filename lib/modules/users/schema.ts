import * as mongoose from 'mongoose';
import { IUserModel } from './model';
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        first_name:{type: String, required: true},
        middle_name:{type: String, required: true},
        last_name: {type: String, required: true}
    },
    email:{type: String, required: true},
    phone_number:{type: String, required: true},
    gender:{type: String, required: false},
    posts: [{ type: Schema.Types.ObjectId, ref: 'posts', required: false }] ,// Array of ObjectIds referencing the Post model
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', required: false }],
    password:{type: String, required: true},
    token: {type: String, required: false},
    rol: {type: String, required: false},
    }
    
);

schema.methods.encryptPassword = async (password:String) => {
    const salt = await bcrypt.genSalt(10);
    console.log("Salt: " + salt);
    return bcrypt.hash(password, salt);
  };
  
  schema.methods.validatePassword = async function (password:String) {
    console.log("Validate password: " + password + ", " + this.password)
    return bcrypt.compare(password, this.password);
  };


export default mongoose.model<IUserModel>('users', schema);
