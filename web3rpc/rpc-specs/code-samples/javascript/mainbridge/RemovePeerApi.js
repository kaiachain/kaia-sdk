const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const toRemovePeerUrl =
    "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0";

  provider.mainbridge
    .removePeer(toRemovePeerUrl, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
