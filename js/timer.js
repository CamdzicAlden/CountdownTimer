//Middle timer circle variables
const circle = document.querySelector(".progress");  //Getting top circle
const hours = document.querySelector(".hours");  //Getting hours
const minutes = document.querySelector(".minutes");  //Getting minutes
const seconds = document.querySelector(".seconds");  //Getting seconds
const semicolumn1 = document.querySelector(".semicolumn1"); //Getting first semicolumn
const semicolumn2 = document.querySelector(".semicolumn2"); //Getting second semicolumn
const timerTime = document.querySelector(".timerTime");  //Getting initial timer time container
const timeIsUp = document.querySelector(".timeIsUp"); //Getting timer done message container
const bell = document.getElementById("bell");  //Getting bell icon

//Bottom button variables
const startBtn = document.querySelector(".startButton");  
const resetBtn = document.querySelector(".resetButton");
const pauseBtn = document.querySelector(".pauseButton");
const resumeBtn = document.querySelector(".resumeButton");
const footerButtons = document.querySelector(".footerButtons");  //Getting pause/reset button container
const restartBtn = document.querySelector(".restartButton");
const dismissBtn = document.querySelector(".dismissButton");
const dismissRestart = document.querySelector(".dismissRestart");  //Getting dismissRestart button container

//Header icons variables
const sunMoon = document.getElementById("sunMoon");
const stopwatch = document.getElementById("stopwatch");
const timerIcon = document.getElementById("timer");
const edit = document.getElementById("editTimer");
const headerRight = document.querySelector(".headerRight");

//Other variables
const sound = new Audio("./sound/chime_time.mp3");  //Sound that plays when timer is 0
const storedTimerData = sessionStorage.getItem("timerData");  //Getting timerData from session storage
let theme = sessionStorage.getItem("theme");  //Getting theme from session storage

if(theme === "white"){  //Setting correct theme after reload
  document.body.classList.add("white");
}

displayIcons();  //Displaying header icons

//Code for stopwatch icon hovering
stopwatch.onmouseover = () => stopwatch.src = (theme === "white") ? "./icons/StopwatchBlackFill.svg" : "./icons/StopwatchWhiteFill.svg";
stopwatch.onmouseleave = () => stopwatch.src = (theme === "white") ? "./icons/StopwatchBlackEmpty.svg" : "./icons/StopwatchWhiteEmpty.svg";

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = (theme === "white") ? "./icons/MoonBlackFill.svg" : 
"./icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = (theme === "white") ? "./icons/MoonBlackEmpty.svg" : 
"./icons/SunWhiteEmpty.svg";

const radius = circle.r.baseVal.value;  //Getting progress circle radius base value
const circumference = 2 * Math.PI * radius;  //Calculating circumference of the circle

circle.style.strokeDasharray = circumference;  //Making circle with one big dash 
circle.style.strokeDashoffset = 0;  //Initial offset

let defaultH = 0, defaultMin = 1, defaultSec = 0,  defaultHundr = 0;

if(storedTimerData){  //If there is storedTimerData
  const timerData = JSON.parse(storedTimerData);
  defaultH = Number(timerData.h);
  defaultMin = Number(timerData.m);
  defaultSec = Number(timerData.s);
}

//If stored data is 0
if(defaultH === 0 && defaultMin === 0 && defaultSec === 0){
  defaultH = 0;
  defaultMin = 1;
  defaultSec = 0;
}

let currentH = defaultH, currentMin = defaultMin, currentSec = defaultSec, currentHundr = defaultHundr;
let timer, hundredthsSum = 0, currentHundredthsSum = 0; 

initialTimerTime();
displayTime();

//Starting time in hundredth of seconds 
hundredthsSum = (((((defaultH * 60) + defaultMin) * 60) + defaultSec) * 100) + defaultHundr;  

//Function for updating timer circle
function updateTimer(){ 
    if(currentH === 0 && currentMin === 0 && currentSec === 0 && currentHundr === 0) {
      timerDone();
      return;
    } //If time is 0, stop the timer

    if(currentHundr > 0){
      currentHundr--;
    }
    else if(currentSec > 0){
      currentSec--;  //Reduce seconds by one
      currentHundr = 99;
    }else if(currentMin > 0){
      currentMin--;  //Reduce minutes by one
      currentSec = 59;
      currentHundr = 99;
    }else if(currentH > 0){
      currentH--;  //Reduce hours by one
      currentMin = 59;
      currentSec = 59;
      currentHundr = 99;
    }

    displayTime();   

    //Calculating offset (if left time is 40%, offset will be 60%)
    offset = circumference - (currentHundredthsSum/hundredthsSum) * circumference; 
    circle.style.strokeDashoffset = offset;
    if(currentH === 0 && currentMin === 0 && currentSec < 5) circle.style.stroke = "#D02424";

}

