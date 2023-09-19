import { TurkeyWeather } from "../src/TurkeyWeather";

const api = new TurkeyWeather();


test('getProvinceNames()', async () => {
    const provinces = await api.getProvinceNames();
    expect(provinces[50]).toBe('Niğde');
    expect(provinces).toHaveLength(81);
})

test('getDistricts()',async () => {
    const districs = await api.getDistricts("Niğde");
})

test('getCenterInfo()',async () => {
    const province = await api.getCenterInfo("Trabzon");
    expect(province.provinceID).toBe(60);

    const distric = await api.getCenterInfo("Trabzon", "Ortahisar");
    expect(distric.provinceID).toBe(60);
    expect(distric.province).toBe("Trabzon");
    expect(distric.name).toBe("Ortahisar");
})

test('LatestEvents()',async () => {
    const forecast = await api.LatestEvents("Trabzon", "Ortahisar");
    expect(forecast.temp).toBeDefined;
})

test('DailyForecast()',async () => {
    const forecast = await api.DailyForcast("Trabzon", "Ortahisar");
    expect(forecast).toHaveLength(5);
    expect(forecast[0].temp).toBeDefined();
})

test('HourlyForecast()',async () => {
    const forecast = await api.HourlyForecast("Trabzon", "Ortahisar");
    expect(forecast.length).toBeGreaterThan(0);
    expect(forecast[0].temp).toBeDefined();
})