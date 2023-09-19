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

export interface CastedDailyForecast {
    date: string
    event: string
    temp: {
        lowest: number
        highest: number
    }
    humidity: {
        lowest: number
        highest: number
    }
    wind: {
        speed: number
        direction: number
    }
}

interface CastedHourlyForecast {
    date: string
    event: string
    temp: number
    apparentTemp: number
    humidity: number
    wind: {
        speed: number
        maxSpeed: number
        direction: number
    }
}

export interface CastedLatestEvents {
    temp: number
    dataDate: string
    eventCode: string
    humidity: number
    pressure: number | undefined
    precipitation: {
        now: number
        after10Minutes: number
        after1Hour: number
        after6Hour: number
        after12Hour: number
        after24Hour: number
    }
    wind: {
        speed: number
        direction: number
    }
}

export interface CastedCenterInfo {
    provinceID: number
    name: string
    province: string
    lat: number
    long: number
    altitude: number
    centerID: number
    hourlyID: number
}

export type CastedDailyForecasts = CastedDailyForecast[];
export type CastedHourlyForecasts = CastedHourlyForecast[];