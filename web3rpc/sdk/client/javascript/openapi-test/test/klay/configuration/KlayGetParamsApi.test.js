const OpenSdk = require("opensdk-javascript");
const { expect } = require("@jest/globals");
const { RPC } = require("../../constant");

const sdk = new OpenSdk(new OpenSdk.ApiClient(RPC));

describe("klay_getParams API", () => {
  test("should return klay_getParams", (done) => {
    let callbackOne = function (error, data, response) {
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(typeof data.chainId === "number").toBe(true);
      done();
    };
    const blockNumberOrTag = 100;
    sdk.klay.getParams({ blockNumberOrTag }, callbackOne);
  });
});
