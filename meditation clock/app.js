const container = document.getElementById("container");
const instructions = document.getElementById("instruction");
const soundIcon = document.getElementById("sound-icon");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
const inhale = new Audio('./sound/breathin.mp3');

function breathAnimation(){
    // inhale.play();
    instructions.innerText = 'Breath in';
    container.className = 'container grow';
    setTimeout(() => {
        instructions.innerText = 'Hold';
        setTimeout(()=>{
            instructions.innerText = 'Breath out';
            container.className = 'container shrink';
        }, holdTime);
    }, breatheTime);
}


breathAnimation();
setInterval(breathAnimation, totalTime);

// window.addEventListener('keypress',()=>{
//     soundIcon.className =  'fas fa-volume-mute'
// })

// soundIcon.addEventListener('click', changeSound)
