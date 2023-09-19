import { CastedCenterInfo, CenterResponse, DailyWeatherResponse, CastedDailyForecast, LatestEventsResponse, CastedLatestEvents, CastedHourlyForecast, HourlyWeatherResponse } from "./types";

export function convertTurkishCharacters(inputString: string): string {
    inputString = inputString.toLowerCase();

    const diacriticMap: Record<string, string> = {
        'ı': 'i',
        'ğ': 'g',
        'ş': 's',
        'ç': 'c',
        'ü': 'u',
        'ö': 'o',
      };
    
      let result = '';
      for (const char of inputString) {
        const replacement = diacriticMap[char] || char;
        result += replacement;
      }
      
      result = result[0].toUpperCase() + result.slice(1);
      return result;
}

export function convertCityInfo(res: CenterResponse): CastedCenterInfo {
    const castedData: CastedCenterInfo = {
        provinceID: res.ilPlaka - 1,
        name: res.ilce,
        province: res.il,
        lat: res.enlem,
        long: res.boylam,
        altitude: res.yukseklik,
        centerID: res.merkezId,
        hourlyID: res.saatlikTahminIstNo
    }

    return castedData
}

export function convertDailyResponse(res: DailyWeatherResponse): CastedDailyForecast[] {
    // Map the response data to the desired structure
    const castedData: CastedDailyForecast[] =
        [
            {
                date: res.tarihGun1,
                event: res.hadiseGun1,
                temp: {
                    lowest: res.enDusukGun1,
                    highest: res.enYuksekGun1,
                },
                humidity: {
                    lowest: res.enDusukNemGun1,
                    highest: res.enYuksekNemGun1,
                },
                wind: {
                    speed: res.ruzgarHizGun1,
                    direction: res.ruzgarYonGun1,
                },
            },
            {
                date: res.tarihGun2,
                event: res.hadiseGun2,
                temp: {
                    lowest: res.enDusukGun2,
                    highest: res.enYuksekGun2,
                },
                humidity: {
                    lowest: res.enDusukNemGun2,
                    highest: res.enYuksekNemGun2,
                },
                wind: {
                    speed: res.ruzgarHizGun2,
                    direction: res.ruzgarYonGun2,
                },
            },
            {
                date: res.tarihGun3,
                event: res.hadiseGun3,
                temp: {
                    lowest: res.enDusukGun3,
                    highest: res.enYuksekGun3,
                },
                humidity: {
                    lowest: res.enDusukNemGun3,
                    highest: res.enYuksekNemGun3,
                },
                wind: {
                    speed: res.ruzgarHizGun3,
                    direction: res.ruzgarYonGun3,
                },
            },
            {
                date: res.tarihGun4,
                event: res.hadiseGun4,
                temp: {
                    lowest: res.enDusukGun4,
                    highest: res.enYuksekGun4,
                },
                humidity: {
                    lowest: res.enDusukNemGun4,
                    highest: res.enYuksekNemGun4,
                },
                wind: {
                    speed: res.ruzgarHizGun4,
                    direction: res.ruzgarYonGun4,
                },
            },
            {
                date: res.tarihGun5,
                event: res.hadiseGun5,
                temp: {
                    lowest: res.enDusukGun5,
                    highest: res.enYuksekGun5,
                },
                humidity: {
                    lowest: res.enDusukNemGun5,
                    highest: res.enYuksekNemGun5,
                },
                wind: {
                    speed: res.ruzgarHizGun5,
                    direction: res.ruzgarYonGun5,
                },
            },
        ]

    return castedData
}

export function convertHourlyResponse(res: HourlyWeatherResponse): CastedHourlyForecast[] {
    // Map the response data to the desired structure
    const castedData: CastedHourlyForecast[] = res.tahmin.map(forecast => {
        return {
            date: forecast.tarih,
            temp: forecast.sicaklik,
            apparentTemp: forecast.hissedilenSicaklik,
            event: forecast.hadise,
            humidity: forecast.nem,
            wind: {
                speed: forecast.ruzgarHizi,
                maxSpeed: forecast.maksimumRuzgarHizi,
                direction: forecast.ruzgarYonu
            }
        }
    })

    return castedData
}

export function convertLatestEventsResponse(res: LatestEventsResponse): CastedLatestEvents {
    const CastedData: CastedLatestEvents = {
        temp: res.sicaklik,
        dataDate: res.veriZamani,
        eventCode: res.hadiseKodu,
        humidity: res.nem,
        pressure: ((res.aktuelBasinc !== -9999)? res.aktuelBasinc: undefined),
        precipitation: {
            now: res.yagis00Now,
            after10Minutes: res.yagis10Dk,
            after1Hour: res.yagis1Saat,
            after6Hour: res.yagis6Saat,
            after12Hour: res.yagis12Saat,
            after24Hour: res.yagis24Saat,
        },
        wind: {
            speed: res.ruzgarHiz,
            direction: res.ruzgarYon
        }
    }

    return CastedData
}