//Event handler for starting timer
function startTimer(){
    //Start the timer and run function every second
    timer = setInterval(updateTimer, 10);
    startBtn.style.display = "none";
    hideEdit();
    footerButtons.style.display = "flex";
    circle.style.transition = "stroke 1s linear";
}

function resetTimer(){
    clearInterval(timer);
    currentH = defaultH;
    currentMin = defaultMin;
    currentSec = defaultSec;
    currentHundr = defaultHundr;

    displayTime();
    showEdit();

    circle.style.strokeDashoffset = 0;
    circle.style.transition = "none";
    circle.style.stroke = "#305CDE";

    footerButtons.style.display = "none";
    pauseDisplay();
    startBtn.style.display = "inline-block";
}


function pauseTimer(){
      clearInterval(timer);
      resumeDisplay();
}

function resumeTimer(){
    timer = setInterval(updateTimer, 10);
    pauseDisplay();
}


function displayTime(){
  currentHundredthsSum = (((((currentH * 60) + currentMin) * 60) + currentSec) * 100) + currentHundr;
  let totalSecLeft = Math.ceil(currentHundredthsSum / 100);

  let displayH = Math.floor(totalSecLeft / 3600);
  let displayMin = Math.floor((totalSecLeft % 3600) / 60);
  let displaySec = totalSecLeft % 60;

  //Display hours
  if(displayH === 0) {
    hours.style.display = "none";
    semicolumn1.style.display = "none";
  }else{
    hours.style.display = "block";
    semicolumn1.style.display = "block";
    hours.textContent = displayH < 10 ? "0" + displayH : displayH;
  }

  //Display minutes
  if(displayMin === 0 && displayH === 0) {
    minutes.style.display = "none";
    semicolumn2.style.display = "none";
  }else{
    minutes.style.display = "block";
    semicolumn2.style.display = "block";
    minutes.textContent = displayMin < 10 ? "0" + displayMin : displayMin;
  }

  //Display seconds
  seconds.textContent = displaySec < 10 ? "0" + displaySec : displaySec;
}

//Function for displaying resumeButton
function resumeDisplay(){
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

//Function for displaying pauseButton
function pauseDisplay(){
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

//Function for hiding edit button
function hideEdit(){
  edit.style.display = "none";
  headerRight.style.justifyContent = "center";
}

//Function for showing edit button
function showEdit(){
  edit.style.display = "block";
  headerRight.style.justifyContent = "space-around";
}

function initialTimerTime(){
  //Logic for displaying initial timer time
  timerTime.textContent = 
  (defaultH > 0 ? defaultH + " h " : "") + 
  (defaultMin > 0 ? defaultMin + " min " : "") + 
  (defaultSec > 0 ? defaultSec + " sec" : "");
}

//Method for displaying header icons depennding on theme
function displayIcons(){
  theme = sessionStorage.getItem("theme");  //Getting the theme

  if(theme === "white"){  //If it is white
    sunMoon.src = "./icons/MoonBlackEmpty.svg";
    stopwatch.src = "./icons/StopwatchBlackEmpty.svg";
    timerIcon.src = "./icons/TimerBlackFill.svg";
    bell.src = "./icons/BellBlack.svg";
    edit.src = "./icons/EditBlack.svg";
  }else{  //If it is dark
    sunMoon.src = "./icons/SunWhiteEmpty.svg";
    stopwatch.src = "./icons/StopwatchWhiteEmpty.svg";
    timerIcon.src = "./icons/TimerWhiteFill.svg";
    bell.src = "./icons/BellWhite.svg";
    edit.src = "./icons/EditWhite.svg";
  }
}

//Function for dismiss button
function dismiss(){
  sound.pause();
  sound.currentTime = 0;
  dismissRestart.style.display = "none";
  timeIsUp.style.display = "none";
  resetTimer();
}

//Function for restart button
function restart(){
  dismiss();
  startTimer();
}

//Function called when timer is done
function timerDone(){
  clearInterval(timer); 
  sound.loop = true;
  sound.play();
  footerButtons.style.display = "none";
  dismissRestart.style.display = "flex";
  timeIsUp.style.display = "flex";
}


