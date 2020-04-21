
/*function PlayPause() {
    var x = document.getElementById('play');
    var y = document.getElementById('stop');
    if (x.className == "fa fa-play") {
        x.className = "fa fa-pause";
    }
    else if (x.className == "fa fa-pause") {
        x.className = "fa fa-play";
    }
}
*/
function hello() {
    alert('You suck');
}


var Mediaplayer = function() {
    //Jqueryllä on suht helppo tehdä juttuja etsimällä id:llä, tämän opin tuossa Presidentti 2 tehtävässä.
    $('#pause').hide();

    var audio = document.getElementById('audio');
    //var currentTime = document.getElementById('progress');
    var songSlider = document.getElementById('songSlider');
 //setInterval(updateSongSlider, 1000);

    if (!audio.currentTime) {
        $('#duration').html('0.00');
    }
    
    var songs = ["https://sound.peal.io/ps/audios/000/017/265/original/youtube_17265.mp3?1533627695",
                "http://opengameart.org/sites/default/files/Soliloquy_1.mp3",
				 "http://opengameart.org/sites/default/files/Sigil_3.ogg",
                 "http://opengameart.org/sites/default/files/sadorchestralbgm%28syncopika%29.wav"];

    var songTitle = document.getElementById('title');
    var currentSong = 0;
    window.onload = loadSong(), showDuration();
  
    function loadSong() {
        audio.src = songs[currentSong];
        document.getElementById('nowplaying').innerHTML = songs[currentSong];
        //setTimeout(showDuration, 1000);
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
    var songSlider = document.getElementById("songSlider");

	/* Alusta soitin, luo tapahtumat */
	function initMediaplayer() {
		document.getElementById('play').addEventListener('click', playMusic, false);
        document.getElementById('stop').addEventListener('click', stopMusic, false);
        document.getElementById('pause').addEventListener('click', pauseMusic, false);
        document.getElementById('previous').addEventListener('click', previous, false);
        document.getElementById('next').addEventListener('click', next, false);
        document.getElementById('volume').addEventListener('click', Volume, false);
        document.getElementById('songSlider').addEventListener('click', seekSong, false);
        document.getElementById('songSlider').addEventListener = function() {
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
        songSlider.style.width = position * audio.duration + '%';
        document.getElementById("songSlider") = audio.duration;

    }

    function convertTime (secs) {
        var min = Math.floor(secs/60);
        var sec = secs % 60;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return (min + ':' + sec);
    }
    function seekSong() {
        audio.currentTime = songSlider.value;
        currentTime = convertTime(audio.currentTime);
    }

    function showDuration(){
        $(audio).bind('timeupdate', function(){
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
            $('#progress').css('width',value+'%');
        });
    }
    function Volume() {
        var slider = document.getElementById('volume');
        var output = document.getElementById('volumevalue');
        var audio = document.getElementById('audio')
        output.innerHTML = slider.nodeValue;

        slider.onchange = function () {
            output.innerHTML = this.value;
            //Koska range on 0-10, mutta volume toimii 0-1, pitää siis jakaa 10, joten saadan esim. 5 / 10 = 0.5
            audio.volume = this.value / 10;
        }
    }
	/* Play-toiminto */
	function playMusic() {
        audio.play();
        $('#play').hide();
        $('#pause').show();
        showDuration();
	}

	/* Stop-toiminto */
	function stopMusic() {
		audio.pause();
        audio.currentTime = 0;
        $('#pause').hide();
        $('#play').show();
	}

	function pauseMusic() {
        audio.pause();
        audio.currentTime = audio.currentTime;
        $('#pause').hide();
        $('#play').show();
    }
    function volume() {
        
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