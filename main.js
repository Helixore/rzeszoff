let colors = ['black', 'pastel_pink', 'green', 'orange', 'blue', 'purple'];
let colorHex = ['#242324', '#f7cdd9', '#b7e36d', '#f0b355', '#c7ebf9', '#a74e51'];
let texts = ["Classic", "Sakura Bloom", "Melon Zest", "Tropical Fire", "Frost Bite", "Cherry Shot"];
let colorIndex = 0;

let can = document.querySelector('.can');
let canSides = document.querySelectorAll('.can .side');
let canWrapper = document.querySelector('.can-wrapper');

let isAnimRunning = 0; //0 - no animation, 1 - roll-out, 2 - roll-in
let changeColorVal = 0;

function buttonLogic(change){
    let x = parseInt(change);
    if(x > 0 && colorIndex < colors.length - 1){
        colorIndex += 1;
    }
    else if(x < 0 && colorIndex >= 1){
        colorIndex += -1;
    }
}

function leftButton(){
 //change color, text - left and right, texture of can  
    buttonLogic(1); 
    changeCanTexture();
}
function rightButton(){
    buttonLogic(-1);
    changeCanTexture();
}


function changeColor(index) {
    let leftDiv = document.querySelector('.left');
    let leftText = document.querySelector('.left p');
    leftText.style.opacity = 0;
    setTimeout(() => {
        leftText.textContent = texts[index];
        leftText.style.opacity = 1;
    }, 250);
    console.log(colors[index]);
    leftDiv.style.backgroundColor = colorHex[index];
    
    console.log(index);
}

function rollOutCan(callback) {
    canWrapper.classList.remove('roll-in');
    can.classList.remove('spin-in');

    // wymuszenie reflow, żeby animacja mogła się uruchomić ponownie
    void canWrapper.offsetWidth;
    void can.offsetWidth;

    canWrapper.classList.add('roll-out');
    can.classList.add('spin-out');

    // nasłuchiwanie zakończenia animacji roll-out
    function onEnd(e) {
        if (e.target === canWrapper && e.animationName === 'roll-out') {
            
            // wywołaj callback po zakończeniu roll-out
            if (callback) callback();
        }
    }
    canWrapper.addEventListener('animationend', onEnd);
}

function rollInCan(callback) {
    canWrapper.classList.remove('roll-out');
    can.classList.remove('spin-out');

    void canWrapper.offsetWidth;
    void can.offsetWidth;

    canWrapper.classList.add('roll-in');
    can.classList.add('spin-in');

    function onWrapperEnd(e) {
        if (e.target === canWrapper && e.animationName === 'roll-in') {
            canWrapper.removeEventListener('animationend', onWrapperEnd);
            if (callback) callback(); // wywołaj callback po zakończeniu animacji
        }
    }

    // nasłuchiwanie zakończenia animacji spin-in na puszce
    function onCanEnd(e) {
        if (e.target === can && e.animationName === 'spin-in') {
            can.removeEventListener('animationend', onCanEnd);
            // tutaj też można wywołać callback, jeśli chcesz
        }
    }

    canWrapper.addEventListener('animationend', onWrapperEnd);
    can.addEventListener('animationend', onCanEnd);
}

function changeCanTexture() {
    // najpierw roll-out, potem zmiana tekstury i roll-in
    rollOutCan(() => {
        // zmiana tekstury
        canSides.forEach(side => {
            side.style.backgroundImage = `url('imgs/${colors[colorIndex]}.png')`;
        });

        // start roll-in
        rollInCan(() =>{
            console.log("Changed texture to " + colors[colorIndex] + " | index: " + colorIndex + " | changeColorVal: " + changeColorVal);
            changeColor(colorIndex);
        });
    });
}
