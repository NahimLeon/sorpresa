var currentCode = "";
var correctCode = "01012026"; 
var audio = document.getElementById("love-song");
var playBtn = document.getElementById("play-pause-btn");
var playerWrapper = $('.music-player-wrapper');

$(document).ready(function() {
  
  createHearts();

  $('#heart-lock').click(function() {
    $('#safe-modal').fadeIn();
    $('.main-center-container').fadeOut();
  });

  $('#close-letter').click(function(){
     $('#letter-container').fadeOut();
     stopMusic(); 
     resetSafe();
     $('.main-center-container').fadeIn();
     $('.cadeado').removeClass('fadeOutUp').addClass('pulse');
  });

  $('#play-pause-btn').click(function() {
      if (audio.paused) {
          audio.play();
          playBtn.textContent = "❚❚";
          playerWrapper.addClass('playing');
      } else {
          audio.pause();
          playBtn.textContent = "▶";
          playerWrapper.removeClass('playing');
      }
  });

  $(document).keydown(function(e) {
    if ($('#safe-modal').is(':visible')) {
        var key = e.key;
        if (key >= '0' && key <= '9') pressKey(key);
        else if (key === 'Backspace' || key === 'Delete') pressKey('C');
        else if (key === 'Enter') checkPassword();
    }
  });

});

function pressKey(key) {
  var screen = $('#screen-text');
  if (key === 'C') {
    currentCode = "";
    screen.text("DD / MM / AAAA");
    return;
  }
  if (screen.text() === "DD / MM / AAAA" || screen.text() === "Ups! No 💔") {
    currentCode = "";
  }
  if (currentCode.length < 8) {
    currentCode += key;
    screen.text(currentCode);
  }
}

function checkPassword() {
  var screen = $('#screen-text');
  if (currentCode === correctCode) {
    screen.text("¡Te Amo! ❤");
    screen.css("color", "#ff4351");
    setTimeout(function() {
      $('#safe-modal').fadeOut();
      setTimeout(function(){
        $('#letter-container').fadeIn();
        playMusic(); 
      }, 500);
    }, 1000);
  } else {
    screen.text("Ups! No 💔");
    currentCode = "";
    $('.safe-inner-wrapper').addClass('animated shake');
    setTimeout(function(){
       $('.safe-inner-wrapper').removeClass('animated shake');
       $('#screen-text').text("DD / MM / AAAA");
    }, 1200);
  }
}

function resetSafe() {
  currentCode = "";
  $('#screen-text').text("DD / MM / AAAA").css("color", "#ff4351");
  $('#safe-modal').hide();
}

function playMusic() {
    audio.play().then(() => {
        playBtn.textContent = "❚❚";
        playerWrapper.addClass('playing');
    }).catch(error => {
        console.log("Autoplay bloqueado, se requiere clic manual.");
    });
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = "▶";
    playerWrapper.removeClass('playing');
}

function createHearts() {
    setInterval(function() {
        var heart = $('<div class="floating-heart"></div>');
        
        var size = Math.random() * 20 + 10; 
        
        var leftPosition = (Math.random() + Math.random()) / 2 * 100;

        var duration = Math.random() * 5 + 5; 
        var opacity = Math.random() * 0.6 + 0.4; 
        var colorVar = Math.random() > 0.5 ? '#ff4351' : '#ff9a9e'; 

        heart.css({
            'width': size + 'px',
            'height': size + 'px',
            'left': leftPosition + '%',
            'animation-duration': duration + 's',
            'background-color': colorVar,
            'opacity': opacity,
            'filter': 'blur(' + (Math.random() * 1) + 'px)' 
        });

        $('#hearts-container').append(heart);

        setTimeout(function() {
            heart.remove();
        }, duration * 1000);

    }, 150); 
}