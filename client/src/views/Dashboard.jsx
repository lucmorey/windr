import React from 'react'
import Axios from 'axios'

// turn this into a Dashboard class component
// where state contains { forecast: null }
// in a componentDidMount() method, use the clientAuth file to send a request to
// /api/users/dashboard
// when you get the response back, update state to include the forecast data
// render accordingly


/*
function getForecast(credentials) {
	return clientAuth({ method: 'get', url: '/api/users/dashboard' })
		.then(res => {
			return res.data.forecast
		})
}*/

const Dashboard = (props) => {
	
	return (
		<div className='dashboard'>
			<h1 class="title">Your Windr Location</h1>
			<img src="images/sunAndClouds.png" height="250px" alt="Locations" />
			<img src="images/wind-arrow-north.png" alt=""/>
		</div>
	)
}

export default Dashboard