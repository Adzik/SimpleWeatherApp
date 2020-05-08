import React from "react";
import {Divider, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import dayjs from "dayjs";

export default function Forecast(props) {
    const {forecast} = props;
    const result = forecast.map((item) => {
        return (
            <ListItem>
                <Divider variant="middle" />
                <ListItemText className="week-day" primary={dayjs(item.dt_txt).format("dddd")} style={{ flex: "1 1 0%", textAlign: "left" }}/>
                <span className="temp" style={{ flex: "1 1 0%", textAlign: "right" }}>
                    <Typography variant="body2" component="span" color="textPrimary">
                        {Math.round(item.min)}&deg; /{" "}
                    </Typography>
                    <Typography variant="body2" component="span" color="textSecondary">
                        {Math.round(item.max)}&deg;
                    </Typography>
                </span>
            </ListItem>
        );
    });
    return <List aria-label="forecast data">{result}</List>;
}