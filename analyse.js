baseURL = "https://exceed.superposition.pknn.dev/data/2gorillas"
month = []
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
      })
}

function readMindJunk(junk){
  Memo = document.getElementById("memo");
  for(let j of junk){
    Memo.innerHTML += `${j}<br>`
  }
}

function chartData(data) {
  d = new Date();
  return [data['stressCount'][`year`][`${d.getMonth()+1}`],data['stressCount'][`year`][`${d.getMonth()+1}`][`${d.getDate()}`]];
}

function monthData(data, m) {
  initMonth();
  for(let d in data[m]){
    month[parseInt(d)][1] = data[d]
    month[0][1] += data[d]
  }
  year[m][1] = month[0][1]
  year[0][1] +=month[0][1]
}

google.charts.load('current', {
  packages: ['corechart', 'line']
});
google.charts.setOnLoadCallback(drawBasic);

google.charts.load('current', {
  'packages': ['bar']
});
google.charts.setOnLoadCallback(drawChart);


function drawBasic() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Date');
  data.addColumn('number', 'Reach');

  data.addRows([
  ]);

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
  var data = google.visualization.arrayToDataTable([
    ['Month', 'Reach'],
    ['Jan', 1000],
    ['Feb', 1170],
    ['Mar', 660],
    ['Apr', 924],
    ['May', 618],
    ['Jun', 1348],
    ['Jul', 775],
    ['Aug', 1345],
    ['Sep', 1121],
    ['Oct', 1092],
    ['Nov', 826],
    ['Dec', 578]
  ]);

  var options = {
    chart: {
      title: 'จำนวนคนที่เข้าใช้งานในแต่ละเดือนในปีนี้',
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