import axios, { AxiosInstance } from "axios";
import {constants} from "crypto";
import {Agent} from "https";

import { convertCityInfo, convertDailyResponse, convertHourlyResponse, convertLatestEventsResponse, convertTurkishCharacters } from './converters'
import { CastedDailyForecast, CastedHourlyForecast, CastedLatestEvents, CenterResponse, DailyWeatherResponse, District, HourlyWeatherResponse, LatestEventsResponse } from "./types";
import { CastedCenterInfo } from "./types";



/**
 * Provides access to real-time weather data and forecasts from the Turkish State Meteorological Service (MGM) website.
 *
 * The `TurkeyWeather` class allows you to retrieve a wide range of weather information for specific provinces and districts in Turkey.
 * You can access current conditions, daily and hourly forecasts, as well as the latest weather events.
 *
 * @class
 * @export
 * @typedef {TurkeyWeather}
 */
export class TurkeyWeather {
    private _axiosInstance: AxiosInstance;

    /**
     * Creates an initializes an instance of TurkeyWeather.
     *
     * @constructor
     */
    constructor() {
        // Create an Axios instance with specific configuration for interacting with the Turkish Meteorological Service API.
        this._axiosInstance = axios.create({
            baseURL: 'https://servis.mgm.gov.tr/web/',
            headers: {
                Referer: 'https://www.mgm.gov.tr/',
                Origin: 'https://www.mgm.gov.tr',
                Host: 'servis.mgm.gov.tr'
            },
            httpsAgent: new Agent({
                secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT
            })
        })
    }

    // Private helper function to fetch the center ID from a given province name and, optionally, a district name.
    private async getCenterIDfromName(provinceName: string, districtName: string = '') {
        const res = await this.getCenterInfo(provinceName, districtName);

        return res.centerID;
    }

    /**
     * Retrieves a list of all province names in Turkey.
     * https://servis.mgm.gov.tr/web/merkezler/iller
     * 
     * This function fetches the names of all provinces in Turkey from the Turkish Meteorological Service API and returns them as an array. The provinces are sorted in ascending order based on their license plate numbers.
     *
     * @async
     * @returns {Promise<string[]>} A Promise that resolves to an array of province names.
     *
     * @example
     * // Retrieve a list of all province names in Turkey
     * const provinces = await getProvinceNames();
     * console.log(provinces); // ['Adana', 'Adıyaman', 'Afyonkarahisar', ...]
     */
    async getProvinceNames() {
        var res: CenterResponse[] = (await this._axiosInstance.get('merkezler/iller')).data
        //Sorts all provinces by their license plate number ascending order.
        res.sort((a, b) => {
            return a.ilPlaka - b.ilPlaka
        })

        //Extract the names form the API response
        const centers = res.map(center => center.il)

        return centers
    }


    /**
     * Retrieves general information about a weather center by providing its ID or name.
     * https://servis.mgm.gov.tr/web/merkezler?merkezid=
     * 
     * This asynchronous function fetches information about a weather center in Turkey based on either its province name or center ID.
     *
     * @async
     * @param {(string | number)} centerInput - The province name or center ID to retrieve information for.
     *   - If a string, it should contain the province name.
     *   - If a number, it should represent the center ID.
     * @param {string} [districtName=''] - Optional. If provided, the function returns district information instead of the default district for the specified province.
     * @returns {Promise<CastedCenterInfo>} A Promise that resolves to an object containing general information about the weather center.
     *
     * @throws {Error} Throws an error if the specified province or center is not found in the system.
     *
     * @example
     * // Retrieve information for a province by name
     * const provinceInfo = await getCenterInfo('Istanbul');
     *
     * @example
     * // Retrieve information for a specific district within a province
     * const districtInfo = await getCenterInfo('Ankara', 'Kecioren');
     */
    async getCenterInfo(centerInput: string | number, districtName: string = ''): Promise<CastedCenterInfo> {
        var urlPath: string;

        // Check if the given parameter is a province name or a centerID.
        // If it's not either throw an error.
        if (typeof centerInput === 'string') {
            centerInput = convertTurkishCharacters(centerInput);
            urlPath = 'merkezler?il=' + centerInput;

            // If there is a district name given, add it to the URL path.
            if (districtName !== '') {
                districtName = convertTurkishCharacters(districtName);
                urlPath = urlPath + '&ilce=' + districtName;
            }
        }

        else if (typeof centerInput === 'number') {
            urlPath = 'merkezler?merkezid=' + centerInput;
        }

        else {
            throw new Error("Invalid center argument")
        }

        const res: CenterResponse = (await this._axiosInstance.get(urlPath)).data[0]

        if (!res) {
            throw new Error("City not found in the system")
        }

        const castedRes: CastedCenterInfo = await convertCityInfo(res)

        return castedRes
    }


    /**
     * Retrieves a list of districts and their center IDs for a specified province in Turkey.
     * https://servis.mgm.gov.tr/web/merkezler/ililcesi?il=
     * 
     * This function fetches information about districts within a given province. It provides details such as the district name and its corresponding center ID.
     *
     * @async
     * @param {string} provinceName - The name of the province for which you want to retrieve district information.
     * @returns {Promise< District[] >} An array of objects containing district names and their center IDs.
     *
     * @throws {Error} Throws an error if the specified province is not found in the system.
     *
     * @example
     * // Retrieve a list of districts for the province of 'Istanbul'
     * const districts = await getDistricts('Istanbul');
     * 
     * // Sample output:
     * // [
     * //   { name: 'Adalar', centerID: 93439 },
     * //   { name: 'Arnavutköy', centerID: 93431 },
     * //   { name: 'Ataşehir', centerID: 93432 },
     * //   {...
     * // ]
     */
    async getDistricts(provinceName: string): Promise<District[]> {
        provinceName = convertTurkishCharacters(provinceName);

        const res: CenterResponse[] = (await this._axiosInstance.get('merkezler/ililcesi?il=' + provinceName)).data

        if (res.length === 0) {
            throw new Error("City not found in the system")
        }

        const castedRes = res.map(district => {
            return {
                name: district.ilce,
                centerID: district.merkezId,
            }
        })

        return castedRes.sort()
    }

