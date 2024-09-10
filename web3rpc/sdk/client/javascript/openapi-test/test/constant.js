const path = require('path');
require('dotenv').config({ path: path.resolve('../.env') });

const BAOBAB_RPC=process.env.BAOBAB_RPC || 'https://public-en-kairos.node.kaia.io'
const RPC=process.env.RPC || 'https://dev.api.klaytn.sotatek.works'
const CN_RPC=process.env.CN_RPC || 'https://public-node-api.klaytnapi.com/v1/cypress'
const GOVERNANCE_RPC=process.env.GOVERNANCE_RPC || 'https://dev.api.kcn191.klaytn.sotatek.works'
const PN_RPC=process.env.PN_RPC || 'https://dev.api.kpn.klaytn.sotatek.works'

module.exports={RPC, CN_RPC, BAOBAB_RPC, GOVERNANCE_RPC, PN_RPC}