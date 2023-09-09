import  {mongoose} from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  photoUrl: { type: String, default: '' }, // Additional field: profile photo URL
});

const User = mongoose.model('User', userSchema);

export default User