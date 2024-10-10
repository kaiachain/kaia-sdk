const OpenSdk = require("opensdk-javascript");
const { expect } = require("@jest/globals");
const { RPC } = require("../constant");

const sdk = new OpenSdk(new OpenSdk.ApiClient(RPC));

describe('personal_openWallet API', () => {
    test('should return personal_openWallet', (done) => {

        let callbackOne = function (error, data, response) {
            expect(error).toBeNull();
            expect(data).toBeDefined()
            done();
        };

        const url = "keystore:///home/kaia/klay-node/kcn-v1.10.2-0-linux-amd64/kcn-linux-amd64/data/keystore/UTC--2023-04-13T03-23-36.992476555Z--8cd4b6b24f2cd0b83d49876f932254823e875547"
        const passphrase = "hello@1234"

        sdk.personal.openWallet(url, passphrase, {}, callbackOne);
    });
});

