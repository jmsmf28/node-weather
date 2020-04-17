const request = require('request');

const geocode = (adress = {}, callback) => {
    const { city, country } =  adress
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ city },${ country }.json?access_token=pk.eyJ1Ijoiam1zbWYiLCJhIjoiY2s5MGlyaDZ4MDBvdDNlbjBkeXVsdXQ1ZCJ9.eTb3pVeo9y6riQ9xqIjrMw&limit=1`
    request({ url: url, json: true }, (error, res) => {
        if(error){
            callback('Unbale to connect to weather service', undefined)
            //res.status(500).json({ message: 'Unbale to connect to weather service'})
        /* } else if(res.body.features.length === 0){
            callback('Unbale to find location', undefined)
        } else if(res.body.features.length > 1){
            callback('Please specify the country', undefined) */
        } else {
            callback(undefined, {
                longitude : res.body.features[0].center[0],
                latitude : res.body.features[0].center[1],
                location : res.body.features[0].place_name
            })
        }
    })  
 }   

 module.exports = geocode