import React from 'react'
import clientAuth from '../clientAuth'
import { Link } from 'react-router-dom'

class LogIn extends React.Component {
	state = {
		fields: { email: '', password: ''}
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
		clientAuth.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/dashboard')
			}
		})
	}
	
	render() {
		const { email, password } = this.state.fields
		return (
			<div className='LogIn'>
				<h1>Windr</h1>
				<h3>Local Wind Report</h3>
                <img src="images/wind-god.png" height="250px" alt=""/>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" placeholder="Email" name="email" value={email} />
					<input type="password" placeholder="Password" name="password" value={password} />
					<hr/>
					<button>Log In</button>
				</form>				
				<h4>or</h4>
				<h4><Link to="/SignUp">Sign-Up</Link></h4>
				<br/>
				<h6><Link to="https://darksky.net/poweredby/">Powered by Dark Sky</Link></h6>
			</div>
		)
	}
}

export default LogIn