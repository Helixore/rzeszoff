let colors = ['black', 'pastel_pink', 'green', 'orange', 'blue', 'purple'];
let colorHex = ['#242324', '#f7cdd9', '#b7e36d', '#f0b355', '#c7ebf9', '#a74e51'];
let texts = ["Classic", "Sakura Bloom", "Melon Zest", "Tropical Fire", "Frost Bite", "Cherry Shot"];
let rightTexts = ["Energia, która napędza miasto. Nasz bazowy produkt o klasycznym, dynamicznym smaku energetyka. To czysta, sprawdzona moc, zamknięta w puszce.", 
    "Lekka energia w kwiatowym wydaniu. Odkryj harmonię delikatnego smaku kwiatu wiśni z subtelną nutą róży. To najbardziej łagodna i aromatyczna opcja.", 
    "Letnia świeżość w każdym łyku. Silnie orzeźwiające, wakacyjne połączenie soczystego arbuza i energetyzującej limonki. Idealny na upalne dni i nie tylko!", 
    'Adrenalina i eksperyment. Najbardziej odważne i zaskakujące połączenie w naszej linii! Kontrast słodkiego mango i pikantnego chilli to prawdziwy "shot adrenaliny" dla podniebienia.', 
    "Poczuj Mroźne Uderzenie. Smak inspirowany kultowymi cukierkami lodowymi, który zapewnia natychmiastowy chłodzący efekt. Prawdziwe orzeźwienie na zimno.", 
    "Kawa i Energia w Doskonałej Równowadze. Funkcjonalny duet: lekko gorzka kawa zbalansowana słodyczą i kwasowością wiśni. Maska dla klasycznego smaku energetyka, oferująca złożoną głębię."];
let colorIndex = 0;

let can = document.querySelector('.can');
let canSides = document.querySelectorAll('.can .side');
let canWrapper = document.querySelector('.can-wrapper');
let leftButtonEl = document.querySelector('.anim-btn-left');
let rightButtonEl = document.querySelector('.anim-btn-right');

let isAnimRunning = 0; //0 - no animation, 1 - roll-out, 2 - roll-in
let changeColorVal = 0;

let indexHist = -1;
let gowno = true;
let reverseGowno = false;

changeColor(colorIndex);
changeText(colorIndex);
disableButtons();

function buttonLogic(change){
    let x = parseInt(change);
    if(x > 0){
        if(colorIndex < colors.length - 1){
            colorIndex += 1;
        }
    }
    else if(x < 0){
        if(colorIndex >= 1){
            colorIndex += -1;
        }
    }
    disableButtons();
}

function leftButton(){
 //change color, text - left and right, texture of can  
    buttonLogic(1); 
    changeCanTexture(false);
}
function rightButton(){
    buttonLogic(-1);
    changeCanTexture(true);
}


function disableButtons(){
    if(colorIndex >= colors.length - 1){
        leftButtonEl.disabled = true;
    }
    else{
        leftButtonEl.disabled = false;
    }
    if(colorIndex <= 0){
        rightButtonEl.disabled = true;
    }
    else{
        rightButtonEl.disabled = false;
    }

}


function changeText(index){
    
    let rightPrimaryText = document.querySelector('.right p.primary');
    let rightSecondaryText = document.querySelector('.right p.secondary');
    
    rightSecondaryText.style.opacity = 0;

        if(indexHist != index){
            if(reverseGowno == false) {
                if(gowno == true){
                    rightSecondaryText.style.opacity = 0;
                    rightPrimaryText.textContent = rightTexts[index];
                    rightPrimaryText.style.opacity = 1;
                    gowno = false;
                }
                else{
                    rightPrimaryText.style.opacity = 0;
                    rightSecondaryText.textContent = rightTexts[index];
                    rightSecondaryText.style.opacity = 1;
                    gowno = true;
                }
            } else {
                if(gowno == true){
                    rightPrimaryText.style.opacity = 0;
                    rightSecondaryText.textContent = rightTexts[index];
                    rightSecondaryText.style.opacity = 1;
                    gowno = false;
                }
                else{
                    rightSecondaryText.style.opacity = 0;
                    rightPrimaryText.textContent = rightTexts[index];
                    rightPrimaryText.style.opacity = 1;
                    gowno = true;
                }
            }
        }
        indexHist = index;
}

