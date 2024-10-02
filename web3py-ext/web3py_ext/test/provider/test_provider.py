#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Unittest."""
from web3py_ext import extend
import unittest
from base_testing.base_testing import BaseTesting


def setUpModule():
    pass


def tearDownModule():
    pass


class TestProvider(BaseTesting):

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
    def test_kaia_namespace(self):
        # test if kaia namespace is intergrated by calling one of its functions.
        block_number = self.web3.kaia.chain_id()
        self.assertEqual(block_number, '0x3e9')


if __name__.__contains__("__main__"):
    print(__doc__)
    unittest.main()
