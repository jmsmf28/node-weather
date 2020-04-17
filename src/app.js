const path = require('path')
const express = require('express')
require('dotenv').config()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// routes
app.get('', (req,res) => {
    res.render('index', {
        title: 'WEATHER',
        name: 'Jorge Mesquita'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Jorge Mesquita'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: '404 error',
        name: 'Jorge Mesquita'
    })
})

app.get('/weather', (req = {}, res) => {
    const { city, country } = req.query
    if (!req.query.city) {
        return res.send({
            error: 'You must provide an adress, with city and country'
        })
    }
    //let city = req.query.city
    //let country = req.query.country
    geocode({city, country}, (error, data) => {
        if(error){
            return res.send({ error })
        }
        const { latitude, longitude } =  data
        forecast({ latitude, longitude }, 'pt', (error, value) => {
            if(error){
                res.send({ error })
            } 

            res.send({
                value,
                location: city + ',' + country,
                adress: city
            })
        })
    
    })

})

app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Page not found',
        name: 'Jorge Mesquita'
    })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})