#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Unittest."""
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    fill_transaction,
)
import unittest
from base_testing.base_testing import BaseTesting


def setUpModule():
    pass


def tearDownModule():
    pass


class TestSigner(BaseTesting):

    def tearDown(self):
        """Method to tear down the test fixture. Run AFTER the test methods."""
        pass

    def addCleanup(self, function, *args, **kwargs):
        """Function called AFTER tearDown() to clean resources used on test."""
        pass

    @classmethod
    def setUpClass(cls):
        """Class method called BEFORE tests in an individual class run. """
        pass  # Probably you may not use this one. See setUp().

    @classmethod
    def tearDownClass(cls):
        """Class method called AFTER tests in an individual class run. """
        pass  # Probably you may not use this one. See tearDown().

    # tests. method starts with test_
    def test_sign_transaction(self):
        value_transfer_tx = {
            'from': self.user.address,
            'to': self.user.address,
            'value': Web3.to_peb(10, "klay"),
        }
        value_transfer_tx = fill_transaction(value_transfer_tx, self.web3)
        signed_tx = Account.sign_transaction(value_transfer_tx, self.user.key)

        self.assertIsInstance(signed_tx.r, int)
        self.assertIsInstance(signed_tx.s, int)
        self.assertIsInstance(signed_tx.v, int)


if __name__.__contains__("__main__"):
    print(__doc__)
    unittest.main()
