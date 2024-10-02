from web3 import Web3
from eth_account import Account
import unittest


class BaseTesting(unittest.TestCase):
    """Unittest."""

    def setUp(self):
        """Method to prepare the test fixture. Run BEFORE the test methods."""
        self.web3 = Web3(Web3.HTTPProvider(
            'https://public-en-kairos.node.kaia.io'))
        self.user = Account.from_key(
            '0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8')
