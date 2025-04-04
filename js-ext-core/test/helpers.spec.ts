import {assert} from 'chai';
import {isArray, isString, isNumber, isFunction, map, get, has} from '../src/util/helpers';
import {toCamelCase, toSnakeCase} from '../src/util/transform'

describe('Helpers', () => {
    it('should check correct types', () => {
        // string
        assert.equal(isString('string'), true);
        assert.equal(isString(123), false);
        assert.equal(isString(true), false);

        // isFunction
        assert.equal(isFunction(function () {
        }), true);
        assert.equal(isFunction(() => true), true);
        assert.equal(isFunction(123), false);
        assert.equal(isFunction('string'), false);

        // isArray
        assert.equal(isArray([1, 2, 3]), true);

        // isNumber
        assert.equal(isNumber(123), true);
        assert.equal(isNumber('123'), false);
    });
    it('should map', () => {
        assert.deepEqual(map([1, 2, 3], (x) => x * 2), [2, 4, 6]);
        assert.deepEqual(map([], (x) => x * 2), []); // empty array case
        assert.deepEqual(map([null, undefined], (x) => (x ? x * 2 : 0)), [0, 0]); // handle null or undefined
        assert.deepEqual(map([{value: 1}, {value: 2}], (x) => x.value * 2), [2, 4]); // mapping object properties
        assert.deepEqual(map(['a', 'b', 'c'], (x) => x.toUpperCase()), ['A', 'B', 'C']); // mapping string elements
        assert.deepEqual(map([true, false], (x) => !x), [false, true]); // mapping boolean values
    });
});
describe('Transform', () => {
    it('to snake case', () => {
        assert.equal(toSnakeCase('camelCase'), 'camel_case'); // basic case
        assert.equal(toSnakeCase('PascalCase'), 'pascal_case'); // PascalCase
        assert.equal(toSnakeCase('already_snake_case'), 'already_snake_case'); // already snake_case
        assert.equal(toSnakeCase('camelCaseExample'), 'camel_case_example'); // multiple camel case segments
        assert.equal(toSnakeCase('with123Numbers'), 'with_123_numbers'); // camelCase with numbers
        assert.equal(toSnakeCase(''), ''); // empty string
    });
    it('to camel case', () => {
        assert.equal(toCamelCase('snake_case'), 'snakeCase'); // basic case
        assert.equal(toCamelCase('snake_case_example'), 'snakeCaseExample'); // multiple underscores
        assert.equal(toCamelCase('alreadyCamelCase'), 'alreadyCamelCase'); // already camelCase
        assert.equal(toCamelCase('_leading_underscore'), 'leadingUnderscore'); // leading underscore
        assert.equal(toCamelCase('trailing_underscore_'), 'trailingUnderscore'); // trailing underscore
        assert.equal(toCamelCase('ALL_CAPS_UNDERSCORED'), 'allCapsUnderscored'); // all caps
        assert.equal(toCamelCase('MULTI__UNDERSCORES__CASE'), 'multiUnderscoresCase'); // multiple consecutive underscores
        assert.equal(toCamelCase(''), ''); // empty string
    })
})

describe('Object',()=>{
    it('should get ', () => {
        assert.equal(get({a:1,b:2}, 'a'), 1);
        assert.equal(get({a:true}, 'b'), undefined);
        assert.equal(get(true, 'a'), undefined);
    });
    it('should has ', () => {
        assert.equal(has({a:1,b:2}, 'a'), true);
        assert.equal(has({a:true}, 'b'), false);
        assert.equal(has(true, 'a'), false);
    });
})