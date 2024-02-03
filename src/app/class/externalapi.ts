


 export class MarketStat {
    name: string;
    price: string;
    link : string;
    isPositive : string;
 }
export class GoldApiResponse {
    timestamp: number;
    metal: string;
    currency: string;
    exchange: string;
    symbol: string;
    prev_close_price: number;
    open_price: number;
    low_price: number;
    high_price: number;
    open_time: number;
    price: number;
    ch: number;
    chp: number;
    ask: number;
    bid: number;
    price_gram_24k: number;
    price_gram_22k: number;
    price_gram_21k: number;
    price_gram_20k: number;
    price_gram_18k: number;
}

export class Daily {
    windspeed_10m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    temperature_2m_max: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunset: string[];
    time: string[];
}

export class DailyUnits {
    windspeed_10m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    temperature_2m_max: string;
    apparent_temperature_max: string;
    time: string;
    apparent_temperature_min: string;
    sunset: string;
}

export class CurrentWeather {
    time: string;
    temperature: number;
    weathercode: number;
    windspeed: number;
    winddirection: number;
    constructor(){
        this.temperature = 0;
        this.weathercode = 0;
    }
}

export class WeatherResponse {
    utc_offset_seconds: number;
    longitude: number;
    latitude: number;
    daily_units: DailyUnits;
    generationtime_ms: number;
    daily: Daily;
    elevation: number;
    current_weather :CurrentWeather;
    constructor(){
        this.current_weather = new CurrentWeather();
    }
}


export class LocationDetails {
    country_code: string;
    country_name: string;
    city: string;
    postal: string;
    latitude: number;
    longitude: number;
    IPv4: string;
    state: string;
}


export class Datum {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    cmc_rank: number;
    num_market_pairs: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    last_updated: string;
    date_added: string;
    tags: string[];
    platform: any;
    self_reported_circulating_supply: any;
    self_reported_market_cap: any;
    quote: Quote;
}

export class Quote {
    usd: USD;
}

export class CryptoResponse {
    status: Status;
    data : Datum[];
}

export class Status {
    timestamp: string | null;
    error_code: number | null;
    error_message: string | null;
    elapsed: number | null;
    credit_count: number | null;
}

export class USD {
    price: number;
    volume_24h: any;
    volume_change_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    last_updated: string;
}