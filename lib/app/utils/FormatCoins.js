'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatCoins = formatCoins;

var _client_config = require('app/client_config');

// TODO add comments and explanations
// TODO change name to formatCoinTypes?
// TODO make use of DEBT_TICKER etc defined in config/clietn_config
function formatCoins(string) {
    // return null or undefined if string is not provided
    if (!string) return string;
    // TODO use .to:owerCase() ? for string normalisation
    string = string.replace('WBD', _client_config.DEBT_TOKEN_SHORT).replace('WD', _client_config.DEBT_TOKEN_SHORT).replace('Worth Power', _client_config.VESTING_TOKEN).replace('WORTH POWER', _client_config.VESTING_TOKEN).replace('Worth', _client_config.LIQUID_TOKEN).replace('WORTH', _client_config.LIQUID_TOKEN_UPPERCASE).replace('$', _client_config.CURRENCY_SIGN);
    return string;
}