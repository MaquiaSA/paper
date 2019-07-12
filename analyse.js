function back() {
    window.location.href = "home.html";
}


google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Date');
      data.addColumn('number', 'Reach');

      data.addRows([
        [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60]
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