// type utils

/**
 * Determines whether the given value is of type string.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - `true` if the value is a string, otherwise `false`.
 */
export const isString = (value: any): value is string => typeof value === 'string';
/**
 * Determines whether the given value is an array.
 *
 * @param value - The value to check.
 * @returns {boolean} - `true` if the value is an array, otherwise `false`.
 */
export const isArray = (value: any): value is any[] => Array.isArray(value);
/**
 * Determines whether the provided value is a function.
 *
 * @param value - The value to check.
 * @returns {boolean} - `true` if the value is a function, otherwise `false`.
 */
export const isFunction = (value: any): value is CallableFunction => typeof value === 'function';
/**
 * Determines if the provided value is of type number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - `true` if the value is a number, otherwise `false`.
 */
export const isNumber = (value: any): value is number => typeof value === 'number';


// array utils
/**
 * Applies a callback function to each element of an array and returns a new array.
 *
 * @template T - Type of array elements.
 * @param {T[]} array - Input array.
 * @param {(value: T, index: number) => any} callback - Function applied to each element.
 * @returns {any[]} - A new array of transformed elements.
 */
export const map = <T>(array: T[], callback: (value: T, index: number) => any): any[] => array.map(callback);


/**
 * Checks if the specified key exists as a property in the given object and is not `undefined`.
 *
 * @param {any} obj - The object to inspect.
 * @param {string} key - The property name to check for existence in the object.
 * @returns {boolean} Returns `true` if the key exists and is not `undefined`, otherwise `false`.
 */
export const has=(obj: any, key: string):boolean => typeof obj==='object' && typeof obj[key] !== 'undefined';



/**
 * Retrieves the value associated with the specified key in an object.
 * If the key does not exist or the input is not an object, returns undefined.
 *
 * @param {any} obj - The object from which to retrieve the value.
 * @param {string} key - The key for which the corresponding value is to be fetched.
 * @returns {any} The value associated with the key if it exists, otherwise undefined.
 */
export const get=(obj: any, key: string): any => typeof obj==='object' && typeof obj[key] !== 'undefined' ? obj[key] : undefined;