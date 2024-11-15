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
import type { DailyForecastTemp } from './DailyForecastTemp';
import {
    DailyForecastTempFromJSON,
    DailyForecastTempFromJSONTyped,
    DailyForecastTempToJSON,
    DailyForecastTempToJSONTyped,
} from './DailyForecastTemp';
import type { DailyForecastFeelsLike } from './DailyForecastFeelsLike';
import {
    DailyForecastFeelsLikeFromJSON,
    DailyForecastFeelsLikeFromJSONTyped,
    DailyForecastFeelsLikeToJSON,
    DailyForecastFeelsLikeToJSONTyped,
} from './DailyForecastFeelsLike';

/**
 * 
 * @export
 * @interface DailyForecast
 */
export interface DailyForecast {
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    dt?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    sunrise?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    sunset?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    moonrise?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    moonset?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    moonPhase?: number;
    /**
     * 
     * @type {DailyForecastTemp}
     * @memberof DailyForecast
     */
    temp?: DailyForecastTemp;
    /**
     * 
     * @type {DailyForecastFeelsLike}
     * @memberof DailyForecast
     */
    feelsLike?: DailyForecastFeelsLike;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    pressure?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    humidity?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    dewPoint?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    windSpeed?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    windDeg?: number;
    /**
     * 
     * @type {Array<WeatherInfo>}
     * @memberof DailyForecast
     */
    weather?: Array<WeatherInfo>;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    clouds?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    pop?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    rain?: number;
    /**
     * 
     * @type {number}
     * @memberof DailyForecast
     */
    uvi?: number;
}

/**
 * Check if a given object implements the DailyForecast interface.
 */
export function instanceOfDailyForecast(value: object): value is DailyForecast {
    return true;
}

export function DailyForecastFromJSON(json: any): DailyForecast {
    return DailyForecastFromJSONTyped(json, false);
}

export function DailyForecastFromJSONTyped(json: any, ignoreDiscriminator: boolean): DailyForecast {
    if (json == null) {
        return json;
    }
    return {
        
        'dt': json['dt'] == null ? undefined : json['dt'],
        'sunrise': json['sunrise'] == null ? undefined : json['sunrise'],
        'sunset': json['sunset'] == null ? undefined : json['sunset'],
        'moonrise': json['moonrise'] == null ? undefined : json['moonrise'],
        'moonset': json['moonset'] == null ? undefined : json['moonset'],
        'moonPhase': json['moon_phase'] == null ? undefined : json['moon_phase'],
        'temp': json['temp'] == null ? undefined : DailyForecastTempFromJSON(json['temp']),
        'feelsLike': json['feels_like'] == null ? undefined : DailyForecastFeelsLikeFromJSON(json['feels_like']),
        'pressure': json['pressure'] == null ? undefined : json['pressure'],
        'humidity': json['humidity'] == null ? undefined : json['humidity'],
        'dewPoint': json['dew_point'] == null ? undefined : json['dew_point'],
        'windSpeed': json['wind_speed'] == null ? undefined : json['wind_speed'],
        'windDeg': json['wind_deg'] == null ? undefined : json['wind_deg'],
        'weather': json['weather'] == null ? undefined : ((json['weather'] as Array<any>).map(WeatherInfoFromJSON)),
        'clouds': json['clouds'] == null ? undefined : json['clouds'],
        'pop': json['pop'] == null ? undefined : json['pop'],
        'rain': json['rain'] == null ? undefined : json['rain'],
        'uvi': json['uvi'] == null ? undefined : json['uvi'],
    };
}

  export function DailyForecastToJSON(json: any): DailyForecast {
      return DailyForecastToJSONTyped(json, false);
  }

  export function DailyForecastToJSONTyped(value?: DailyForecast | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'dt': value['dt'],
        'sunrise': value['sunrise'],
        'sunset': value['sunset'],
        'moonrise': value['moonrise'],
        'moonset': value['moonset'],
        'moon_phase': value['moonPhase'],
        'temp': DailyForecastTempToJSON(value['temp']),
        'feels_like': DailyForecastFeelsLikeToJSON(value['feelsLike']),
        'pressure': value['pressure'],
        'humidity': value['humidity'],
        'dew_point': value['dewPoint'],
        'wind_speed': value['windSpeed'],
        'wind_deg': value['windDeg'],
        'weather': value['weather'] == null ? undefined : ((value['weather'] as Array<any>).map(WeatherInfoToJSON)),
        'clouds': value['clouds'],
        'pop': value['pop'],
        'rain': value['rain'],
        'uvi': value['uvi'],
    };
}

