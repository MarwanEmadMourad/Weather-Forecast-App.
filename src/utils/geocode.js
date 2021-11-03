const request = require('postman-request')

const geocoding = (place,callback) =>{
    const mapURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoibWFyd2FuZW1hZCIsImEiOiJja3V2cGVsbnQwOGcwMm9tcm5tbzd3ZzhqIn0.-f2ry_cqOM7ZkDX3Vo7X2g`
    request({url:mapURL , json:true} , (err,response) =>{
        if (err) {
            callback('unable to fetch location info.')
        } else {
            const data = response.body.features[0]
            const long = data.center[0]
            const lat  = data.center[1]
            const location = data.place_name
            callback(undefined,{
                longitude:long,
                latitude:lat,
                location
            })
        }
    })
}

module.exports = {geocoding}
