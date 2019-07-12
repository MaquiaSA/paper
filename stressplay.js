ctdProcess = 0;
ctd = 0;
baseURL = "https://exceed.superposition.pknn.dev/data/2gorillas"
gameStat = 0

function getData(){
    fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
            if(data["gameStat"] && data["score"] != 0) reset();
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

function initData(){
    putData("score", 0);
    putData("time", 1);
    putData("gameStat", 1);
    buttonDisable("back");
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
    buttonAble("back");

}

function back(){
    window.location.href = "home.html";
}
