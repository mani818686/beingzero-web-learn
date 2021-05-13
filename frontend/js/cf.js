var handle;
var lang={},verdict={},tags={},levels={},ratings={};
google.charts.load('current', { 'packages': ['corechart'] });
$(document).ready(function(){
    $('#handle').keypress(function(e){
      if(e.keyCode==13)
    { 
        handle=$('#handle').val();
        console.log(handle);
        getdata();
    }
    });
});
var titleTextStyle = {
    fontSize: 18,
    color: '#393939',
    bold: false
  };
function getdata()
{
    const u2="https://codeforces.com/api/user.rating?handle=18H51A05C2"
    $.ajax({
        url: "https://codeforces.com/api/user.status?handle="+handle,
        method: "GET",
        success: function(result) {
         const data=result.result;
         for(let i=0;i<data.length;i++)
         {
            if(data[i].programmingLanguage in lang)
                lang[data[i].programmingLanguage]+=1
            else
               lang[data[i].programmingLanguage]=1
            if(data[i].verdict in verdict)
                verdict[data[i].verdict]+=1
            else
            verdict[data[i].verdict]=1
            if(data[i].problem.index in levels)
                levels[data[i].problem.index]+=1
            else
                levels[data[i].problem.index]=1

                if (data[i].problem.rating) {
                    ratings[data[i].problem.rating] = ratings[data[i].problem.rating] + 1 || 1;
                  }
            tagsdata=data[i].problem.tags
            for(let y=0;y<tagsdata.length;y++)
                if(tagsdata[y] in tags)
                    tags[tagsdata[y]]=1
                else
                tags[tagsdata[y]]+=1
            
         }
         console.log(lang,verdict,levels);
         pieChart1();
         pieChart2();
         DonutChart();
         Bargraph1();
         Bargraph2();
        },
        error: function(err) {
                console.log("Error "+err);
            }
    });
}
function pieChart1() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Verdict');
    data.addColumn('number', 'Count of Verdicts');
    for (let key in verdict) {
        if(key=="WRONG_ANSWER")
            data.addRow(['WA',verdict[key]])
        else if(key=="OK")
            data.addRow(['AC',verdict[key]])
        else if(key=="TIME_LIMIT_EXCEEDED")
            data.addRow(['AC',verdict[key]])
        else if(key=="COMPILATION_ERROR")
            data.addRow(['CE',verdict[key]])
        else if(key=="RUNTIME_ERROR")
            data.addRow(['CE',verdict[key]])
    }
    var options = {
        width: 524,
        height:524,
        fontSize: 20,
        title: 'Verdicts of '+handle,
        legend: 'none',
        useRandomColors: true,
        backgroundcolor: "#ff0ff",
        is3D:true
    };
    var chart1 = new google.visualization.PieChart(document.getElementById('pie_chart1'));
    chart1.draw(data, options);
    //chart.draw(data);
}
function pieChart2() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Language');
    data.addColumn('number', 'Count of Languages');
    for (let key in lang) {
            data.addRow([key.toString(),lang[key]])
    }
    var options = {
        width: 524,
        height:524,
        fontSize: 20,
        title: 'Languages of '+handle,
        legend: 'none',
        useRandomColors: true,
        backgroundcolor: "#ff0ff",
        is3D:true,
        pieSliceText: 'label'
    };
    var chart1 = new google.visualization.PieChart(document.getElementById('pie_chart2'));
    chart1.draw(data, options);
    //chart.draw(data);
}
function DonutChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Tags');
    data.addColumn('number', 'Count of Problems');
    for (let key in tags) {
            data.addRow([key.toString(),tags[key]])
    }
    var options = {
        fontSize: 20,
        title: 'Tags of '+handle,
        
        backgroundcolor: "#ff0ff",
        pieHole: 0.4,
        pieSliceText: 'label',
        titleTextStyle: titleTextStyle,
    };
    var chart1 = new google.visualization.PieChart(document.getElementById('donut_chart'));
    chart1.draw(data, options);
    //chart.draw(data);
}
function Bargraph1() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Levels');
    data.addColumn('number', 'No.of Problems');
    for (let key in levels) {
            data.addRow([key.toString(),levels[key]])
    }
    var options = {
        fontSize: 20,
        title: 'Levels of '+handle,
        
        backgroundcolor: "#ff0ff",
        titleTextStyle: titleTextStyle,
    };
    var chart1 = new google.visualization.ColumnChart(document.getElementById('bar_chart1'));
    chart1.draw(data, options);
    //chart.draw(data);
}

function Bargraph2() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Levels');
    data.addColumn('number', 'Ratings of Problems');
    for (let key in ratings) {
            data.addRow([key.toString(),ratings[key]])
    }
    var options = {
        fontSize: 20,
        title: 'Problem ratings of '+handle,
        useRandomColors: true,
        backgroundcolor: "#ff0ff",
        vAxis: { format: '0' },
        legend: 'none',
        fontName: 'Roboto',
        titleTextStyle: titleTextStyle,
        colors: ['#3F51B5']
    };
    var chart1 = new google.visualization.ColumnChart(document.getElementById('bar_chart2'));
    chart1.draw(data, options);
    //chart.draw(data);
}