function PlayPause() {
    var x = document.getElementById('play');
    var y = document.getElementById('stop');
    if (x.className == "fa fa-play") {
        x.className = "fa fa-pause";
    }
    else if (x.className == "fa fa-pause") {
        x.className = "fa fa-play";
    }
}
function hello() {
    alert('You suck');
}
function duration()
{
    var audio = document.getElementById('audio');
    var d = document.getElementById('duration');
    if(audio.readyState > 0) 
    {
        var minutes = parseInt(audio.duration / 60, 10);
        var seconds = parseInt(audio.duration % 60);
        
        d.html(minutes+":"+seconds);
    }
}
/* Luo mediaplayer-olio */

var Mediaplayer = function() {
    //Jqueryllä on suht helppo tehdä juttuja etsimällä id:llä
    $('#pause').hide();

    var audio = document.getElementById('audio');

    if (!audio.currentTime) {
        $('#duration').html('0.00');
    }
    

	var songs = ["http://opengameart.org/sites/default/files/Soliloquy_1.mp3",
				 "http://opengameart.org/sites/default/files/Sigil_3.ogg",
				 "http://opengameart.org/sites/default/files/sadorchestralbgm%28syncopika%29.wav",];

    var songTitle = document.getElementById('title');
    var currentSong = 0;
    window.onload = loadSong()

    function loadSong() {
        audio.src = songs[currentSong];
    }
                 /* Lataa ensimmäinen biisi */

	// Listaa biisit
	for (var song in songs) {
		document.getElementById('playList').innerHTML += songs[song] + '<br />';
		// Mahdollista myös biisin valinta, esim. painamalla biisin nimeä !
	}

	/* Alusta mediasoitin */
	initMediaplayer();

	/* Alusta soitin, luo tapahtumat */
	function initMediaplayer() {
        document.getElementsByClassName('title');
        document.getElementsByClassName('artist');
		document.getElementById('play').addEventListener('click', playMusic, false);
        document.getElementById('stop').addEventListener('click', stopMusic, false);
        document.getElementById('pause').addEventListener('click', pauseMusic, false);
        document.getElementById('previous').addEventListener('click', previous, false);
        document.getElementById('next').addEventListener('click', next, false);

        document.getElementById('duration').addEventListener(duration, false);

        document.getElementById('volume').addEventListener(volume, false);
		/* Lisää myös muut tapahtumat */
    }
    
    function Title() {
        songTitle.textContent = (currentSong + 1), '. ', songs[currentSong];
        nextSongTitle.innerHTML = "<b>Next Song: </b>", songs[currentSong + 1 % songs.length];
        }

    audio.addEventListener('timeupdate', function() {
        var expandingBart = document.getElementById("progress");
        var position = audio.currentTime / audio.duration;
        expandingBar.style.width = postion * 100 + '%';
        convertTime(Math.round(audio.currentTime));
        if(audio.ended) {
            this.next();
        }
    });
    function convertTime(seconds) {
        var min = Math.floor(seconds / 60);
        var sec = seconds % 60;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return (min + ':' + sec);
        totalTime(Math.round(audio.duration));
    }
    function totalTime(seconds) {
        var timeNow = document.getElementById('currentTime');
        var min = Math.floor(seconds / 60);
        var sec = seconds % 60;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return (min + ':' + sec);
        timeNow.textContent += " / " + min + ":" + sec;
    }
	/* Play-toiminto */
	function playMusic() {
        audio.play();
        $('#play').hide();
        $('#pause').show();
        $('#duration').fadeIn(400);
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
	function volumeUp() {
		/* Lisää toiminnallisuus */
	}

	function volumeDown() {
		/* Lisää toiminnallisuus */
    }
}