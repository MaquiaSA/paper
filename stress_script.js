baseURL = "https://exceed.superposition.pknn.dev/data/2gorillas"

function getData(){
    fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
            updateStatic(data);
        })
}

function updateStatic(Data){
    let url = baseURL;
    value = Data;
    d = new Date();
    value['stressCount'][`year`][`${d.getMonth()+1}`][`${d.getDate()}`] += 1
    value["mindJunk"].push(document.getElementById('mindjunk').value)
    let data = {
      "data": value
    };
    console.log(data.value);
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
}

function back(){
  window.location.href = "home.html";
}

function stressPlay(){
  getData();
  let a = new Audio('papercrump.wav');
  a.play()
  let atime = 3;
  setInterval( () => {
    atime--;
    if(atime==0) window.location.href = "stressplay.html";
  }, 1000)
}

function buttonDisable(id){
  document.getElementById(id).classList.add("disabled");
  document.getElementById(id).setAttribute('onclick', '');
}

function buttonAble(id){
  btn = document.getElementById(id);
  btn.classList.remove("disabled");
  if(id=="back")
    document.getElementById(id).setAttribute('onclick', 'back()');
}