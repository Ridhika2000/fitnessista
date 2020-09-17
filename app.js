const app=()=>{
  const play=document.querySelector(".play");
  const song=document.querySelector(".song");
  const outline=document.querySelector(".moving-outline circle");
  const video=document.querySelector(".vid-container video");
  const timeSelect=document.querySelectorAll(".time-select button")
  const sounds=document.querySelectorAll(".sound-picker button");
  const timeDisplay=document.querySelector(".time-display");
  sounds.forEach(sound=>{
    sound.addEventListener("click",function(){
      song.src=this.getAttribute("data-sound");
      video.src=this.getAttribute("data-video");
      checkPlaying(song);
    })})


  const outlineLength=outline.getTotalLength();

  let fakeDuration="600";

  outline.style.strokeDasharray=outlineLength;
  outline.style.strokeDashoffset=outlineLength;
  play.addEventListener("click",function(){
    checkPlaying(song);
  })
//select sounds
timeSelect.forEach((option) => {option.addEventListener("click",function(){
  fakeDuration=this.getAttribute("data-time");
  timeDisplay.textContent=Math.floor(fakeDuration/60)+":"+Math.floor(fakeDuration%60);
})

});
  const checkPlaying=(song)=>{
    if(song.paused){
      song.play();
      video.play();
      play.src="./svg/pause.svg";
    }else{
      song.pause();
      video.pause();
      play.src="./svg/play.svg";
    }
  }


//we can animate circle
song.ontimeupdate=()=>{
  let currentTime=song.currentTime;
  let elapsed=fakeDuration-currentTime;
  let seconds=Math.floor(elapsed%60);
  let minutes=Math.floor(elapsed/60);


//animate the circle
let progress=outlineLength-(currentTime/fakeDuration)*outlineLength;
outline.style.strokeDashoffset=progress;

// animate the text
timeDisplay.textContent=minutes+":"+seconds;
if(currentTime>=fakeDuration){
  song.pause();
  song.currentTime=0;
  play.src="./svg/play.svg"
  video.pause()
}
}
}
app();
