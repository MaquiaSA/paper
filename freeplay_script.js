ctdProcess = 0;
ctd = 0;
baseURL = "https://exceed.superposition.pknn.dev/data/2gorillas"
gameStat = false


function postData(){
    let url = baseURL;
    let data = {
            "data": {
                "time": ctd,
                "gameStat": gameStat
            }
    }
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
}



function start(){
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
    gameStat = true;
    ctdProcess = setInterval( () => {
        postData();
        ctd--;
        Timer.innerHTML = `${ctd} s`;
        if(ctd == 0){
            buttonAble("start");
            buttonDisable("pause")
            buttonAble("back")
            gameStat = false;
            if(Score.innerHTML == 0) buttonDisable("reset");
            clearInterval(ctdProcess);
            }
    }, 1000);
}

function buttonDisable(id){
    document.getElementById(id).classList.add("disabled");
    document.getElementById(id).setAttribute('onclick', '');
}

function buttonAble(id){
    btn = document.getElementById(id);
    btn.classList.remove("disabled");
    btn.setAttribute('onclick', `${id}()`);
}

function reset(){
    clearInterval(ctdProcess);
    gameStat = false;
    ctd = 0;
    postData();
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
    gameStat = false;
    postData();
    buttonAble("start");
    buttonAble("back");

}