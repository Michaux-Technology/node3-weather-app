const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f042699bfccd4b96e563fbe9c2c200f5&query=' + longitude + ',' + latitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)

        } else if (response.body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' but you think that is ' + response.body.current.feelslike)
        }
    })

}

module.exports = forecast