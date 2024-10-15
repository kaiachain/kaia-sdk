const OpenSdk = require("opensdk-javascript");
const { expect } = require("@jest/globals");
const { RPC } = require("../../constant");

const sdk = new OpenSdk(new OpenSdk.ApiClient(RPC));

describe('debug_traceBlockFromFile API', () => {
    test('should return debug_traceBlockFromFile', (done) => {

        let callbackOne = function (error, data, response) {
            expect(error).toBeNull();
            expect(data).toBeDefined();
            expect(Array.isArray(data)).toBeTruthy();
            if (data.length > 0) {
                expect(typeof data[0] === 'object').toBeTruthy();
                expect(typeof data[0].result === 'object').toBeTruthy();
            }
            done();
        };

        const fileName = "/home/kaia/block.rlp";

        sdk.debug.traceBlockFromFile(fileName, {}, callbackOne);
    });
});

