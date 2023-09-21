import { TurkeyWeather } from "../src/TurkeyWeather";

const api = new TurkeyWeather();


test('getProvinceNames()', async () => {
    const provinces = await api.getProvinceNames();
    expect(provinces[50]).toBe('Niğde');
    expect(provinces).toHaveLength(81);
})

test('getDistricts()',async () => {
    const districts = await api.getDistricts("Niğde");
})

test('getCenterInfo()',async () => {
    const province = await api.getCenterInfo("Trabzon");
    expect(province.provinceID).toBe(60);

    const district = await api.getCenterInfo("Trabzon", "Ortahisar");
    expect(district.provinceID).toBe(60);
    expect(district.province).toBe("Trabzon");
    expect(district.name).toBe("Ortahisar");
})

test('LatestEvents()',async () => {
    const forecast = await api.LatestEvents("Trabzon", "Ortahisar");
    expect(forecast.temp).toBeDefined;
})

test('DailyForecast()',async () => {
    const forecast = await api.DailyForecast("Trabzon", "Ortahisar");
    expect(forecast).toHaveLength(5);
    expect(forecast[0].temp).toBeDefined();
})

test('HourlyForecast()',async () => {
    const forecast = await api.HourlyForecast("Trabzon", "Ortahisar");
    expect(forecast.length).toBeGreaterThan(0);
    expect(forecast[0].temp).toBeDefined();
})