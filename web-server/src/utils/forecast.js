const request = require('request');

const darkSkyBaseUrl = 'https://api.darksky.net/forecast',
      access_token = '416a795d84584ea0f145c2aa7d4fabe4',
      options = 'units=si&lang=it';

const forecast = ({latitude, longitude}, callback) => {
        const darkSkyUrl = `${darkSkyBaseUrl}/${access_token}/${latitude},${longitude}?${options}`;
        request({
        url: darkSkyUrl,
        json:true
    }, (err,response) => {
        if(err){
            callback('Unable to connect to weather service!', undefined);
        }
        else if(response.body.error){
            callback('Unable to find location', undefined);
        }
        else {            
            callback(undefined, {
                summary: response.body.daily.summary,
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability
            });
        }
    });
}

module.exports = {
    forecast
}