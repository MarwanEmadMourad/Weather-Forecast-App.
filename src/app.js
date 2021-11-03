const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require( path.join(__dirname,'/utils/geocode.js') )
const weather_request = require(path.join(__dirname,'/utils/weather-request.js') )

// Define paths for experss config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')

// regisetring the partials paths
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

const app = express()
const port = process.env.PORT || 3000


// setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index' , {
        title: 'Weather App' , 
        name:'Marwan Emad'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        helpText: 'Some helpful text.'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Page.',
        name:'Marwan Emad'
    })
})



app.get('/weather' , (req,res) =>{
    if (!req.query.address){
        return res.send({
            error:'Address must be provided.'
        })
    }
    geocode.geocoding(req.query.address,(error,data) =>{
        if (error){
            res.send({ error })
        } else {
            weather_request.getWeatherInfo(data,(error,data) =>{
                if (error){
                    res.send({ error })
                } else {
                    console.log(data.message)
                    res.send({
                        forecast: data.message ,
                        location: data.location
                    })
                }
            })
        }
    })
})


app.get('/*', (req,res) =>{
    res.render('error' , {
        title:'404',
        errorMessage:'Page Not Found...'
    })
})

app.listen(port , () =>{
    console.log('Server is up.')
})
