#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Unittest."""
from web3py_ext import extend
from web3 import Web3
from eth_account import Account
from web3py_ext.transaction.transaction import (
    fill_transaction,
)
from web3py_ext.transaction.transaction import (
    TxType
)
import unittest
from base_testing.base_testing import BaseTesting


def setUpModule():
    pass


def tearDownModule():
    pass


class TestUtils(BaseTesting):

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
    def test_units_conversion(self):
        self.assertEqual(Web3.to_peb(0.1, "klay"), 100000000000000000)


if __name__.__contains__("__main__"):
    print(__doc__)
    unittest.main()
