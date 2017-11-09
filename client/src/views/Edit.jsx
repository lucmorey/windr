import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class EditProfile extends React.Component {
	state = {
		fields: { name: this.props.currentUser.name,
				 email: this.props.currentUser.email,
				password: '',
				location: ''}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
        evt.preventDefault()
        axios({
            method: 'patch',
            url: `/api/users/${this.props.currentUser._id}`,
            data: this.state.fields
        }).then ((user) => {
            this.setState({
                fields: { 
                    name: '',
                    email: '', 
                    password: '',
                    location: '' 
                }
            })
            if (user) {
                console.log(user)
                this.props.onUpdateSuccess(user)
				this.props.history.push('/dashboard')
            }
        })
    }
	
	render() {
		const { name, email, password, location } = this.state.fields
		return (
			<div className="edit-profile">
				<h2>Edit Profile</h2>
				<img src="images/clear-day.png" height="200px" alt=""/>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <div>Name</div><input type="text" placeholder="Name" name="name" defaultValue={name} /> 
					<div>Email</div><input type="text" placeholder="Email" name="email" defaultValue={email} />
					<div>Password</div><input type="password" placeholder="New Password" name="password" defaultValue={password} />
                    <div>location</div><input type="location" placeholder="City, ST" name="location" defaultValue={location} />
					<div><button className="login-btn">Update</button></div>
					
					<Link to="/Delete">Or Delete Account</Link>
				</form>
                
			</div>
		)
	}
}

export default EditProfile