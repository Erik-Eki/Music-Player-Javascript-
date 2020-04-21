/*function hello() {
    alert('You suck');
}
*/


var Mediaplayer = function () {
    //Jqueryllä on suht helppo tehdä juttuja etsimällä id:llä, tämän opin tuossa Presidentti 2 tehtävässä.
    $('#pause').hide();

    var audio = document.getElementById('audio');

    //Jostain syystä, joitakin ei voi Jquerettaa, mutta joitakin voi(?)
    var songSlider = $('#songSlider');
    //songSlider.setAttribute("max", Math.round(audio.duration));
    setInterval(updateSongSlider, 1000);

    /*if (!audio.currentTime) {
        $('#duration').html('0.00');
    }*/

    var songs = ["https://sound.peal.io/ps/audios/000/017/265/original/youtube_17265.mp3?1533627695",
        "http://opengameart.org/sites/default/files/Soliloquy_1.mp3",
        "http://opengameart.org/sites/default/files/Sigil_3.ogg",
        "http://opengameart.org/sites/default/files/sadorchestralbgm%28syncopika%29.wav"];

    var songTitle = document.getElementById('title');
    var currentSong = 0;
    window.onload = loadSong(), showDuration();

    function loadSong() {
        var currentSong = 0;
        audio.src = $("#playlist li a")[0];
        $('#pause').hide();
        $('#play').show();
        setTimeout(showDuration, 1000);
        skipSong();
    }
    function skipSong() {
        $("#playlist li a").click(function (event) {
            event.preventDefault();
            audio.src = this;
            $('#pause').hide();
            $('#play').show();
            $("#playlist li").removeClass("current-song");
            currentSong = $(this).parent().index();
            $(this).parent().addClass("current-song");
            document.getElementById('nowplaying').innerHTML = currentSong;
        });
    }
    /* Lataa ensimmäinen biisi */

    // Listaa biisit
    for (var song in songs) {
        var songTitle = document.getElementsByClassName('link');
        songTitle.innerHTML += songs[song] + '<br />';
        // Mahdollista myös biisin valinta, esim. painamalla biisin nimeä !
    }

    /* Alusta mediasoitin */
    initMediaplayer();
    var songSlider = document.getElementById('songSlider');
    //songSlider.max = "audio.duration";

    /* Alusta soitin, luo tapahtumat */
    function initMediaplayer() {
        document.getElementById('play').addEventListener('click', play, false);
        document.getElementById('stop').addEventListener('click', stop, false);
        document.getElementById('pause').addEventListener('click', pause, false);
        document.getElementById('previous').addEventListener('click', previous, false);
        document.getElementById('next').addEventListener('click', next, false);
        //document.getElementById('volume').addEventListener('click', Volume, false);
        document.getElementById('songSlider').addEventListener('click', seekSong, false);
        document.getElementById('songSlider').addEventListener = function () {
            this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + this.value + '%, #fff ' + this.value + '%, white 100%)'
        };
        //output.innerHTML = 0;
        /* Lisää myös muut tapahtumat */
    }


    function updateSongSlider() {
        var c = Math.round(audio.currentTime);
        songSlider.value = c;
        currentTime = convertTime(c);
        audio.addEventListener('timeupdate');
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
        });
    }
    /* Play-toiminto */
    function play() {
        audio.play();
        $('#play').hide();
        $('#pause').show();
        document.getElementById('nowplaying').innerHTML = currentSong;
        showDuration();
        updateSongSlider();
    }

    /* Stop-toiminto */
    function stop() {
        audio.pause();
        audio.currentTime = 0;
        $('#pause').hide();
        $('#play').show();
    }

    function pause() {
        audio.pause();
        audio.currentTime = audio.currentTime;
        $('#pause').hide();
        $('#play').show();
    }
    function next() {
        currentSong = currentSong + 1 % songs.length;
        $('#pause').hide();
        $('#play').show();
        loadSong()
    }

    function previous() {
        currentSong--;
        currentSong = (currentSong < 0) ? songs.lenght - 1 : currentSong;
        $('#pause').hide();
        $('#play').show();
        loadSong()
    }
    /*
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