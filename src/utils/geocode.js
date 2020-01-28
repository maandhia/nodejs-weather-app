const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWFhbmRoaWEiLCJhIjoiY2s1cWMyanIyMDB2djNtbnEwMHMyb3plYSJ9.5crlAf7h8vkrcGvtCGMciQ&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    const { features, message } = body;
    if (error) {
      callback("unable to connect to weather services!", undefined);
    } else if (features && features.length == 0) {
      callback("No such place found!", undefined);
    } else if (message) {
      callback(message, undefined);
    } else {
      callback(undefined, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geocode;
