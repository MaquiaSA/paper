ctdProcess = 0;
ctd = 0;
baseURL = "https://exceed.superposition.pknn.dev/data/2gorillas"
gameStat = 0


function postData(){
    let url = baseURL;
    let data = {
            "data": {
                "time": 0,
                "gameStat": 0,
                "score": 0,
                "stressCount": {
                    "year": {
                        "7": {
                            "12": 0
                        }
                
                    }
                },
                "mindJunk": []
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

function initData(){
    putData("score", 0);
    putData("time", 0);
    putData("gameStat", 0);
}

function getData(){
    fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
            if(data["gameStat"]) document.getElementById("score").innerHTML = `${data["score"]}`;
        })
}

function putData(key, value){
    let url = baseURL + '/' + key;
    let data = {
            "value": value
            }
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((res) => {
          console.log(res)
      })
}

function start(){
    if(ctd == 0) ctd = 30;
    let Timer = document.getElementById("timer");
    let Score = document.getElementById("score");
    Timer.innerHTML = `${ctd}`;
    if(ctd==30) Score.innerHTML = "0";
    buttonDisable("start");
    buttonDisable("back");
    buttonAble("reset");
    buttonAble("pause");
    gameStat = 1;
    if(ctd == 30) putData("score", 0);
    putData("time", ctd);
    putData("gameStat", gameStat);
    ctdProcess = setInterval( () => {
        ctd--;
        Timer.innerHTML = `${ctd}`;
        putData("time", ctd);
        getData();
        if(ctd == 0){
            gameStat = 0;
            putData("gameStat", gameStat)
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
    document.getElementById(id).setAttribute('onclick', '');
}

function buttonAble(id){
    btn = document.getElementById(id);
    btn.classList.remove("disabled");
    btn.setAttribute('onclick', `${id}()`);
}

function reset(){
    clearInterval(ctdProcess);
    gameStat = 0;
    ctd = 0;
    putData("gameStat", gameStat);
    putData("time", ctd);
    putData("score", 0);
    let Timer = document.getElementById("timer");
    Timer.innerHTML = "0";
    document.getElementById("score").innerHTML = "0";
    buttonAble("start");
    buttonDisable("reset");
    buttonDisable("pause")
    buttonAble("back");

}

function pause(){
    clearInterval(ctdProcess);
    gameStat = 0;
    putData("gameStat", gameStat);
    buttonAble("start");
    buttonAble("back");

}

function back(){
    window.location.href = "home.html";
}
