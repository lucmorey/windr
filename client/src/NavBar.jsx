import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-inverse bg-inverse">
            <Link className="navbar-brand" to="/">Windr</Link>
            
			
			{props.currentUser
				? (
					<span>
						<Link to="/locations">Locations</Link>
						<Link to="/logout">Log Out</Link>
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
		</nav>
	)
}

export default NavBar


