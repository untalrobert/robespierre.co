document.addEventListener('DOMContentLoaded', function() {
    // Tu código JavaScript que interactúa con el DOM aquí
    const playButton = document.getElementById('play-button');
    const audioPlayer = document.getElementById('audio-player');

    console.log('Loading el escript audio ');

    if (playButton !== null) {
        playButton.addEventListener('click', function() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playButton.textContent = 'Pausar';
            } else {
                audioPlayer.pause();
                playButton.textContent = 'Reproducir';
            }
        });
    }
});
