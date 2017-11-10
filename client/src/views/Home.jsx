import React from 'react'
import { Link } from 'react-router-dom'
const Home = (props) => {
	return (
		<div className='home'>
			<h1 className="title">Windr</h1>
            <img src="images/partly-cloudy-day.png" height="250px" alt=""/>
			<h5><Link to="https://darksky.net/poweredby/">Powered by Dark Sky</Link></h5>
		</div>
	)
}

export default Home