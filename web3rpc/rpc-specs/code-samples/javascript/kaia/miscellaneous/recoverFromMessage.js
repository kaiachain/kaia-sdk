const { JsonRpcProvider } = require("@klaytn/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");

  const address = "0xA2a8854b1802D8Cd5De631E690817c253d6a9153";
  const message = "0xdeadbeef";
  const signature =
    "0x1e6338d6e4a8d688a25de78cf2a92efec9a92e52eb8425acaaee8c3957e68cdb3f91bdc483f0ed05a0da26eca3be4c566d087d90dc2ca293be23b2a9de0bcafc1c";
  const blockNumber = "latest";

  provider.kaia
    .recoverFromMessage(
      address,
      message,
      signature,
      blockNumber,
      {},
      (err, data, response) => {},
    )
    .then((data) => {
      console.log(data);
    });
})();
