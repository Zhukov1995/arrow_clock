interface IDateTime {
    date: string,
    date_time: string,
    date_time_txt: string,
    date_time_wti:  string,
    date_time_ymd:  string,
    day:  string,
    day_abbr:  string,
    day_full:  string,
    dst:  string,
    dst_observes: string,
    hour_12_wilz: string,
    hour_12_wolz: string,
    hour_24_wilz: string,
    hour_24_wolz: string,
    hour_am_pm: string,
    minutes: string,
    month: string,
    month_abbr: string,
    month_days: string,
    month_full: string,
    month_wilz: string,
    offset_gmt: string,
    offset_hours: string,
    offset_minutes: string,
    offset_seconds: string,
    offset_tzab: string,
    offset_tzfull: string,
    offset_tzid: string,
    seconds: string,
    time: string,
    timeday_gen: string,
    timeday_spe: string,
    tz_string: string,
    week: string,
    year: string,
    year_abbr: string,
}

interface ITimeZone {
    capital: string, 
    continent: string,
    country_code: string,
    country_name: string,
    currency_alpha_code: string,
    currency_code: string,
    currency_country_name: string,
    currency_minor_unit: string,
    currency_name: string,
    ds: string,
    edgar: string,
    fifa: string,
    fips: string,
    geoname_id: string,
    gual: string,
    id: string,
    independent: string,
    ioc: string,
    iso3166_1_alpha_2: string,
    iso3166_1_alpha_3: string,
    itu: string,
    languages: string,
    phone_prefix: string,
    tld: string,
    un_m49_code: string,
    wmo: string
}

interface IMeta {
    code: string,
    execution_time: string,
}

export interface IResponseClock {
    data: {
        datetime: IDateTime,
        timezone: ITimeZone,
    }
    meta: IMeta,
}

export interface ITime {
    sec: number,
    min: number,
    hour: number
}