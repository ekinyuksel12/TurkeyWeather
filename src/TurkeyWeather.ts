import axios, { AxiosInstance } from "axios";
import crypto from "crypto";
import https from "https";

import { convertCityInfo, convertDailyResponse, convertHourlyResponse, convertLatestEventsResponse, convertTurkishCharacters } from './converters'
import { CenterResponse, DailyWeatherResponse, HourlyWeatherResponse, LatestEventsResponse } from "./types";
import { CastedCenterInfo } from "./types";



export class TurkeyWeather {
    private _axiosInstance: AxiosInstance;

    constructor() {
        // Create an Axios instance with specific configuration for interacting with the Turkish Meteorological Service API.
        this._axiosInstance = axios.create({
            baseURL: 'https://servis.mgm.gov.tr/web/',
            headers: {
                Referer: 'https://www.mgm.gov.tr/',
                Origin: 'https://www.mgm.gov.tr',
                Host: 'servis.mgm.gov.tr'
            },
            httpsAgent: new https.Agent({
                secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
            })
        })
    }

    // Private helper function to fetch the center ID from a given province name and, optionally, a district name.
    private async getCenterIDfromName(provinceName: string, districtName: string = '') {
        const res = await this.getCenterInfo(provinceName, districtName);

        return res.centerID;
    }

    // Returns an array of all province names in Turkey.
    // https://servis.mgm.gov.tr/web/merkezler/iller
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

    //Returns general information about a weather center by providing its ID or name.
    // https://servis.mgm.gov.tr/web/merkezler?merkezid=
    async getCenterInfo(centerInput: string | number, districtName: string = '') {
        var urlPath: string;

        // Check if the given parameter is a province name or a centerID.
        // If it's not either throw an error.
        if (typeof centerInput === 'string') {
            centerInput = convertTurkishCharacters(centerInput);
            urlPath = 'merkezler?il=' + centerInput;

            // If there is a distric name given, add it to the URL path.
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

    //Returns an array of objects containing district names and their center IDs for a given province.
    // https://servis.mgm.gov.tr/web/merkezler/ililcesi?il=
    async getDistricts(provinceName: string) {
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

    // Fetches the latest weather events for a center (identified by ID or name).
    // https://servis.mgm.gov.tr/web/sondurumlar?merkezid=
    async LatestEvents(centerInput: string | number, districtName: string = '') {
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

    // Fetches daily weather forecast for a center (identified by ID or name).
    // https://servis.mgm.gov.tr/web/tahminler/gunluk?merkezid=
    async DailyForcast(centerInput: string | number, districtName: string = '') {
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

    // Fetches hourly weather forecast for a center (identified by ID or name).
    // https://servis.mgm.gov.tr/web/tahminler/saatlik?merkezid=
    async HourlyForecast(centerInput: string | number, districtName: string = '') {
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