ctdProcess = 0;
ctd = 0;

function play(){
    if(ctd == 0) ctd = 30;
    let Timer = document.getElementById("timer");
    let Score = document.getElementById("score");
    let startTimer = document.getElementById("startCtd")
    startCtd = 3;
    Timer.innerHTML = `${ctd} s`;
    Score.innerHTML = "0";
    buttonDisable("start");
    buttonDisable("back");
    buttonAble("reset");
    buttonAble("pause");
    ctdProcess = setInterval( () => {
        ctd--;
        Timer.innerHTML = `${ctd} s`;
        if(ctd == 0){
            buttonAble("start");
            buttonDisable("pause")
            buttonAble("back")
            if(Score.innerHTML == 0) buttonDisable("reset");
            clearInterval(ctdProcess);
            }
    }, 1000);
}

function buttonDisable(id){
    document.getElementById(id).classList.add("disabled");
}

function buttonAble(id){
    btn = document.getElementById(id);
    btn.classList.remove("disabled");
}

function reset(){
    clearInterval(ctdProcess);
    ctd = 0;
    let Timer = document.getElementById("timer");
    Timer.innerHTML = "0 s";
    document.getElementById("score").innerHTML = "0";
    buttonAble("start");
    buttonDisable("reset");
    buttonDisable("pause")
    buttonAble("back");

}

function pause(){
    clearInterval(ctdProcess);
    buttonAble("start");
    buttonAble("back");

}