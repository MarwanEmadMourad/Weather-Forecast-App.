let Place = ''
const forecastMessage = document.querySelector("#forecast")
const locationElem = document.querySelector("#location")

const renderForecast = async (location) =>{
    const response = await fetch(`/weather?address=${location}`)
    if (response.status === 200){
        const data = await response.json()
        if (data.error){
            forecastMessage.textContent = data.error
        } else {
            locationElem.textContent = data.location
            forecastMessage.textContent = data.forecast ;
        }
    } else {
        forecastMessage.textContent = ('Cannot fetch weather data')
    }
} 


document.getElementById("location-text").addEventListener('change',(e) =>{
    Place = e.target.value
})

document.getElementById("get-weather").addEventListener('click',() =>{
    forecastMessage.textContent=''
    locationElem.textContent=''

    if (Place === ''){
        forecastMessage.textContent = "Please enter a location !"
    } else {
        forecastMessage.textContent="Loading..."
        renderForecast(Place)
    }
})