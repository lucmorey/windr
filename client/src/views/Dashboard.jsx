import React from 'react'
import clientAuth from '../clientAuth'
import { Link } from 'react-router-dom'



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
		currently: {
			windBearing: 0,
			location: '',
			windGust: 0,
			temperature: 0,
			icon: ''
		},
		timezone: ''

	}
	componentDidMount() {
		clientAuth.getForecast()
		  .then(res => res.data)
		  .then(data => data.forecast)
		  .then(forecast => {
			  console.log(forecast.currently.icon)
			  this.setState({ ...forecast.currently })
		  })
	}
	render(){
		const { windBearing, location, windGust, temperature, icon} = this.state
		const { timezone } = this.state
		// console.log(this.state)
		return (
		<div className='dashboard'>
			<div>
				<img className="santaAna" src="images/wind-god.png"/>
			</div>
			<h1>{timezone}</h1>
			<h3>WindGust: {windGust} | | Temp: {temperature}</h3>
			<h3>Conditions: {icon} </h3>						
			<h1 className="compass">N</h1>
			<img style={{   transform: 'rotate('+windBearing+'deg)'}} src="images/wind-arrow-north.png" alt=""/>
			<h1 className="compass">S</h1>
			<br/>
			<h6><Link to="https://darksky.net/poweredby/">Powered by Dark Sky</Link></h6>

		</div>
	)

	}
}

export default Dashboard