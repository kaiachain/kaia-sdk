from base.testing import KlaytnBaseTesting


class TestGetParams(KlaytnBaseTesting):

    def setUp(self) -> None:
        super().setUp()
        self.blockTag = 100

    def test_post(self):
        self.response = self.w3.klay.get_params(
            self.blockTag
        )
