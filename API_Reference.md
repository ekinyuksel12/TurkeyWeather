## API Reference

### `new TurkeyWeather()`
Creates a new TurkeyWeather API instance.

---

### `getProvinceNames()`
**Returns:** `Promise<string[]>`  
Returns an array of all province names in Turkey.

**Example:**
```js
const provinces = await api.getProvinceNames();
```

---

### `getCenterInfo(centerID: number)`
**Parameters:**  
- `centerID` (`number`): The unique 5-digit center ID.

**Returns:** `Promise<object>`  
Returns general information about a weather center.

**Example:**
```js
const info = await api.getCenterInfo(96101);
```

---

### `getCenterInfo(province: string, district: string)`
**Parameters:**  
- `province` (`string`): Province name (case-insensitive, Turkish or English characters allowed)
- `district` (`string`): District name (case-insensitive, Turkish or English characters allowed)

**Returns:** `Promise<object>`  
Returns general information about a weather center.

**Example:**
```js
const info = await api.getCenterInfo('istanbul', 'ataşehir');
```

---

### `getDistricts(province: string)`
**Parameters:**  
- `province` (`string`): Province name

**Returns:** `Promise<Array<{ name: string, centerID: number }>>`  
Returns an array of district objects for the given province.

**Example:**
```js
const districts = await api.getDistricts('Niğde');
```

---

### `LatestEvents(centerID: number | string, district?: string)`
**Parameters:**  
- `centerID` (`number` or `string`): Center ID or province name
- `district` (`string`, optional): District name if using province name

**Returns:** `Promise<object>`  
Returns the latest weather events for the specified center.

**Example:**
```js
const latest = await api.LatestEvents(96101);
// or
const latest = await api.LatestEvents('Trabzon', 'Ortahisar');
```

---

### `DailyForecast(centerID: number | string, district?: string)`
**Parameters:**  
- `centerID` (`number` or `string`): Center ID or province name
- `district` (`string`, optional): District name if using province name

**Returns:** `Promise<object[]>`  
Returns an array of daily forecast objects for the specified center.

**Example:**
```js
const daily = await api.DailyForecast(96101);
// or
const daily = await api.DailyForecast('Trabzon', 'Ortahisar');
```

---

### `HourlyForecast(centerID: number | string, district?: string)`
**Parameters:**  
- `centerID` (`number` or `string`): Center ID or province name
- `district` (`string`, optional): District name if using province name

**Returns:** `Promise<object[]>`  
Returns an array of hourly forecast objects for the specified center.

**Example:**
```js
const hourly = await api.HourlyForecast(96101);
// or
const hourly = await api.HourlyForecast('Trabzon', 'Ortahisar');
```
