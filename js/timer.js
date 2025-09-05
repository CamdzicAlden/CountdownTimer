//Middle timer circle variables
const circle = document.querySelector(".progress");  //Getting top circle
const hours = document.querySelector(".hours");  //Getting hours
const minutes = document.querySelector(".minutes");  //Getting minutes
const seconds = document.querySelector(".seconds");  //Getting seconds
const semicolumn1 = document.querySelector(".semicolumn1"); //Getting first semicolumn
const semicolumn2 = document.querySelector(".semicolumn2"); //Getting second semicolumn

//Bottom button variables
const startBtn = document.querySelector(".startButton");
const resetBtn = document.querySelector(".resetButton");
const pauseBtn = document.querySelector(".pauseButton");
const resumeBtn = document.querySelector(".resumeButton");
const pauseReset = document.querySelector(".pauseReset");

//Header icons variables
const sunMoon = document.getElementById("sunMoon");
const stopwatch = document.getElementById("stopwatch");
const edit = document.getElementById("editTimer");
const headerRight = document.querySelector(".headerRight");
const sound = new Audio("./sound/chime_time.mp3");

//Code for stopwatch icon hovering
stopwatch.onmouseover = () => stopwatch.src = "./icons/StopwatchWhiteFill.svg"
stopwatch.onmouseleave = () => stopwatch.src = "./icons/StopwatchWhiteEmpty.svg"

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = "./icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "./icons/SunWhiteEmpty.svg";

const radius = circle.r.baseVal.value;  //Getting progress circle radius base value
const circumference = 2 * Math.PI * radius;  //Calculating circumference of the circle

circle.style.strokeDasharray = circumference;  //Making circle with one big dash 
circle.style.strokeDashoffset = 0;  //Initial offset

const storedTimerData = sessionStorage.getItem("timerData");
let defaultH, defaultMin, defaultSec,  defaultHundr = 0;

if(storedTimerData){
  const timerData = JSON.parse(storedTimerData);
  defaultH = Number(timerData.h);
  defaultMin = Number(timerData.m);
  defaultSec = Number(timerData.s);
}

if(defaultH === 0 && defaultMin === 0 && defaultSec === 0){
  defaultH = 0;
  defaultMin = 1;
  defaultSec = 0;
}

initialDisplay();
let currentH = defaultH, currentMin = defaultMin, currentSec = defaultSec, currentHundr = defaultHundr;
let timer, hundredthsSum = 0, currentHundredthsSum = 0; 

//Starting time in hundredth of seconds 
hundredthsSum = (((((defaultH * 60) + defaultMin) * 60) + defaultSec) * 100) + defaultHundr;  

//Function for updating timer circle
function updateTimer(){ 
    if(currentH === 0 && currentMin === 0 && currentSec <= 0 && currentHundr === 0) {
      clearInterval(timer); 
      sound.loop = true;
      sound.play();
      window.alert("Time is up!");
      sound.pause();
      sound.currentTime = 0;
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

    //Current time in hundredth of seconds 
    currentHundredthsSum = calculateCurrentHundrSum();
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
    pauseReset.style.display = "flex";
    circle.style.transition = "stroke 1s linear";
}

function resetTimer(){
    clearInterval(timer);
    currentH = defaultH;
    currentMin = defaultMin;
    currentSec = defaultSec;
    currentHundr = defaultHundr;

    currentHundredthsSum = calculateCurrentHundrSum();
    displayTime();
    showEdit();

    circle.style.strokeDashoffset = 0;
    circle.style.transition = "none";
    circle.style.stroke = "#305CDE";

    pauseReset.style.display = "none";
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

function calculateCurrentHundrSum(){
  //Current time in hundredth of seconds 
    return (((((currentH * 60) + currentMin) * 60) + currentSec) * 100) + currentHundr;
}

function resumeDisplay(){
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

function pauseDisplay(){
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function hideEdit(){
  edit.style.display = "none";
  headerRight.style.justifyContent = "center";
}

function showEdit(){
  edit.style.display = "block";
  headerRight.style.justifyContent = "space-around";
}

function initialDisplay(){
   //Display hours
  if(defaultH === 0) {
    hours.style.display = "none";
    semicolumn1.style.display = "none";
  }else{
    hours.style.display = "block";
    semicolumn1.style.display = "block";
    hours.textContent = defaultH < 10 ? "0" + defaultH : defaultH;
  }

  //Display minutes
  if(defaultMin === 0 && defaultH === 0) {
    minutes.style.display = "none";
    semicolumn2.style.display = "none";
  }else{
    minutes.style.display = "block";
    semicolumn2.style.display = "block";
    minutes.textContent = defaultMin < 10 ? "0" + defaultMin : defaultMin;
  }

  //Display seconds
  seconds.textContent = defaultSec < 10 ? "0" + defaultSec : defaultSec;
}


