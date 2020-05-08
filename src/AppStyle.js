import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, Divider, Typography, Grid} from "@material-ui/core";
import Forecast from "./Forecast";
import WeatherCardSubheader from "./WeatherCardSubheader";
import WeatherSearch from "./WeatherSearch";

const useStyles = makeStyles(theme => ({
    atmospheric: {
        fontSize: "28px",
        padding: "5px"
    },
    buttons: {
        color: "black"
    },
    card: {
        minWidth: 600,
        minHeight: 600
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    error: {
        color: "red",
        padding: "10px"
    },
    fullList: {
        width: "auto"
    },
    layout: {
        marginTop: "20px"
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    root: {
        flexGrow: 1,
        color: "black"
    },
    search: {
        marginTop: "100px"
    },
}));

export default function AppLayout(props) {
    const classes = useStyles();
    const {currentWeather, forecast, city, onCityChange, error} = props;
    return (
        <div className={classes.layout}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WeatherCard currentWeather={currentWeather} forecast={forecast} city={city} onCityChange={onCityChange} error={error}/>
                </Grid>
            </Grid>
        </div>
    )
}
const WeatherCard = props => {
    const {currentWeather, forecast, city, onCityChange, error} = props;
    return (
        <Card>
            <WeatherSearch city={city} onCityChange={onCityChange} error={error}/>
            <CardHeader title={currentWeather.city + ", " + currentWeather.country} subheader={<WeatherCardSubheader currentWeather={currentWeather}/>}/>
            <CardContent>
                <Divider variant="middle" />
                <Typography className="big-temp" color="textPrimary" style={{fontSize: "28px", fontFamily: "Montserrat", float: "left", paddingTop: "10px"}}>
                    {Math.round(currentWeather.temperature)}&deg;C
                </Typography>
                <Typography variant="subtitle2" className="atmospheric-conditions" color="textSecondary" gutterBottom style={{ paddingTop: "55px" }}>
                    <Typography>Prędkość wiatru: {currentWeather.wind_speed} km/h</Typography>
                    <Typography>Wilgotność powietrza: {currentWeather.humidity}%</Typography>
            </Typography>
                <Divider variant="middle" />
                <Forecast forecast={forecast} />
            </CardContent>
        </Card>
    );
};