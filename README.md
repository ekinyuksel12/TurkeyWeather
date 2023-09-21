
# TurkeyWeather

The 'TurkeyWeather' npm module is a tool for accessing real-time weather data and weather forecast from the Turkish State Meteorological Service (MGM) website. With this module, you can effortlessly retrieve a wide range of weather information, including current conditions, daily and hourly forecasts, and the latest weather events, for any province or district in Turkey.

```js
const api = new TurkeyWeather();

api.LatestEvents('Trabzon', 'Ortahisar').then(res => {
    console.log(res.temp);
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
## License
The 'TurkeyWeather' module is released under the [MIT License](https://choosealicense.com/licenses/mit/).

# Documentation

### Create an API object
```js
const api = new TurkeyWeather();
```

### Get the names of all provinces
```js
api.getProvinceNames()
```

This function will return all of the province names in Turkey as an array of strings.

```js
[
  'Adana',
  'Adıyaman',
  'Afyonkarahisar', 
  ...
]
```

### Get general information about a center
```js
api.getCenterInfo(96101);
```

This function will return the general information about a center such as the name, province, geographical coordinates, and identifiers.

```js
{
  provinceID: 60,
  name: 'Ortahisar',
  province: 'Trabzon',
  lat: 40.9985,
  long: 39.7649,
  altitude: 39,
  centerID: 96101,
  hourlyID: 17038
}
```

The MGM API uses IDs known as `centerID`'s to differentiate between weather centers within Turkey. `centerID`'s are 5-digit codes that are used for identifying individual weather centers within API requests. For example, `93432` is the `centerID` for the Ataşehir district of İstanbul.

While you can use the `centerID` of a weather center to retrieve data for that center, you can also provide the province and district where the center is located to retrieve the `centerID` for that center. For example if you wanted to retrieve the weather center that is located in the Ataşehir district of İstanbul, you can do so by passing the province and district as parameters:

```js
api.getCenterInfo('istanbul', 'ataşehir')
```

### Get all the districts of a province
```javascript
api.getDistricts("Niğde"); //Functions also have internal character conversion.
```

This function will return an array of district objects which contains the district name and its `centerID`.
You cannot use `centerID` with this function because provinces are too vague to be a weather center.

```js
[
  { name: 'Altunhisar', centerID: 95103 },
  { name: 'Bor', centerID: 95105 },
  { name: 'Merkez', centerID: 95101 },
  { name: 'Ulukışla', centerID: 95102 },
  { name: 'Çamardı', centerID: 95106 },
  { name: 'Çiftlik', centerID: 95104 }
]
```

---
### Weather Forecasts

There are 3 functions that can give you weather forecasts:
- [`LatestEvents()`](#latestevents)
- [`DailyForecast()`](#dailyforecast)
- [`HourlyForecast()`](#hourlyforecast)

### LatestEvents()
```js
api.LatestEvents(96101)
api.LatestEvents('Trabzon', 'Ortahisar')
```

This function will return the latest events in a given weather center. Latest events are like wind speed and direction, current temperature, current humidity and more.

```js
{
  temp: 24.7,
  dataDate: '2023-09-19T11:01:00.000Z',
  eventCode: 'A',
  humidity: 55,
  pressure: 1012.6,
  precipitation: {
    now: 0,
    after10Minutes: 0,
    after1Hour: 0,
    after6Hour: 0,
    after12Hour: 0,
    after24Hour: 0
  },
  wind: { speed: 7.2, direction: 321 }
}
```

### DailyForecast()
```js
api.DailyForecast(96101)
api.DailyForecast('Trabzon', 'Ortahisar')
```

This function will return the past 5 days of weather forecasts from a given weather center as an array of daily forecast objects.

```js
[
  {
    date: '2023-09-20T00:00:00.000Z',
    event: 'PB',
    temp: { lowest: 20, highest: 25 },
    humidity: { lowest: 65, highest: 92 },
    wind: { speed: 14, direction: 15 }
  },
  {
    date: '2023-09-21T00:00:00.000Z',
    event: 'GSY',
    temp: { lowest: 21, highest: 25 },
    humidity: { lowest: 79, highest: 87 },
    wind: { speed: 10, direction: 19 }
  },
  ...
]
```

### HourlyForecast()

```js
api.HourlyForecast(96101)
api.HourlyForecast("Trabzon", "Ortahisar")
```

This function will return hourly weather forecasts of a given weather center in an array of hourly forecast objects. The forecasts are in 3 hour intervals.

```js
[
  {
    date: '2023-09-19T12:00:00.000Z',
    temp: 24,
    apparentTemp: 24,
    event: 'PB',
    humidity: 69,
    wind: { speed: 8, maxSpeed: 27, direction: 40 }
  },
  {
    date: '2023-09-19T15:00:00.000Z',
    temp: 23,
    apparentTemp: 23,
    event: 'PB',
    humidity: 68,
    wind: { speed: 2, maxSpeed: 16, direction: 51 }
  },
  ...
]
```