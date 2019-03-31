const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2] || 'Marsala';

geocode.geocode(address ,(error, {latitude = 0, longitude = 0}) => {
    if(error){
        console.log(error);
    }
    else{        
        forecast.forecast({latitude, longitude}, (error, {summary='', temperature=0, precipProbability=0}) => {
            if(error){
                console.log(error);
            }
            else{
                debugger
                console.log(`Summary:${summary} - Temp: ${temperature} °C - precipProb: ${precipProbability} %`);
            }
        });
    }
});