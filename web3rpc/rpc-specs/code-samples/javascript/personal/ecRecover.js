const { JsonRpcProvider } = require("@kaiachain/ethers-ext");
(() => {
  const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
  const message = "0xdead";
  const signature =
    "0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b";

  provider.personal
    .ecRecover(message, signature, {}, (err, data, response) => {})
    .then((data) => {
      console.log(data);
    });
})();
