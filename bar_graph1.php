<!DOCTYPE html>
<html>
  <head>
  	
  	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/x-icon" href="docs-assetts/favicon.ico" />
    <link rel="shortcut icon" href="docs-assets/favicon.ico">
     <title>Data Visualization</title>
    
    <link rel="stylesheet" href="css/layout.css">
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

 <script src="js/jquery.min.js"></script>
<script src="highcharts/js/highcharts.js"></script>

    <script>
$(document).ready(function(){
    $('#chart1').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});
    </script>
  </head>

  <body class="claro">
  	
  	 

  	
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">Data Visualization</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
            
           
          </ul>
        </div><!--/.nav-collapse -->
      </div>
      
    </div>
  	
  	
    <div class="container">
      <!-- Example row of columns -->
      <br>
      
       <p><a class="btn btn-success btn-lg" role="button" href="index.html" >&laquo; Back to see more</a></p>
      
   <div class="well">
   	<p>
   		<div id="chart1" style="height:100%; width:100%;"></div>
		
   	</p>

   </div>

      <hr>

      <footer>
        <p>&copy; SweetCodeSolutions 2014</p>
      </footer>
    </div> <!-- /container -->
  	
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
  
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>