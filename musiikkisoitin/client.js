function loadApp() {
    console.log("loading application");
  
    // Bind AJAX call to the click event of Button #lataa
    $('#lataa').click(function (event) {
      // TODO: selvitä mikä merkitys on ao. rivillä
      //oletus toimintoa ei ajeta.
      event.preventDefault();
  
      // The server must be bind to localhost (for testing) as we don't have a FQDN or HTTP proxy available
      //TODO: correct URI
      $.get("http://localhost:8080/musiikkisoitin", function (data) {
        console.log("Sending HTTP GET to server");
      })
        .done(function (data) {
          console.log("response from server :", data);

          getData();
          async function getData() {
            const res = await fetch('/api/v1/kappaleet');
            const data = await res.json();
            console.log(data);
          //TODO: esitä vastaanotettu data webbisivulla, eli 
          // rakenna tässä kohtaa taulukko table+th+tr+td-elementein
          // palvelimelta tuleva vastaus on data-muuttujassa JavaScript-oliona
          /*getData();
          async function getData() {
            const res = await fetch('/api/v1/presidents');
            const data = await res.json();
            console.log(data);
            */
          }
        })
          //let presidents = document.getElementById('presidentit').innerHTML = "<p>" + JSON.stringify(data) + "</p>";
        .fail(function (err) {
          console.log("error");
        })
        .always(function () {
          console.log("finished");
        });
    });
  }