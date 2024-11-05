from base.testing import KlaytnBaseTesting


class TestTraceBlockFromFile(KlaytnBaseTesting):

    def setUp(self) -> None:
        super().setUp()
        self.fileName = "/home/kaia/block.rlp"

    def test_post(self):
        self.response = self.w3.debug.trace_block_from_file(
            self.fileName
        )
        self.assertTrue(len(self.response) >= 0)

    def test_post_wrong_with_lack_paramaters(self):
        with self.assertRaises(ValueError):
            self.response = self.w3.debug.trace_block_from_file()

