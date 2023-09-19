import { TurkeyWeather } from "../src/TurkeyWeather";

const api = new TurkeyWeather();


test('Test fot non english inputs in parameters', async () => {
    expect(() => {
        api.getDistricts("niĞdE");
        api.getCenterInfo("niĞdE");
        api.LatestEvents("niĞdE");
        api.DailyForcast("niĞdE");
        api.HourlyForecast("niĞdE");
    }).not.toThrow()
})

test('Tests for correct error responses', async () => {
    await expect(api.getDistricts('NonExistingCityName')).rejects.toThrow(Error)
    await expect(api.getCenterInfo('NonExistingCityName')).rejects.toThrow(Error)
    await expect(api.LatestEvents('NonExistingCityName')).rejects.toThrow(Error)
    await expect(api.HourlyForecast('NonExistingCityName')).rejects.toThrow(Error)
    await expect(api.DailyForcast('NonExistingCityName')).rejects.toThrow(Error)
})