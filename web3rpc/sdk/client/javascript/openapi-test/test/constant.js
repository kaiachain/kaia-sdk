const path = require('path');
require('dotenv').config({ path: path.resolve('../.env') });

const BAOBAB_RPC=process.env.BAOBAB_RPC || 'https://public-en-kairos.node.kaia.io'
const RPC=process.env.RPC || 'https://public-en-kairos.node.kaia.io'
const CN_RPC=process.env.CN_RPC || 'https://public-node-api.klaytnapi.com/v1/cypress'
const GOVERNANCE_RPC=process.env.GOVERNANCE_RPC || 'https://public-en-kairos.node.kaia.io'
const PN_RPC=process.env.PN_RPC || 'https://public-en-kairos.node.kaia.io'

module.exports={RPC, CN_RPC, BAOBAB_RPC, GOVERNANCE_RPC, PN_RPC}