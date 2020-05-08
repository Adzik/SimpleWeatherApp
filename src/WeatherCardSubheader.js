import React from "react";
import dayjs from "dayjs";
require('dayjs/locale/pl');

dayjs.locale('pl')

export default function WeatherCardSubheader(props) {
    const {currentWeather} = props;
    const date = dayjs().isValid(currentWeather.date) ? currentWeather.date : "";
    const description = currentWeather.description ? currentWeather.description: "";

    return (
        <>
            <span>
                {dayjs(date).format("dddd")}, {dayjs(date).format("HH:mm")}{" "}<br />
                {description.replace( /\w\S*/g, txt => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                })}
            </span>
        </>
    );

}