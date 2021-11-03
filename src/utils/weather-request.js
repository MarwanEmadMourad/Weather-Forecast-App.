const request = require('postman-request')


const getWeatherInfo = (obj , callback) =>{
    const weatherURL = `http://api.weatherstack.com/current?access_key=65849bcd39087a5c4b990daa2658c860&query=${obj.longitude},${obj.latitude}`
    request( {url:weatherURL,json:true} , (err,response) => {
        if (err) {
            callback('unable to fetch weather info.')
        }
//         else if (response.body.error) {
//             callback('invalid location.')
//         }
        else {
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
