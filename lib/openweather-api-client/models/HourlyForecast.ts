/* tslint:disable */
/* eslint-disable */
/**
 * OpenWeather One Call API
 * OpenWeather One Call API 3.0 for comprehensive weather data
 *
 * The version of the OpenAPI document: 3.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { WeatherInfo } from './WeatherInfo';
import {
    WeatherInfoFromJSON,
    WeatherInfoFromJSONTyped,
    WeatherInfoToJSON,
    WeatherInfoToJSONTyped,
} from './WeatherInfo';

/**
 * 
 * @export
 * @interface HourlyForecast
 */
export interface HourlyForecast {
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    dt?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    temp?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    feelsLike?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    pressure?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    humidity?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    dewPoint?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    uvi?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    clouds?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    visibility?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    windSpeed?: number;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    windDeg?: number;
    /**
     * 
     * @type {Array<WeatherInfo>}
     * @memberof HourlyForecast
     */
    weather?: Array<WeatherInfo>;
    /**
     * 
     * @type {number}
     * @memberof HourlyForecast
     */
    pop?: number;
}

/**
 * Check if a given object implements the HourlyForecast interface.
 */
export function instanceOfHourlyForecast(value: object): value is HourlyForecast {
    return true;
}

export function HourlyForecastFromJSON(json: any): HourlyForecast {
    return HourlyForecastFromJSONTyped(json, false);
}

export function HourlyForecastFromJSONTyped(json: any, ignoreDiscriminator: boolean): HourlyForecast {
    if (json == null) {
        return json;
    }
    return {
        
        'dt': json['dt'] == null ? undefined : json['dt'],
        'temp': json['temp'] == null ? undefined : json['temp'],
        'feelsLike': json['feels_like'] == null ? undefined : json['feels_like'],
        'pressure': json['pressure'] == null ? undefined : json['pressure'],
        'humidity': json['humidity'] == null ? undefined : json['humidity'],
        'dewPoint': json['dew_point'] == null ? undefined : json['dew_point'],
        'uvi': json['uvi'] == null ? undefined : json['uvi'],
        'clouds': json['clouds'] == null ? undefined : json['clouds'],
        'visibility': json['visibility'] == null ? undefined : json['visibility'],
        'windSpeed': json['wind_speed'] == null ? undefined : json['wind_speed'],
        'windDeg': json['wind_deg'] == null ? undefined : json['wind_deg'],
        'weather': json['weather'] == null ? undefined : ((json['weather'] as Array<any>).map(WeatherInfoFromJSON)),
        'pop': json['pop'] == null ? undefined : json['pop'],
    };
}

  export function HourlyForecastToJSON(json: any): HourlyForecast {
      return HourlyForecastToJSONTyped(json, false);
  }

  export function HourlyForecastToJSONTyped(value?: HourlyForecast | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'dt': value['dt'],
        'temp': value['temp'],
        'feels_like': value['feelsLike'],
        'pressure': value['pressure'],
        'humidity': value['humidity'],
        'dew_point': value['dewPoint'],
        'uvi': value['uvi'],
        'clouds': value['clouds'],
        'visibility': value['visibility'],
        'wind_speed': value['windSpeed'],
        'wind_deg': value['windDeg'],
        'weather': value['weather'] == null ? undefined : ((value['weather'] as Array<any>).map(WeatherInfoToJSON)),
        'pop': value['pop'],
    };
}

