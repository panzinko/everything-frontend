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
/**
 * 
 * @export
 * @interface WeatherInfo
 */
export interface WeatherInfo {
    /**
     * 
     * @type {number}
     * @memberof WeatherInfo
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof WeatherInfo
     */
    main?: string;
    /**
     * 
     * @type {string}
     * @memberof WeatherInfo
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof WeatherInfo
     */
    icon?: string;
}

/**
 * Check if a given object implements the WeatherInfo interface.
 */
export function instanceOfWeatherInfo(value: object): value is WeatherInfo {
    return true;
}

export function WeatherInfoFromJSON(json: any): WeatherInfo {
    return WeatherInfoFromJSONTyped(json, false);
}

export function WeatherInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): WeatherInfo {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'main': json['main'] == null ? undefined : json['main'],
        'description': json['description'] == null ? undefined : json['description'],
        'icon': json['icon'] == null ? undefined : json['icon'],
    };
}

  export function WeatherInfoToJSON(json: any): WeatherInfo {
      return WeatherInfoToJSONTyped(json, false);
  }

  export function WeatherInfoToJSONTyped(value?: WeatherInfo | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'main': value['main'],
        'description': value['description'],
        'icon': value['icon'],
    };
}
