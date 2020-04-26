//const Database = require('./kappaleet.json');
"use strict";

//Haetaan kappaleet json-tiedostosta

let myRequest = new Request("./kappaleet.json");

var songs = [];
var songTitles = [];
var i = 0

fetch(myRequest)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //Etsii jokaisen kappaleet-objectin json-tiedostosta
        while (i < Object.keys(data.kappaleet).length) {
            //appendaa the songs-listaan
            songs.push(data.kappaleet[i].link);
            songTitles.push(data.kappaleet[i].title)
            i++
        }
    });


var Mediaplayer = function () {
    //Jqueryllä on suht helppo tehdä juttuja etsimällä id:llä, tämän opin tuossa Presidentti 2 tehtävässä.
    $('#pause').hide();

    var audio = document.getElementById('audio');

    //Jostain syystä, joitakin ei voi Jquerettaa, mutta joitakin voi(?)
    //songSlider.setAttribute("max", Math.round(audio.duration));
    var songSlider = document.getElementById('songSlider');
    setInterval(updateSongSlider, 1000);

    /*if (!audio.currentTime) {
        $('#duration').html('0.00');
    }

    var songs = ["https://sound.peal.io/ps/audios/000/017/265/original/youtube_17265.mp3?1533627695",
        "ebin loop.mp3",
        "ebin loop 2.mp3",
        "Synthwave.mp3"];
        */

    //var songTitle = document.getElementById('title');

    window.onload = getSongs(), loadSong();

    function loadSong() {
        audio.src = $("#playlist div a")[0];
        setTimeout(showDuration, 1000);
        $("#playlist div a").click(function (event) {
            event.preventDefault();
            audio.src = this;
            $('#pause').hide();
            $('#play').show();
            //playSong()
            //audio.play()
            $("#playlist div").removeClass("current-song");
            $(this).parent().addClass("current-song");
        });
    }
    /* Lataa ensimmäinen biisi */
    // Listaa biisit
    function getSongs() {
        var x;
        for (x = 0; x < songs.length; x += 1) {
            document.getElementById("playlist").innerHTML += "<div><a href='" + songs[x] + "'>" + songTitles[x] + "</a></div>";
            //document.getElementById("playlist").innerHTML += "<div><a href='" + songs[x] + "'>" + songs[x] + "</a>" + songTitles[x] + "</div>";
            //var songTitle = document.getElementsByClassName('nowPlaying');
            //songTitle.innerHTML += songs[song] + '<br />';
            // Mahdollista myös biisin valinta, esim. painamalla biisin nimeä !
        }
    }

    /* Alusta mediasoitin */
    initMediaplayer();
    var songSlider = document.getElementById('songSlider');
    //songSlider.max = "audio.duration";

    /* Alusta soitin, luo tapahtumat */
    function initMediaplayer() {
        document.getElementById('play').addEventListener('click', playSong, false);
        document.getElementById('stop').addEventListener('click', stopSong, false);
        document.getElementById('pause').addEventListener('click', pauseSong, false);
        //document.getElementById('previous').addEventListener('click', previous, false);
        //document.getElementById('next').addEventListener('click', next, false);
        document.getElementById('volume').addEventListener('mousedown', Volume, false);
        //document.getElementById("songList").innerHTML += getSongs();
        document.getElementById('songSlider').addEventListener('click', seekSong, false);
        document.getElementById('songSlider').addEventListener = function () {
            this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + this.value + '%, #fff ' + this.value + '%, white 100%)'
        };
        //output.innerHTML = 0;
        /* Lisää myös muut tapahtumat */
    }
    function Volume() {
        var VolumeSlider = document.getElementById('volume');
        var output = document.getElementById('volumevalue');
        var audio = document.getElementById('audio')
        output.innerHTML = VolumeSlider.nodeValue;

        VolumeSlider.onchange = function () {
            output.innerHTML = this.value;
            //Koska range on 0-10, mutta volume toimii 0-1, pitää siis jakaa 10, joten saadan esim. 5 / 10 = 0.5
            audio.volume = this.value / 10;
        }
    }

    /*
        function append_to_div(songList, data) {
            document.getElementById("songList").innerText += data;
          }
          var song_name = "I am test";
          var value = song_name.value.trim();
    
          if (!value)
            alert("Name Cannot be empty!");
          else
            append_to_div("my_div", value + "\n");
    
          song_name.value = "";
    */

    function updateSongSlider() {
        var c = Math.round(audio.currentTime);
        songSlider.value = c;
        currentTime = convertTime(c);
        audio.addEventListener('timeupdate', false);
        var position = audio.currentTime / audio.duration;
        songSlider.style.width = position * 100 + '%';
    }

    function convertTime(secs) {
        var min = Math.floor(secs / 60);
        var sec = secs % 60;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return (min + ':' + sec);
    }
    function seekSong() {
        audio.currentTime = songSlider.value;
        currentTime = convertTime(audio.currentTime);
        playMusic()
    }

    function showDuration() {
        $(audio).bind('timeupdate', function () {
            //Get hours and minutes
            var sec = parseInt(audio.currentTime % 60);
            var min = parseInt((audio.currentTime / 60) % 60);
            var secFull = parseInt(audio.duration % 60);
            var minFull = parseInt((audio.duration / 60) % 60);
            //Add 0 if seconds less than 10
            if (sec < 10) {
                sec = '0' + sec;
            }
            $('#duration').html(min + '.' + sec);
            var value = 0;
            if (audio.currentTime > 0) {
                value = Math.floor((100 / audio.duration) * audio.currentTime);
            }
            $('#durationFull').html('/ ' + minFull + '.' + secFull);
            $('#progress').css('width', value + '%');
            if (audio.currentTime === audio.duration) {
                $('#pause').hide();
                $('#play').show();
            }
        });
    }
    /* Play-toiminto */
    function playSong() {
        audio.play();
        audio.currentTime = audio.currentTime;
        songSlider.max = Math.round(audio.duration);
        $('#play').hide();
        $('#pause').show();
        document.getElementById('nowplaying').innerHTML = currentSong;
    }

    /* Stop-toiminto */
    function stopSong() {
        audio.pause();
        audio.currentTime = 0;
        songSlider.max = Math.round(audio.duration);
        songSlider.value = 0;
        $('#pause').hide();
        $('#play').show();
    }

    function pauseSong() {
        audio.pause();
        audio.currentTime = audio.currentTime;
        $('#pause').hide();
        $('#play').show();
    }
    /*
    function next() {
        audio.pause();
        currentSong = currentSong + 1 % songs.length;
        $('#pause').hide();
        $('#play').show();
        skipSong()
    }

    function previous() {
        audio.pause();
        currentSong--;
        currentSong = (currentSong < 0) ? songs.lenght - 1 : currentSong;
        $('#pause').hide();
        $('#play').show();
        loadSong()
    }


    function updateslider() {
        var currentTime = document.getElementById('currentTime');
        var songSlider = document.getElementById('progress');
        var c = Math.round(audio.currentTime);
        songSlider.value = c;
        currentTime.textContent = convertTime(c);
    }
    function convertTime (secs) {
        var min = Math.floor(secs/60);
        var sex = secs % 60;
        min = (min < 10) ? '0' + min : min;
        sex = (sec < 10) ? '0' + sec : sec;
        return (min + ':' + sec);
    }
    function showDuration() {
        var d = Math.floor(audio.duration);
        songSlider.setAttribute('max', d);
        duration.textContent = convertTime(d)
    }
*/
}