class Music {
    constructor(audio_name) {
        console.log(
            "music/" 
        + audio_name 
        + ".mp3");
        this.audio = new Audio(
        "music/" 
        + audio_name 
        + ".mp3");
    }

    /** 초 단위 */
    play(current_time = 0) {
        this.audio.muted = true;
        this.audio.currentTime = current_time;
        this.audio.play();
        this.audio.muted = false;
    }

    muted(is_muted) {
        this.audio.muted = is_muted;
    }
}
