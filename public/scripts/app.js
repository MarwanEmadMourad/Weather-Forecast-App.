let Place = ''
const forecastMessage = document.querySelector("#forecast")
const locationElem = document.querySelector("#location")

const renderForecast = (location) => {
    fetch(`/weather?address=${location}`).then( (response) =>{
        response.json().then( (data) =>{
            if( data.error ) {
                forecastMessage.textContent = data.error
            } else {
                locationElem.textContent = data.location
                forecastMessage.textContent = data.forecast   
            }
        })
    })
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
