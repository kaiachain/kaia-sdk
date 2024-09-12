#-*- coding:utf-8 -*-
import asyncio
from web3py_ext import extend
from web3 import AsyncWeb3, AsyncHTTPProvider
from web3py_ext.utils.klaytn_utils import to_pretty
from aiohttp import ClientSession

# w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider('http://127.0.0.1:8551'))
w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider('https://public-en-kairos.node.kaia.io', request_kwargs={'ssl':False}))

async def async_get_transaction_request():
    try:
        result = await w3.klay.get_transaction_by_hash("0xfb3ebabd482d99bbcd19b1c4efce863b2262b233d41dd87beb0812b55ffa6e49")
        print(result)
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(async_get_transaction_request())