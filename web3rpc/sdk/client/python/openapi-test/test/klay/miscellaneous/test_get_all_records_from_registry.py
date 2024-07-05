from base.testing import KlaytnBaseTesting


class TestKlayAllRecordsFromRegistry(KlaytnBaseTesting):

    def setUp(self) -> None:
        super().setUp()
        self.blockNumber = "latest" 

    def test_post(self):
        self.response = self.w3.klay.get_all_records_from_registry(
            'kip14',self.blockNumber
        )
        self.assertIsNotNone(self.response)


