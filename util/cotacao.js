const request = require('request')

const api_token = '2d5f1d0959b0476358a40edfba19636a'

const cotacao = (symbol, callback) => {

    const url = `http://api.marketstack.com/v1/eod?symbols=${symbol}&access_key=${api_token}`

    request({url: url, json: true}, (err, response) => {
        if (err) {
            return callback({
                message: `Something went wrong: ${err}`,
                code: 500
            }, undefined)
        }
        
        if (response.body === undefined || response.body.data === undefined || response.body.data.length == 0) {
            
            console.log('entrou no if')
            return callback({
                message: `No data found`,
                code: 404
            }, undefined)
        }
        
        const parsedJson = response.body.data[0]
        const {symbol, price_open, price, day_high, day_low} = parsedJson

        callback(undefined, {symbol, price_open, price, day_high, day_low})
    })
}

module.exports = cotacao