import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import clientAuth from './clientAuth'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import Edit from './views/Edit'
import Delete from './views/Delete'

class App extends React.Component {
	state = { currentUser: clientAuth.getCurrentUser() }

	onLoginSuccess(user) {
		this.setState({ currentUser: clientAuth.getCurrentUser() })
	}

	logOut() {
		clientAuth.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		return (
			<div className='App'>

				<NavBar currentUser={currentUser} />

				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/logOut" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/dashboard" render={() => {
						return currentUser
							? <Dashboard currentUser={currentUser}/>
							: <Redirect to="/login" />
					}} />

					<Route path="/edit" render={(props) => {
						return currentUser
							? <Edit {...props} currentUser={currentUser} onUpdateSuccess={this.onLoginSuccess.bind(this)}/>
							: <Redirect to="/login" />
					}} />

					<Route path="/delete" render={(props) => {
						return currentUser
							? <Delete currentUser={currentUser} onDeleteSuccess={this.logOut.bind(this)} />
							: <Redirect to="/login" />
					}} />
					<Route path="/" component={Home} />

				</Switch>
			</div>
		)
	}
}

export default App