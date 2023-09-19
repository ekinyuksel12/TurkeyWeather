export interface CenterResponse {
    alternatifHadiseIstNo: any
    boylam: number
    enlem: number
    gunlukTahminIstNo: number
    il: string
    ilPlaka: number
    ilce: string
    merkezId: number
    oncelik: number
    saatlikTahminIstNo: number
    sondurumIstNo: number
    yukseklik: number
    aciklama: string
    modelId: number
    gps: number
}

export interface LatestEventsResponse {
    aktuelBasinc: number
    denizSicaklik: number
    denizeIndirgenmisBasinc: number
    gorus: number
    hadiseKodu: string
    istNo: number
    kapalilik: number
    karYukseklik: number
    nem: number
    rasatMetar: string
    rasatSinoptik: string
    rasatTaf: string
    ruzgarHiz: number
    ruzgarYon: number
    sicaklik: number
    veriZamani: string
    yagis00Now: number
    yagis10Dk: number
    yagis12Saat: number
    yagis1Saat: number
    yagis24Saat: number
    yagis6Saat: number
    denizVeriZamani: string
}

export interface DailyWeatherResponse {
    enDusukGun1: number
    enDusukGun2: number
    enDusukGun3: number
    enDusukGun4: number
    enDusukGun5: number
    enDusukNemGun1: number
    enDusukNemGun2: number
    enDusukNemGun3: number
    enDusukNemGun4: number
    enDusukNemGun5: number
    enYuksekGun1: number
    enYuksekGun2: number
    enYuksekGun3: number
    enYuksekGun4: number
    enYuksekGun5: number
    enYuksekNemGun1: number
    enYuksekNemGun2: number
    enYuksekNemGun3: number
    enYuksekNemGun4: number
    enYuksekNemGun5: number
    hadiseGun1: string
    hadiseGun2: string
    hadiseGun3: string
    hadiseGun4: string
    hadiseGun5: string
    istNo: number
    ruzgarHizGun1: number
    ruzgarHizGun2: number
    ruzgarHizGun3: number
    ruzgarHizGun4: number
    ruzgarHizGun5: number
    ruzgarYonGun1: number
    ruzgarYonGun2: number
    ruzgarYonGun3: number
    ruzgarYonGun4: number
    ruzgarYonGun5: number
    tarihGun1: string
    tarihGun2: string
    tarihGun3: string
    tarihGun4: string
    tarihGun5: string
}

export interface HourlyWeatherResponse {
    baslangicZamani: string
    istNo: number
    merkez: string
    tahmin: Tahmin[]
}

interface Tahmin {
    tarih: string
    hadise: string
    sicaklik: number
    hissedilenSicaklik: number
    nem: number
    ruzgarYonu: number
    ruzgarHizi: number
    maksimumRuzgarHizi: number
}

//Converted types
export type CentersResponse = CastedCenterInfo[]

/**
 * Represents a casted daily weather forecast with detailed information.
 *
 * @interface
 */
export interface CastedDailyForecast {
    /**
     * The date of the weather forecast.
     *
     * @type {string}
     */
    date: string;

    /**
     * The weather event description.
     *
     * @type {string}
     */
    event: string;

    /**
     * Temperature information, including the lowest and highest temperatures.
     *
     * @type {{ lowest: number; highest: number }}
     */
    temp: {
        lowest: number;
        highest: number;
    };

    /**
     * Humidity information, including the lowest and highest humidity levels.
     *
     * @type {{ lowest: number; highest: number }}
     */
    humidity: {
        lowest: number;
        highest: number;
    };

    /**
     * Wind information, including speed and direction.
     *
     * @type {{
     *     speed: number;
     *     direction: number;
     * }}
     */
    wind: {
        speed: number;
        direction: number;
    };
}

/**
 * Represents a casted hourly weather forecast with detailed information.
 *
 * @interface
 */
export interface CastedHourlyForecast {
    /**
     * The date and time of the weather forecast.
     *
     * @type {string}
     */
    date: string;

    /**
     * The weather event description.
     *
     * @type {string}
     */
    event: string;

    /**
     * The temperature for the forecasted hour.
     *
     * @type {number}
     */
    temp: number;

    /**
     * The apparent temperature (what it feels like) for the forecasted hour.
     *
     * @type {number}
     */
    apparentTemp: number;

    /**
     * The humidity level for the forecasted hour.
     *
     * @type {number}
     */
    humidity: number;

    /**
     * Wind information, including speed, maximum speed, and direction.
     *
     * @type {{
     *     speed: number;
     *     maxSpeed: number;
     *     direction: number;
     * }}
     */
    wind: {
        speed: number;
        maxSpeed: number;
        direction: number;
    };
}

/**
 * Represents the response data for the latest weather events with casted types.
 *
 * @interface
 */
export interface CastedLatestEvents {
    /**
     * The temperature at the time of the latest events.
     *
     * @type {number}
     */
    temp: number;

    /**
     * The date and time when the weather data was recorded.
     *
     * @type {string}
     */
    dataDate: string;

    /**
     * The event code representing the weather conditions.
     *
     * @type {string}
     */
    eventCode: string;

    /**
     * The humidity level at the time of the latest events.
     *
     * @type {number}
     */
    humidity: number;

    /**
     * The atmospheric pressure (if available) at the time of the latest events.
     *
     * @type {number | undefined}
     */
    pressure: number | undefined;

    /**
     * Precipitation information, including precipitation amounts at different time intervals.
     *
     * @type {{
     *     now: number;
     *     after10Minutes: number;
     *     after1Hour: number;
     *     after6Hour: number;
     *     after12Hour: number;
     *     after24Hour: number;
     * }}
     */
    precipitation: {
        now: number;
        after10Minutes: number;
        after1Hour: number;
        after6Hour: number;
        after12Hour: number;
        after24Hour: number;
    };

    /**
     * Wind information, including speed and direction.
     *
     * @type {{
     *     speed: number;
     *     direction: number;
     * }}
     */
    wind: {
        speed: number;
        direction: number;
    };
}

/**
 * Represents detailed information about a weather center, including its location and identifiers.
 *
 * @interface
 */
export interface CastedCenterInfo {
    /**
     * The unique identifier of the province where the weather center is located.
     *
     * @type {number}
     */
    provinceID: number;

    /**
     * The name of the weather center.
     *
     * @type {string}
     */
    name: string;

    /**
     * The name of the province where the weather center is located.
     *
     * @type {string}
     */
    province: string;

    /**
     * The latitude coordinate of the weather center's location.
     *
     * @type {number}
     */
    lat: number;

    /**
     * The longitude coordinate of the weather center's location.
     *
     * @type {number}
     */
    long: number;

    /**
     * The altitude (elevation) of the weather center's location.
     *
     * @type {number}
     */
    altitude: number;

    /**
     * The unique identifier of the weather center.
     *
     * @type {number}
     */
    centerID: number;

    /**
     * The unique identifier for hourly forecasts associated with the weather center.
     *
     * @type {number}
     */
    hourlyID: number;
}


/**
 * Represents information about a district within a province, including its name and identifier.
 *
 * @interface
 */
export interface District {
    /**
     * The name of the district.
     *
     * @type {string}
     */
    name: string;

    /**
     * The unique identifier of the district.
     *
     * @type {number}
     */
    centerID: number;
}