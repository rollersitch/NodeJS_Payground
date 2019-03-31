const request = require('request');

const mapBoxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places',
      myApiKey = 'pk.eyJ1IjoiZGFueTg4dmFpIiwiYSI6ImNqdGNzMHQxcTBkODAzenBiaHB2cmEwZnQifQ.HNCGQWbgkX8Ad0gL4dTRpA';


const geocode = (address, callback) => {
    const mapBoxUrl = `${mapBoxBaseUrl}/${address}.json?access_token=${myApiKey}`;

    request({
        url: mapBoxUrl,
        json: true
    }, (error, response) => {
        if(error){
            callback('Unable to connect to geocoding service', undefined);
        }
        else if(!response.body.features || response.body.features.length === 0){
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined,
                {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
        }
    })
}

module.exports = {
    geocode
}