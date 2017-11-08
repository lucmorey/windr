const User = require('../models/User.js')
const signToken = require('../serverAuth.js').signToken
const geocoder = require('geocoder')
const request = require('request')

module.exports = {
    //list all users
    index: (req, res) => {
        User.find({}, (err, users) => {
            res.json(users)
        })
    },
    //get one user
    show: (req, res) => {
		// 1. find user
        User.findById(req.user._id, (err, user) => {
			// 2. using user.location, get coordinates with geocoder
			geocoder.geocode(user.location, (err, data) => {
				// 3. combine user info with coordinates, call it "userInfo"
				const userInfo = {...user.toObject(), coordinates: data.results[0].geometry.location}
				// 4. build the api url out of api key and coordinates:
				const apiURL = `https://api.darksky.net/forecast/${process.env.DARKSKY}/${userInfo.coordinates.lat},${userInfo.coordinates.lng}`
				// 5. send request to apiURL
				request(apiURL, (err, response, body) => {
					// 6. when we get response from darksky, place the daily forecast in our userInfo object
					const { currently, timezone } = JSON.parse(body)
					const forecast = {
						currently,
						timezone
					}
					Object.assign(userInfo, { forecast })
					// 7. send back all user info:
					res.json(userInfo)
				})
			})
        })
    },

    //create new user
    create: (req, res) => {
        User.create(req.body, (err, user) => {
            if(err) return res.json({success: false, code: err.code})
            //create token to log in:
            const token = signToken(user)
            res.json({success: true, message: "User created, with token", token})
        })
    },

    // update an existing user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				res.json({success: true, message: "User updated.", user})
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			res.json({success: true, message: "User deleted.", user})
		})
	},

	// login route
	authenticate: (req, res) => {
		// check if user exists
		User.findOne({email: req.body.email}, (err, user) => {
			// if no user / password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	}

}