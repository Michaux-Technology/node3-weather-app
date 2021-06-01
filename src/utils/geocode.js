const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmptaWNoYXV4IiwiYSI6ImNrcDA3bDluMzE3YXUycG1weXZtOGI3cHMifQ.lrSqr2Fh2zFsASJZurjafg&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)

        } else if (response.body.features.length === 0) {
            callback('Unable location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode