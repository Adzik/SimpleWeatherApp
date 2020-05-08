import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Loading from "./Loading";
import Weather from "./Weather";

export default function App() {
  const [city, setCity] = useState("Gdańsk");
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  //Odpowiada za dynamiczną zmianę aktualnej pogody dla miasta
  useEffect(() => {
    getWeather(city)
      .then(weather => {
        setCurrentWeather(weather);
        setError(null);
      })
      .catch(err => {
        console.error(
          `Problem ze znalezieniem prognozy dla miasta ${city}: `,
          err.message
        );
        setError(err.message);
      });
  }, [city, error]);
  //To samo co wyżej, tylko dla prognozy
  useEffect(() => {
    getForecast(city)
      .then(data => {
        setForecast(data);
        setError(null);
      })
      .catch(err => {
        console.error(`Problem ze znalezieniem prognozy dla miasta ${city}:`, err.message);
        setError(err.message);
      });
  }, [city, error]);
  //Przechwytywanie wpisywanej nazwy miasta
  const handleCityChange = city => {
    setCity(city);
  };
  //Wstępnie prezentuje dane, gdy wszystko idzie zgodnie z planem
  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <Container maxWidth="sm">
        <Weather
          city={city}
          currentWeather={currentWeather}
          forecast={forecast}
          onCityChange={handleCityChange}
          error={error}
        />
      </Container>
    );
  } else {
    return <Loading />;
  }
}
//Funkcja sprawdzenie, oraz przechwycenie odpowiedzi, jeśli nie ma odpowiedzi, wypisze błąd
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Błąd: Lokalizacja " + response.statusText);
  }
}
//Pobieranie aktualnej pogody dla danego miasta przy użyciu API
function getWeather(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&lang=pl&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather);
        return mappedData;
      }
    });
}
//Pobieranie prognozy...
function getForecast(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/forecast/?q=${city}&units=metric&lang=pl&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(result => {
      if (Object.entries(result).length) {
        const forecast = [];
        for (let i = 0; i < result.list.length; i += 8) {
          forecast.push(mapDataToWeatherInterface(result.list[i + 4]));
        }
        return forecast;
      }
    });
}
//Funkcja, która konwertuje dane do prezentacji
function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    wind_speed: Math.round(data.wind.speed * 3.6),
    condition: data.cod
  };
  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
  }
  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = data.main.temp_max;
    mapped.min = data.main.temp_min;
  }
  Object.keys(mapped).forEach(
    key => mapped[key] === undefined && delete data[key]
  );
  return mapped;
}
