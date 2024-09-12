const OpenSdk = require("opensdk-javascript");
const { expect } = require("@jest/globals");

const sdk = new OpenSdk(new OpenSdk.ApiClient("https://public-en-kairos.node.kaia.io"));

describe('Eth account API', () => {
    test('should return list of accounts.', (done) => {

        let callbackOne = function (error, data, response) {
            expect(error).toBeNull();
            expect(data).toBeDefined()
            expect(Array.isArray(data)).toBe(true);
            done();
        };
        sdk.eth.accounts({}, callbackOne);
    });
});
