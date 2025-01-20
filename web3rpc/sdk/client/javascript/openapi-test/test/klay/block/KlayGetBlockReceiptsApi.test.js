const OpenSdk = require("opensdk-javascript");
const { expect } = require("@jest/globals");
const { BAOBAB_RPC } = require("../../constant");

const sdk = new OpenSdk(new OpenSdk.ApiClient(BAOBAB_RPC));

describe('Klay getBlockRecepts API', () => {
    test('should return block receipts.', (done) => {

        let callbackOne = function (error, data, response) {
            expect(error).toBeNull();
            expect(data).toBeDefined();
            expect(Array.isArray(data)).toBe(true);
            if (data.length > 0) {
                expect(data[0].chainId).toBeDefined();
            }
            done();
        };
        const blockHash = '0xed73ee743baee254c36b3a813006f36edd8f7183f6743baa5dfe1245f1092f0c'
        sdk.klay.getBlockReceipts(blockHash, {}, callbackOne);
    });
});
