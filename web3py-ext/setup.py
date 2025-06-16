from setuptools import setup, find_packages
import pathlib

NAME = "web3py_ext"
VERSION = "2.0.5"

with open("./README.md") as readme:
    long_description = readme.read()

REQUIRES = [
    "web3 ~= 6.3.0",
    "eth-account ~= 0.11.2",
]

setup(
    name=NAME,
    version=VERSION,
    description="kaia-sdk",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="kaia Foundation",
    author_email="",
    url="https://github.com/kaiachain/kaia-sdk",
    keywords=["kaia", "klaytn", "ethereum", "role-based", "multisig"],
    python_requires=">=3.7",
    install_requires=REQUIRES,
    packages=find_packages(exclude=["test", "tests"]),
    include_package_data=True,
    license="MIT",
)