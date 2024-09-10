#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Unittest."""

import unittest
from base_testing.mock_provider import MockProvider

def setUpModule():
    pass


def tearDownModule():
    pass


class TestProviderExample(unittest.TestCase):

    """Unittest."""
    
    maxDiff, __slots__ = None, ()

    def setUp(self):
        """Method to prepare the test fixture. Run BEFORE the test methods."""
        pass

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
    def test_example_ok(self):
        self.assertEqual(1,1)

    @unittest.expectedFailure
    def test_example_failed(self):
        self.assertEqual(1,2)


if __name__.__contains__("__main__"):
    print(__doc__)
    unittest.main()