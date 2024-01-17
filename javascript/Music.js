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
    play() {
        console.log(this.audio.volume);
        this.audio.volume = 0.1;
        this.audio.play();
    }

    muted(is_muted) {
        this.audio.muted = is_muted;
    }
}
