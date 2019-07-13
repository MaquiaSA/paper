baseURL = "https://exceed.superposition.pknn.dev/data/2gorillas"
month = []
let twoArrayMonth = [
  ['Month', 'Reach'],
]
year = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]]

function initMonth(){
  for(let i=0; i<32; i++){
    month.push([i, 0])
  }
}


function back() {
  window.location.href = "home.html";
}

function getData() {
  fetch(baseURL)
      .then((res) => res.json())
      .then((data) => {
          let d = new Date();
          readMindJunk(data["mindJunk"]);
          monthData(data['stressCount'][`year`], d.getMonth()+1);

          let dic = {}

          for (const [key, value] of Object.entries( data['stressCount'][`year`])) {
            let total = 0;
            for( let amountPlay in value){
              total += value[amountPlay];
            }
            dic[key] = total
 
          }
        
          for(let key in dic){
            let l = []
            l.push(key)
            l.push(dic[key])
            twoArrayMonth.push(l)
          }
          
google.charts.load('current', {
  packages: ['corechart', 'line']
});
google.charts.setOnLoadCallback(drawBasic);

google.charts.load('current', {
  'packages': ['bar']
});
google.charts.setOnLoadCallback(drawChart);

      })
}

function readMindJunk(junk){
  Memo = document.getElementById("memo");
  for(let j of junk){
    Memo.innerHTML += `${j}<br>`
  }
}

function monthData(data, m) {
  initMonth();
  console.log(data)
  console.log(m.toString())
  for(let d in data[m.toString()]){
    console.log(data[m][parseInt(d)])
    month[parseInt(d)][1] = data[m][parseInt(d)]
  }
  console.log(month)
}



function drawBasic() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Date');
  data.addColumn('number', 'Reach');

  data.addRows(month);

  var options = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'User Amount'
    },
    width: 490,
    height: 300,
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div1'));

  chart.draw(data, options);
}

function drawChart() {
 
  var data = google.visualization.arrayToDataTable(twoArrayMonth);
  var options = {
    chart: {
      title: 'User of each month in this year',
      subtitle: '',
    },
    bars: 'vertical', // Required for Material Bar Charts.
    width: 450,
    height: 250,
  };

  var chart = new google.charts.Bar(document.getElementById('barchart_material'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}

getData()