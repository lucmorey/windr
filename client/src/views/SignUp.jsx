import React from 'react'
import clientAuth from '../clientAuth'

// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: '', location: ''}
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
		clientAuth.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '', location: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				this.props.history.push('/dashboard')
			}
		})
	}
	
	render() {
		const { name, email, password, location } = this.state.fields
		return (
			<div className='signUp'>
				<h1>Sign Up</h1>
				<img src="images/cloud.png" height="200px" alt=""/>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" placeholder="Name" name="name" value={name} />
					<input type="text" placeholder="Email" name="email" value={email} />
					<input type="password" placeholder="Password" name="password" value={password} />
					<input type="location" placeholder="location" name="location" value={location} />


					<button>Log In</button>
				</form>
			</div>
		)
	}
}

export default SignUp