from base.testing import KlaytnBaseTesting


class TestKlayGetBlsInfos(KlaytnBaseTesting):

    def setUp(self) -> None:
        super().setUp()
        self.blockNumber = "latest" 

    def test_post(self):
        self.response = self.w3.klay.get_bls_infos(
            self.blockNumber
        )
        self.assertIsNotNone(self.response)
