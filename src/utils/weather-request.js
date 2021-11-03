const request = require('postman-request')


const getWeatherInfo = (obj , callback) =>{
    const weatherURL = `http://api.weatherstack.com/current?access_key=dddd97e5d2fb9cd21c71b3d1e15cd665&query=${obj.latitude},${obj.longitude}`
    request( {url:weatherURL,json:true} , (err,response) => {
        if (err) {
            callback('unable to fetch weather info.')
        } else if (response.body.error) {
            callback('invalid location.')
        } else {
            console.log('here')
            const data = response.body.current
            const message =`${data.weather_descriptions[0]} in ${obj.location}, the temperature is ${data.temperature} and it feels like ${data.feelslike}.`
            callback(undefined,{
                message,
                location: obj.location
            })
        }   
    })
}

module.exports = {getWeatherInfo}
