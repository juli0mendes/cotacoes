"use strict";

var request = require('request');

var api_token = '2d5f1d0959b0476358a40edfba19636a';

var cotacao = function cotacao(symbol, callback) {
  var url = "http://api.marketstack.com/v1/eod?symbols=".concat(symbol, "&access_key=").concat(api_token);
  request({
    url: url,
    json: true
  }, function (err, response) {
    if (err) {
      return callback({
        message: "Something went wrong: ".concat(err),
        code: 500
      }, undefined);
    }

    if (response.body === undefined || response.body.data === undefined || response.body.data.length == 0) {
      console.log('entrou no if');
      return callback({
        message: "No data found",
        code: 404
      }, undefined);
    }

    var parsedJson = response.body.data[0];
    var symbol = parsedJson.symbol,
        price_open = parsedJson.price_open,
        price = parsedJson.price,
        day_high = parsedJson.day_high,
        day_low = parsedJson.day_low;
    callback(undefined, {
      symbol: symbol,
      price_open: price_open,
      price: price,
      day_high: day_high,
      day_low: day_low
    });
  });
};

module.exports = cotacao;