import React from 'react'
import Axios from 'axios'
import clientAuth from '../clientAuth'


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


// const Dashboard = (props) => {
	
// 	return (
// 		<div className='dashboard'>
// 			<h1 class="title">Your Windr Location</h1>
// 			<img src="images/sunAndClouds.png" height="250px" alt="Locations" />
// 			<img src="images/wind-arrow-north.png" alt=""/>
// 		</div>
// 	)
// }


class Dashboard extends React.Component {
	state = {
		forecast: {windBearing: null}
	}
	componentDidMount() {
		return clientAuth.getForecast().then(res => {
			console.log(res.data.forecast.windBearing)
			this.setState( {forecast: {windBearing: res.data.forecast.windBearing + 180}})
			return res.data.forecast
		})
	}
	render(){
		return (
		<div className='dashboard'>
			<h1 class="title">Local Wind Report</h1>
			<h3>City, ST</h3>
			<h3>Temp</h3>
			<h1 class="compass">N</h1>
			<img style={{   transform: 'rotate('+this.state.forecast.windBearing+'deg)'}} src="images/wind-arrow-north.png" alt=""/>
			<h1 class="compass">S</h1>

		</div>
	)

	}
}

export default Dashboard