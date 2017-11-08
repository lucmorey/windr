import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-inverse bg-inverse">
            <Link className="navbar-brand" to="/dashboard">Windr</Link>
            
			
			{props.currentUser
				? (
					<span>
						{/* <Link to="/dashboard">Dashboard</Link> */}
						<Link to="/Edit">Account</Link>
						<Link to="/logout">LogOut</Link>
						<Link to="/Delete">Delete_Acct</Link>

					</span>
				)
				: (
					<span>              
						{/* <Link to="/login">LogIn</Link>
						<Link to="/signup">Sign-Up</Link> */}
					</span>
				)
			}
		</nav>
	)
}

export default NavBar



