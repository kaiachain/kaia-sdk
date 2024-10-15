from base.testing import KlaytnBaseTesting


class TestOpenWallet(KlaytnBaseTesting):

    def setUp(self) -> None:
        super().setUp()
        self.url = "keystore:///home/kaia/klay-node/kcn-v1.10.2-0-linux-amd64/kcn-linux-amd64/data/keystore/UTC--2023-04-13T03-23-36.992476555Z--8cd4b6b24f2cd0b83d49876f932254823e875547"
        self.passphrase = "passphrase"

    def test_post(self):
        self.response = self.w3.geth.personal.open_wallet(
            self.url, self.passphrase
        )
        self.assertIsNone(self.response)

    def test_post_wrong_with_lack_paramaters(self):
        with self.assertRaises(ValueError):
            self.response = self.w3.geth.personal.open_wallet()