function changeColor(index) {
    let leftDiv = document.querySelector('.left');
    let rightDiv = document.querySelector('.right');
    console.log(colors[index]);
    leftDiv.style.backgroundColor = colorHex[index];
    let leftText = document.querySelector('.left p');
    setTimeout(() => {
        leftText.textContent = texts[index];
        leftText.style.opacity = 1;
    }, 250);
    console.log(index);
}

function rollOutCan(callback) {
    canWrapper.classList.remove('roll-in-right');
    canWrapper.classList.remove('roll-in');
    canWrapper.classList.remove('roll-back');
    can.classList.remove('spin-in-right');
    can.classList.remove('spin-back');
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

function rollBackCan(callback) {
    canWrapper.classList.remove('roll-in-right');
    canWrapper.classList.remove('roll-out');
    canWrapper.classList.remove('roll-in');
    can.classList.remove('spin-in-right');
    can.classList.remove('spin-out');
    can.classList.remove('spin-in');

    // wymuszenie reflow, żeby animacja mogła się uruchomić ponownie
    void canWrapper.offsetWidth;
    void can.offsetWidth;

    canWrapper.classList.add('roll-back');
    can.classList.add('spin-back');

    // nasłuchiwanie zakończenia animacji roll-out
    function onEnd(e) {
        if (e.target === canWrapper && e.animationName === 'roll-back') {
            
            // wywołaj callback po zakończeniu roll-out
            if (callback) callback();
        }
    }
    canWrapper.addEventListener('animationend', onEnd);
}

function rollInCan(callback) {
    canWrapper.classList.remove('roll-in-right');
    canWrapper.classList.remove('roll-out');
    canWrapper.classList.remove('roll-back');
    can.classList.remove('spin-in-right');
    can.classList.remove('spin-out');
    can.classList.remove('spin-back');

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

function rollInRightCan(callback) {
    canWrapper.classList.remove('roll-in');
    canWrapper.classList.remove('roll-out');
    canWrapper.classList.remove('roll-back');
    can.classList.remove('spin-in');
    can.classList.remove('spin-out');
    can.classList.remove('spin-back');

    void canWrapper.offsetWidth;
    void can.offsetWidth;

    canWrapper.classList.add('roll-in-right');
    can.classList.add('spin-in-right');

    function onWrapperEnd(e) {
        if (e.target === canWrapper && e.animationName === 'roll-in-right') {
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

function changeCanTexture(back) {
    // najpierw roll-out, potem zmiana tekstury i roll-in
    if(back == false){       
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
    else{
        rollBackCan(() => {
            // zmiana tekstury
            canSides.forEach(side => {
                side.style.backgroundImage = `url('imgs/${colors[colorIndex]}.png')`;
            });

            // start roll-in
            rollInRightCan(() =>{
                console.log("Changed texture to " + colors[colorIndex] + " | index: " + colorIndex + " | changeColorVal: " + changeColorVal);
                changeColor(colorIndex);
            });
        });
    }
}

const el = document.querySelector('.can-wrapper');

el.addEventListener("animationstart", (e) => {
  if (e.animationName !== "roll-in" && e.animationName !== "roll-back") return;   // <-- only trigger for this specific animation

  const duration = parseFloat(getComputedStyle(el).animationDuration) * 1000;
    console.log("Animation started: " + e.animationName + " | duration: " + duration);
  setTimeout(() => {
    console.log("Roll animation halfway!");
    changeText(colorIndex);
  }, duration / 2);
});