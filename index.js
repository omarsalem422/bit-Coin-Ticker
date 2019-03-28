const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;    
    let amount = req.body.amount;

    //var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    //  https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
    var url = "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1";


    //url = url.toString() + crypto + fiat;

    let options = {
        url: url,
        method:  "GET",
        qs: {
             from: crypto,
             to: fiat,
             amount: amount
         }
    };

    request(options, (error, response, body) => {

        const { statusCode } = response;
        console.log(body);
        console.log(statusCode);
          var data = JSON.parse(body);
          var price = data.price;

          var currentDate = data.time;
          var displayPrice = `<h1> The current price  of ${amount} ${crypto} in ${fiat} is ${price * amount}  </h1>`;

         res.write("<p> The current date is " + currentDate + "</p>");
         res.write(displayPrice);        

         res.send();

          console.log(price);
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 ...");
})