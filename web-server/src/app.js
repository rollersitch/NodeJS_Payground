const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Daniele'
    });
});

app.get('/help',(req,res) => {
    res.render('index',{
        title:'Help Page',
        name: 'Daniele'
    });
});

app.get('/about',(req,res) => {
    res.render('index',{
        title:'About Page',
        name: 'Daniele'
    });
});

app.get('/weather', (req,res) => {    
    if(!req.query.address){
        res.send({
            error: 'Must provide an address parameter'
        });
    }
    else{
        geocode.geocode(req.query.address ,(error, {latitude = 0, longitude = 0, location = ''} = {}) => {
            if(error){
                res.send({
                    error
                });
            }
            else{        
                forecast.forecast({latitude, longitude}, (error, {summary='', temperature=0, precipProbability=0} = {}) => {
                    if(error){
                        res.send({
                            error
                        });
                    }
                    else{
                        res.send({
                            summary,
                            temperature,
                            precipProbability,
                            location,
                            result: `Summary:${summary} - Temp: ${temperature} °C - precipProb: ${precipProbability} %`
                        });
                    }
                });
            }
        });
    }    
});

app.get('/help/*', (req,res) => {
    res.send('no help found');
});

app.get('*',(req,res) => {
    res.send('not found')
});

app.listen(3000, () => {
    console.log('Server UP');
});