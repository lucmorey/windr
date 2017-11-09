import React from 'react'
import axios from 'axios'

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
			<div>
				<h2>Edit Profile</h2>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                    <div>Name</div><input type="text" placeholder="Name" name="name" defaultValue={name} /> 
					<div>Email</div><input type="text" placeholder="Email" name="email" defaultValue={email} />
					<div>Password</div><input type="password" placeholder="Password" name="password" defaultValue={password} />
                    <div>location</div><input type="location" placeholder="Location" name="location" defaultValue={location} />

					<button>Update</button>
				</form>
                
			</div>
		)
	}
}

export default EditProfile