const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Ebube Agwaze",
        
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead',
        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Please help",
        name: "Nkiruka Agwaze",
        
    })
})
app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "you must provide a address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })

        }
        forcast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title: '404',
        name: "Ebube Agwaze",
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: "404",
        name: 'Ebube Agwaze',
        errorMessage: "Page not found"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
