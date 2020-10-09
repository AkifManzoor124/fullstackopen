import React from 'react';


const Weather = (props) => {
    if (JSON.stringify(props.weather) === '{}') {
        return (
            <div></div>
        )
    }
    else if (props.weather["success"] === false) {
        return (
            <div>
                <h2>Could not get weather</h2>
            </div>
        )
    }
    return (
        <div>
            <h3>Weather in {props.details.capital} celsius</h3>
                <h4>Temperature: {props.weather.current.temperature}</h4>
                <div>
                    {props.weather.current.weather_icons.map((icon) => <img key={icon} src={icon}></img>)}
                </div>

                <p>Wind: {props.weather.current.wind_speed} mph direction {props.weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather