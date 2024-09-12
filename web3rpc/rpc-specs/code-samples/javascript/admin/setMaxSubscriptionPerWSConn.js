const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-kairos.node.kaia.io");
  const maxSubscriptionPerWSConn = 5;

  provider.admin
    .setMaxSubscriptionPerWSConn(
      maxSubscriptionPerWSConn,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
