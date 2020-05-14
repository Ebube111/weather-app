const request = require("request");
const forcast = (latitude, longitude, callback) => {
  const url =
  "http://api.weatherstack.com/forecast?access_key=6f9af80aad398ca3ed54d69f71cb496a&query=" + latitude + ',' + longitude
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to web services", undefined);
    } else if (body.error) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, body.current.weather_descriptions +", it is currently " + body.current.temperature + "degrees out. There is a " + body.current.precip + "% chance of rain");
    }
  });
};

module.exports = forcast