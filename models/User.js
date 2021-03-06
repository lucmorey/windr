const
mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs'),
userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String }
})

//creates hashed password

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}
//checks if password is correct
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}
//middleware, checkif password has changed
userSchema.pre('save', function(next) {
 if(this.isModified('password')) {
     this.password = this.generateHash(this.password)
 }
 next()
})

const User = mongoose.model('User', userSchema)
module.exports = User