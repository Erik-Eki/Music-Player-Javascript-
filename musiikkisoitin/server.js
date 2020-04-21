const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const data = require('./kappaleet.json');
const player = require('./player.js');

const indexRouter = require('./routes/index');
//const connection = new Database();
const port = 8080;

app.set("view engine", "ejs");
app.set("vies", __dirname + "/views");
app.set("layout", "layouts/layouts");
app.use(expressLayouts);
app.use(express.static("public"));
// Sallitaan pääsy selaimen tarvitsemiin tiedostoihin
//app.use(express.static(__dirname + '/client'));
//Estää liian datan lukemisen servulle
app.use(express.json({ limit: '10mb' }));

app.use('/', indexRouter);


app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}!`));

  /*
  console.log("GET http://localhost:8080/musiikkisoitin");
  console.log("eli client.js vaatii muutoksia...");
  res.send(data);
  

  fetch(data)
  .then(function(response){
    return response.json();
  })
  .then(function(songs){
    let html = '';

    songs.forEach(function(song){
      html += `
        <li>
          <a target="_blank" href="$
          {song.link}">View
          Image</a>
          ${song.artist}
        </li>
      `;
    });
    document.getElementById('playlist').innerHTML =
    html;
  })
  .catch(function(error) {
    console.log(error);
  })

  function kappaleet()
{
    obj = JSON.parse(data);
    document.getElementById("title").innerHTML = obj.kappaleet[1].title;
    document.getElementById("artist").innerHTML = obj.kappaleet[1].artist;
}
  */