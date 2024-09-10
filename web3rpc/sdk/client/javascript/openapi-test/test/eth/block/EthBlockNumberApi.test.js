const OpenSDK = require("opensdk-javascript");
const { expect } = require("@jest/globals");

const sdk = new OpenSDK(new OpenSDK.ApiClient("https://public-en-kairos.node.kaia.io"));
describe('Eth block number API', () => {
    test('using eth namespace, should return block number', (done) => {

        let callbackOne = function (error, data, response) {

            console.log(data);
            expect(error).toBeNull();
            expect(data).toBeDefined()
            expect(typeof data === 'number' || /^0x[0-9a-fA-F]+$/.test(data)).toBe(true);
            done();
        };
        sdk.eth.blockNumber({}, callbackOne);
    });
});
