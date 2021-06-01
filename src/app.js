const path = require('path') // Pour indiquer un chemin
const express = require('express') // Permet la creation du serveur http
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()



//Define path for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views') //changer le chemin views par template/views
const partialsPath = path.join(__dirname, '../src/templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') // pour notre dossier views, il faut installer hbs sur npmjs et créer le dossier views à la main
app.set('views', viewsPath) // changer le chemin de views par template
hbs.registerPartials(partialsPath) //Pour faire accepter le header, il a fallut installer nodemon : npm install -g nodemon

app.use(express.static(publicDirectoryPath)) // Définir le repertoire d'utilisation

//Authoriser le fetch
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//chemin racine
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Valery-Jerome Michaux'
    })
})

//chemin vers /about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Valery-Jerome Michaux'
    })
})

//Chemin vers /help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Valery-Jerome Michaux'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Sarah',
//         age: 28
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

//Chemin vers /weather
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }


        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
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

    // console.log(req.query)

    res.send({
        products: []
    })
})



//app.com
//app.com/help
//app.com/about

//Gestion de l'erreur 404 (page innexistante)

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Valery-Jerome Michaux',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Valery-Jerome Michaux',
        errorMessage: 'Page not found'
    })
})

//lancer le serveur
app.listen(3000, () => {
    console.log('Serveur is up on port 3000') // Port d'écoute
})