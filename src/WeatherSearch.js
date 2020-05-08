import React, {useEffect, useState} from "react";
import {CircularProgress, FormControl, Grid, Input, InputAdornment, InputLabel, Typography} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import useDebounce from "./use-debounce";

const useStyles = makeStyles(theme => ({
    error: {
        color: "red",
        padding: "10px"
    },
    search: {
        marginTop: "10px",
        float: "right"

    }
}));

export default function WeatherSearch(props){
    const classes = useStyles();
    const {onCityChange, error} = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setSearching] = useState (false);
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const hasError = !!error;


    const handleSearch = event => {
        setSearching(true);
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (debouncedSearchTerm){
            onCityChange(debouncedSearchTerm);
            setSearching(false);
        }
    }, [onCityChange, debouncedSearchTerm, isSearching]);

    return (
        <div className={classes.search}>
            <Grid container alignItems="flex-end">
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <FormControl>
                        <InputLabel htmlFor="search-city">Wpisz miasto</InputLabel>
                        <Input id="search-city" role="search" type="text" error={hasError} onChange={handleSearch} startAdornment={
                            <inputAdornment position="start">
                                <Search/>
                            </inputAdornment>
                        }
                               endAdornment={
                                   isSearching && (
                                       <InputAdornment position="end">
                                   <CircularProgress size={20}/>
                                   </InputAdornment>
                                   )
                               }
                               />
                        {error && (
                            <Typography className={classes.error}>{error}</Typography>
                        )}
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}