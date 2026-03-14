import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'branch_admin'], required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
  name: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
