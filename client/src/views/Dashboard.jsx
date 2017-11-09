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
		const { windBearing, location, windGust, temperature, icon} = this.state.currently
		const timezone = this.state.timezone
		return (
		<div className='dashboard'>
			{windBearing > 180 && windBearing < 340
				? (
					<div>
						<h1 className="alert">Santa Ana Winds in effect</h1>
					</div>
				)
				: null
			}
		
			<div>
			<h1 className="compass">N</h1>			
			<img className="arrow" style={{   transform: 'rotate('+windBearing+'deg)'}} src="images/wind-arrow-north.png" alt=""/>		
			<h1 className="compass">S</h1>
			</div>
			<h3>WindGust: {Math.floor(windGust)} mph | | {Math.floor(temperature)} degrees</h3>
			<img className="santaAna" src={`images/${icon}.png`} alt=""/>
			<h3>{icon}</h3>
			<h4>{this.state.user.location}</h4>	
			<br/>
			<h6 className="italic"><Link to="https://darksky.net/poweredby/">Powered by Dark Sky</Link></h6>

			
		</div>
	)
		}
	}
}

export default Dashboard