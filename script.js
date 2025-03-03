const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
// we want minutes second and milliseconds  along with a variable so we go for array
var interval;
var timmerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100 / 60));//minutes
    //first the counter/100 gives seconds and seconds/60 gives minutes 
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60)); // seconds
    //first we get pure seconds and minutes are substracted so that everytime we hit a minute this counter goes back to zero
    timer[2] = Math.floor((timer[3] - (timer[1] * 100) - (timer[0] * 60 * 100))); // milliseconds
    //  first we get pure milliseconds and substract everytime we hit a second also every time a minute is hit

}


// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);//this will stop the timer when the test is done correctly.
        testWrapper.style.borderColor = "black";//if test is done perfectly it gives black.
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "green";// if the subString matches it gives green
        } else {
            testWrapper.style.borderColor = "red";//else it will give red
        }
    }
}

// Start the timer:
function start() {
    let textEnteredLenght = testArea.value.length;
    if (textEnteredLenght === 0 && !timmerRunning) {
        timmerRunning = true; // this lets the timer stick there until reset it given, else when other text is entered it keeps running
        interval = setInterval(runTimer, 10);
    }
    // console.log(textEnteredLenght);
}
// Reset everything:
function reset() {
    clearInterval(interval);
    interval= null;
    timer = [0,0,0,0];
    timmerRunning = false;
    
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}
// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false)
resetButton.addEventListener("click", reset, false)