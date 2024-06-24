from base.testing import KlaytnBaseTesting


class TestKlayGetTotalSupply(KlaytnBaseTesting):

    def setUp(self) -> None:
        super().setUp()
        self.blockNumber = "latest" 

    def test_post(self):
        self.response = self.w3.klay.get_total_supply(
            self.blockNumber
        )
        self.assertIsNotNone(self.response["number"])
