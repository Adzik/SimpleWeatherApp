import React from "react";
import AppStyle from "./AppStyle";

export default function Weather(props){
    const {currentWeather, forecast, city, onCityChange, error} = props;
    if (currentWeather && forecast)
    {
        return (
            <div>
                <AppStyle currentWeather={currentWeather} forecast={forecast} city={city} onCityChange={onCityChange} error={error}/>
            </div>
        );
    }
}