const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

const public = path.join(__dirname, "../public"); //pointing to the public folder
const viewsPath = path.join(__dirname, "../templates/views"); //pointing to the views folder
const partialParts = path.join(__dirname, "../templates/partials"); //pointing to the partials folder

//setup handlbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialParts);

// customizing express to show the static content of the public folder
app.use(express.static(public));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "ahhahahahah"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "maandhia"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help message",
    title: "Help",
    name: "Maan"
  });
});
// //starting first route:
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>"); //we can send HTML
// });
// //starting second route:
// app.get("/help", (req, res) => {
//   //We can send JSON, express will stringify it
//   res.send({
//     name: "maan",
//     age: 123
//   });
// });
// //starting third route:
// app.get("/about", (req, res) => {
//   res.send("<h1>This is the about page</h1>");
// });

//starting fourth route:
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "please enter an address" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, location, (error, data) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location: location,
          forecast: data
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help page not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found!"
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
