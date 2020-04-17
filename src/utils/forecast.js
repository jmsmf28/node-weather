const request = require('request');

const forecast = (coord, lang = 'pt', callback) => {
    const { latitude, longitude } =  coord
    //console.log(coord)
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${ latitude }&lon=${longitude}&units=metric&lang=${ lang }&APPID=57fad9e264e330d6ef96fb59a5d2945a`
    request({ url: url, json: true }, (error, res) => {
        if(error){
            callback('Unbale to connect to weather service', undefined)
        } else if (res.body.error){
            callback('Unbale to find location', undefined)
        } else {
            callback(undefined, res.body.weather[0].description.charAt(0).toUpperCase() + res.body.weather[0].description.slice(1) + '.Estão ' + res.body.main.temp + ' graus celsius em ' + ' ' + res.body.name)
        }  
    })
}   

 module.exports = forecast
