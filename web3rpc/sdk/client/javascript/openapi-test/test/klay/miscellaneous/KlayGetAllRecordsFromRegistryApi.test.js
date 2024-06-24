const OpenSdk = require("opensdk-javascript");
const { expect } = require("@jest/globals");
const { BAOBAB_RPC } = require("../../constant");

const sdk = new OpenSdk(new OpenSdk.ApiClient("http://3.39.84.202:8651/"));

describe("klay_getAllRecordsFromRegistry API", () => {
  test("should return klay_getAllRecordsFromRegistry", (done) => {
    let callbackOne = function (error, data, response) {
      expect(error).toBeNull();
      expect(data).toBeDefined();
      done();
    };
    const kipType = "kip113";
    const blockNumber = "latest";
    sdk.klay.getAllRecordsFromRegistry(kipType, blockNumber, {}, callbackOne);
  });
});
