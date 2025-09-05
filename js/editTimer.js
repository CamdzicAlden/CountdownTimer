const sunMoon = document.getElementById("sunMoon");
const stopwatch = document.getElementById("stopwatch");
const timer = document.getElementById("timer");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const startBtn = document.querySelector(".startButton");
const cancelBtn = document.querySelector(".cancelButton");

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = "../icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "../icons/SunWhiteEmpty.svg";
//Code for stopwatch icon hovering
stopwatch.onmouseover = () => stopwatch.src = "../icons/StopwatchWhiteFill.svg"
stopwatch.onmouseleave = () => stopwatch.src = "../icons/StopwatchWhiteEmpty.svg"
//Code for stopwatch icon hovering
timer.onmouseover = () => timer.src = "../icons/TimerWhiteFill.svg"
timer.onmouseleave = () => timer.src = "../icons/TimerWhiteEmpty.svg"


function handleMinSecInput(e, nextField){
    let value = e.target.value.replace(/\D/g, '');

    if(value.length === 1){
        if(parseInt(value, 10) > 5){
            e.target.value = "0" + value;
            if(nextField) document.getElementById(nextField).focus();
            else document.activeElement.blur();
        }else{
            e.target.value = value;
        }
    }else if(value.length === 2){
        if(parseInt(value, 10) > 59) value = "59";
        e.target.value = value;
        if(nextField) document.getElementById(nextField).focus();
        else document.activeElement.blur();
    }else if(value.length === 0){
        e.target.value = "00";
        if(nextField) document.getElementById(nextField).focus();
        else document.activeElement.blur();
    }else{
        e.target.value = value.slice(0,2);
    }
}

function handleHInput(e, nextField){
    let value = e.target.value.replace(/\D/g, '');

    if(value.length === 1){
      e.target.value = value;
    }else if(value.length === 2){
        e.target.value = value;
        document.getElementById(nextField).focus();
    }else if(value.length === 0){
        e.target.value = "00";
        document.getElementById(nextField).focus();
    }else{
        e.target.value = value.slice(0,2);
    }
}

hours.addEventListener("input", e => handleHInput(e, "minutes"));
hours.addEventListener("focus", e => e.target.select());
hours.addEventListener("blur", e => {
    if(e.target.value.length === 1){
        e.target.value = "0" + e.target.value;
    }
})

minutes.addEventListener("input", e => handleMinSecInput(e, "seconds"));
minutes.addEventListener("focus", e => e.target.select());
minutes.addEventListener("blur", e => {
    if(e.target.value.length === 1){
        e.target.value = "0" + e.target.value;
    }
})

seconds.addEventListener("input", e => handleMinSecInput(e, null));
seconds.addEventListener("focus", e => e.target.select());
seconds.addEventListener("blur", e => {
    if(e.target.value.length === 1){
        e.target.value = "0" + e.target.value;
    }
})


function setTimer(){
    const timerData = {
        h: clearZeros(hours.value),
        m: clearZeros(minutes.value),
        s: clearZeros(seconds.value),
    }

    sessionStorage.setItem("timerData", JSON.stringify(timerData));
    window.location.href = "../index.html";
}

function cancel(){
    window.location.href = "../index.html";
}

function clearZeros(textInput){
    return (textInput[0] === "0") ? textInput.slice(1) : textInput;
}