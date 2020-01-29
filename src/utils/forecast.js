const request = require("request");

const forecast = (latitude, longitude, location, callback) => {
  const url = `https://api.darksky.net/forecast/ddc5d24451f5f7546faf03beb26cea80/${latitude},${longitude}?units=si&exclude=hourly`;

  request({ url, json: true }, (error, { body }) => {
    const { message, currently, daily } = body;
    if (error) {
      callback("Cannot connect to service", undefined);
    } else if (message) {
      callback(message, undefined);
    } else {
      const current = currently;
      const day = daily;
      const temp = current.temperature;
      const rain = current.precipProbability;
      const feel = current.apparentTemperature;
      const windSpeed = current.windSpeed * 3.6;
      callback(
        undefined,
        `${
          day.data[0].summary
        } It is currently ${temp} degrees in ${location} but it feels like ${feel} degrees. The wind speed is currently ${windSpeed.toFixed(
          0
        )}km/h and there is a ${rain}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
