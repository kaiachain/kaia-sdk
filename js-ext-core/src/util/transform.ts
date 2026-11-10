import snakeCase from "lodash.snakecase";
import camelCase from "lodash.camelcase";


/**
 * Converts a given camelCase or PascalCase string to snake_case.
 *
 * This function identifies uppercase letters in the input string
 * and replaces them with their lowercase equivalent, prefixed by an underscore.
 * It is commonly used to convert JavaScript variable names to snake_case,
 * which is a standard format in languages like Python or for database field names.
 *
 * @param {string} str - The input string to be converted.
 * @returns {string} The string converted to snake_case.
 */
export const toSnakeCase = (str: string) => snakeCase(str);


/**
 * Converts a given string with underscores into camelCase format.
 *
 * This function processes an input string, identifies substrings separated by underscores,
 * and capitalizes the first letter of each substring following an underscore. The underscores
 * are removed in the resulting string.
 *
 * @param {string} str - The input string containing words separated by underscores.
 * @returns {string} - The converted string in camelCase format.
 */
export const toCamelCase = (str: string) => camelCase(str);



export const toUpperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);



/**
 * Creates a deep copy of the provided object.
 *
 * @param {object} obj - The object to be cloned.
 * @returns {object} - A new object that is a deep copy of the input object.
 */
export const clone=(obj:object):object=>{
    return JSON.parse(JSON.stringify(obj));
}