    /**
     * Fetches the latest weather events for a specified weather center in Turkey.
     * https://servis.mgm.gov.tr/web/sondurumlar?merkezid=
     * 
     * This function retrieves the most up-to-date weather events and conditions for a specific weather center. You can identify the center either by its name or its ID. If a district name is provided, the function resolves the center's ID automatically.
     *
     * @async
     * @param {(string | number)} centerInput - The province name, center name, or center ID to retrieve the latest weather events for.
     *   - If a string, it should contain the province name or center name.
     *   - If a number, it should represent the center ID.
     * @param {string} [districtName=''] - Optional. If provided, the function resolves the center's ID based on the district name within the specified province.
     * @returns {Promise<CastedLatestEvents>} A Promise that resolves to an object containing the latest weather events and conditions.
     *
     * @throws {Error} Throws an error if the specified center or district is not found in the system.
     *
     * @example
     * // Retrieve the latest weather events for the city of 'Istanbul'
     * const istanbulEvents = await LatestEvents('Istanbul');
     *
     * @example
     * // Retrieve the latest weather events for a specific district within a province
     * const ankaraDistrictEvents = await LatestEvents('Ankara', 'Kecioren');
     *
     * @example
     * // Retrieve the latest weather events for a specific weather center using centerID
     * const ankaraDistrictEvents = await LatestEvents(93432);
     */
    async LatestEvents(centerInput: string | number, districtName: string = ''): Promise<CastedLatestEvents> {
        // Get center ID if the parameters are a province name or a district name.
        if (typeof centerInput !== 'number') {
            centerInput = await this.getCenterIDfromName(centerInput, districtName);
        }

        const res: LatestEventsResponse = (await this._axiosInstance.get('sondurumlar?merkezid=' + centerInput)).data[0]

        if (!res) {
            throw new Error("City not found in the system")
        }

        const castedData = convertLatestEventsResponse(res)

        return castedData;
    }


    /**
     * Fetches the daily weather forecast for a weather center identified by ID or name.
     * https://servis.mgm.gov.tr/web/tahminler/gunluk?merkezid=
     *
     * This function retrieves the daily weather forecast for a specific weather center in Turkey. You can provide either the center's name or ID. If the parameters are province and district names, it will first obtain the center ID.
     *
     * @async
     * @param {(string | number)} centerInput Province name or center ID to fetch the forecast for.
     * @param {string} [districtName=''] If provided, fetches the district-specific forecast for the center.
     * @returns {Promise<CastedDailyForecast[]>} A Promise that resolves to an array of daily weather forecasts.
     *
     * @throws {Error} Throws an error if the specified center is not found in the system.
     *
     * @example
     * // Fetch the daily weather forecast for Trabzon
     * const forecast = await DailyForecast("Trabzon");
     * console.log(forecast);
     */
    async DailyForecast(centerInput: string | number, districtName: string = ''): Promise<CastedDailyForecast[]> {
        // Get center ID if the parameters are a province name or a district name.
        if (typeof centerInput !== 'number') {
            centerInput = await this.getCenterIDfromName(centerInput, districtName);
        }

        const res: DailyWeatherResponse = (await this._axiosInstance.get('tahminler/gunluk?merkezid=' + centerInput)).data[0]

        if (!res) {
            throw new Error("City not found in the system")
        }

        const castedData = convertDailyResponse(res)

        return castedData;
    }


    /**
     * Fetches the hourly weather forecast for a weather center identified by ID or name.
     * https://servis.mgm.gov.tr/web/tahminler/saatlik?merkezid=
     * 
     * This function retrieves the hourly weather forecast for a specific weather center in Turkey. You can provide either the center's name or ID. If the parameters are province and district names, it will first obtain the center ID.
     *
     * @async
     * @param {(string | number)} centerInput Province name or center ID to fetch the forecast for.
     * @param {string} [districtName=''] If provided, fetches the district-specific forecast for the center.
     * @returns {Promise<CastedHourlyForecast[]>} A Promise that resolves to an array of hourly weather forecasts.
     *
     * @throws {Error} Throws an error if the specified center is not found in the system.
     *
     * @example
     * // Fetch the hourly weather forecast for Trabzon
     * const forecast = await HourlyForecast("Trabzon");
     * console.log(forecast);
     */
    async HourlyForecast(centerInput: string | number, districtName: string = ''): Promise<CastedHourlyForecast[]> {
        //Get center ID if the parameters are a province name or a district name.
        if (typeof centerInput !== 'number') {
            centerInput = await this.getCenterIDfromName(centerInput, districtName);
        }

        const res: HourlyWeatherResponse = (await this._axiosInstance.get('tahminler/saatlik?merkezid=' + centerInput)).data[0]

        if (!res) {
            throw new Error("City not found in the system")
        }

        const castedData = convertHourlyResponse(res)

        return castedData;
    }
}

export const turkeyWeather = {
    TurkeyWeather: TurkeyWeather
}

export default turkeyWeather;