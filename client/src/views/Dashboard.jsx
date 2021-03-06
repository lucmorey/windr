import React from 'react'
import clientAuth from '../clientAuth'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
	state = {
		currently: {
			windBearing: 0,
			location: '',
			windGust: 0,
			temperature: 0,
			icon: ''
		},
		timezone: '',
		user: null

	}

	componentDidMount() {
		clientAuth.getForecast()
		  .then(res => res.data)
		  .then(data => data.forecast)
		  .then(forecast => {
			  this.setState({ ...forecast })
		  })
		  clientAuth.getUser(this.props.currentUser._id) 
			.then((res) => {
				 this.setState({user:res.data})
			})
	}
	render(){
		if (!this.state.user || !this.state.currently){
			return <h1>Loading Data</h1>
		}
		else {
		const { windBearing, windGust, temperature, icon} = this.state.currently
		
		return (
		<div className='dashboard'>
			<h1 className="italic">Current Conditions</h1>		
			{windBearing < 180 
				? (
					<div>
						<h3 className="alertRed">Santa Ana Winds in effect</h3>
					</div>
				)
				: <div>
						<h3 className="alertBlue">Ocean Breeze in effect</h3>
					</div>
			}
		

			<div className="compass">	
				<h3>N</h3>			
				<div className="needle">
				<img className="arrow" style={{transform: 'rotate('+ (windBearing + 180) +'deg)'}} src="images/wind-arrow-north.png" height="200px" alt=""/>		
				</div>
				<h3>S</h3>
			</div>
			<div className="weather">
				<div className="left">
					<h2>WindGusts: {Math.floor(windGust)} mph</h2>
				</div>
				<div className="right">
				<img className="santaAna" src={`images/${icon}.png`} alt=""/>
					<div className="weather-report">
					<h2 id="temperature">{Math.floor(temperature)}°</h2>
				<h3>{icon}</h3>
				<h4>{this.state.user.location}</h4>
				</div>
				</div>
			</div>

			<br/>
			<h5 className="italic"><Link to="https://darksky.net/poweredby/">Powered by Dark Sky</Link></h5>

			
		</div>
	)
		}
	}
}

export default Dashboard