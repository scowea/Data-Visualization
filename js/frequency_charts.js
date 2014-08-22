/*!
 * Scott M. Weaver
 * Aug 22, 2014
 */
//#####################################################################################

count_per_year_arr = new Array();
year_labels_arr = new Array();
year_data_arr = new Array();
year_arr_index = 0;
   
count_per_month_arr = new Array();
month_labels_arr = new Array();
month_data_arr = new Array();
month_arr_index = 0;

count_per_day_arr = new Array();
day_labels_arr = new Array();
day_data_arr = new Array();
day_arr_index = 0;

count = 0;
percentage_loaded = 0;
google_spreadsheet_id = '1Nje2Q1ZsVPZprkw7DCCdOQJzL95hQL6SSYjpr12rd1U';
//apiurl = "http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&jsoncallback=?&api_key=dd4eb2f7ebff37400f01aae57493f41e&tags=obama,hope&tag_mode=all&extras=date_taken";

//apiurl = "https://spreadsheets.google.com/feeds/list/1Nje2Q1ZsVPZprkw7DCCdOQJzL95hQL6SSYjpr12rd1U/od6/public/values?alt=json-in-script&callback=x";
apiurl = "https://spreadsheets.google.com/feeds/list/"+google_spreadsheet_id+"/od6/public/values?alt=json";
apiurl_html = "https://docs.google.com/spreadsheets/d/"+google_spreadsheet_id+"/pubhtml";
//apiurl = "http://cors.io/spreadsheets.google.com/feeds/list/1Nje2Q1ZsVPZprkw7DCCdOQJzL95hQL6SSYjpr12rd1U/od6/public/values?alt=json";

//Key:dd4eb2f7ebff37400f01aae57493f41e
//Secret:7a6541283f6e96bf
//sort=date-posted-asc (the default value), date-posted-desc, date-taken-asc, date-taken-desc
//Important Dates:
//   Obama elected: 2008-11-4 (november 4, 2008)

// &has_geo=1 
// &sort=date-taken-asc
 
//..........................................................................    
$(document).ready(function(){
    	  
    // get the data from flickr
    // see how many pages of photos we have...
    $.getJSON(apiurl,function(json){
    	
    	// show status messages...
    	$("#flickr_count").html('<p>Loading Photos: '+count+'</p>');
    	$("#loading_progressbar").html(percentage_loaded); 
	    $("#data_source").html("[<a target=_blank href="+apiurl+">Data Source</a>]");
	  
	    console.debug('opensearch$totalResults = ' + json.feed.openSearch$totalResults.$t);
	   
	    // total of all photos across all pages
	    total_photos = json.feed.openSearch$totalResults.$t;
	    
	     
	    
		//.............................................................
		// zero out the day/year/month counters
		for (this_year = 2006; this_year <= 2014; this_year++)
		{
			count_per_year_arr[this_year] = 0;
				    	
			for(this_month = 1; this_month <= 12; this_month++)
			{				
				count_per_month_arr[this_month+''+this_year] = 0;   		

	    		// only collect the dailydata for january.
	    		if ((this_year == 2009) && (this_month == 1))
	    		{  		
					for(this_day = 1; this_day <= 31; this_day++)
					{				
						count_per_day_arr[this_day+''+this_month+''+this_year] = 0;   		
					} // end for(this_day = 1; this_day <= 12; this_day++)   						   		
				} // end if ((this_year == 2009) && (this_month == 1))				   						   		
			} // end for(this_month = 1; this_month <= 12; this_month++)
		} // end for (this_year = 2006; this_year <= 2014; this_year++)   
    	     
	    //.................................................................
	    // roll through the pages of photos...
	    //for (var this_page=1;this_page<=json.photos.pages;this_page++)
	    //{
	    	// get data for this page of photos
	    	//$.getJSON(apiurl+'&page='+this_page,function(json){
	    		
	    		// get each photo info..
	    		$.each(json.feed.entry,function(i,this_photo){
					
					if ((this_photo.gsx$datetaken.$t !== '') && (this_photo.gsx$datetaken.$t.substr(0,2) !== '') && (this_photo.gsx$datetaken.$t.substr(3,2)) && (this_photo.gsx$datetaken.$t.substr(6,4)))
					{
						count++; // count each photo as we process it...
						$("#flickr_data").append(count + ': '+ this_photo.gsx$datetaken.$t+';'+this_photo.gsx$address.$t+','+this_photo.gsx$urltojpg.$t+'|');
						$("#flickr_count").html('<p>Loading Photos From Google Spreadsheet: <b>'+count+'</b></p>');					
						$("#status_message").html('<h2>One Moment Please...</h2>');
						
						// get the month and year of the date this photo was taken		
						// format: yyyy-mm-dd
						//year = this_photo.gsx$datetaken.substr(0,4);
						//month = this_photo.gsx$datetaken.substr(5,2);
						//day = this_photo.gsx$datetaken.substr(8,2);
	
						// get the month and year of the date this photo was taken		
						// format: mm-dd-yyyy
						month = this_photo.gsx$datetaken.$t.substr(0,2);
						day = this_photo.gsx$datetaken.$t.substr(3,2);
						year = this_photo.gsx$datetaken.$t.substr(6,4);
						
						//console.debug('data:' +month+'-'+day+'-'+year);
						console.debug('|'+year+'|');
						
						// strip leading zeros from the month or day
						// EX: datetaken":"2013-11-05 13:28:40
						if (month.substr(0,1) === '0')
							month = month.substr(1,1);
						if (day.substr(0,1) === '0')
							day = day.substr(1,1);		
						
						// increment the counter for the year this photo was taken
						count_per_year_arr[year]++; 
						console.debug(year +' counter'+count_per_year_arr[year]);
						
						// increment the counter for the month and year this photo was taken     		
						count_per_month_arr[month+''+year]++;   		
	
						
		    			// only collect the daily data for january.
		    			//if ((year == 2009) && (month == 1))
		    			//{
							// increment the counter for the month and year this photo was taken     		
							count_per_day_arr[day+''+month+''+year]++;   		
						//}
						
						// calculate the progress bar percentage
						var progress_bar = document.getElementById('progress-bar');
						percentage_loaded = (count * 100)/total_photos;
						progress_bar.style.width = percentage_loaded+'%';
						
						// show the ending total count
		    			if (count >= (total_photos-100))
		    			{
		    				$("#status_message").html(''); // clear the status message
							$("#flickr_count").html('<p>Photos Loaded: <b>'+total_photos+'</b> [<a target=_blank href='+apiurl+'>JSON</a>][<a target=_blank href='+apiurl_html+'>Data Source</a>]</p>');
							progress_bar.style.width = '100%';
							
							// we are done so hide the progress bar
							var progress_bar_container = document.getElementById('progress');
							progress_bar_container.style.visibility="hidden";
							
						} // end if (count >= (total_photos-250))
					} // end if datetaken is blank...
						  					
				}); // end $.each(json.photos.photo,function(i,myresult){
					
	    	//}); // end $.getJSON(apiurl,function(json){    
	    		
	     //} // end for (var this_page=1;this_page<=num_photo_pages;this_page++)


		// build the yAxis labels and get data in a format that highcharts likes
		year_arr_index = 0;
		month_arr_index = 0;
		day_arr_index = 0;
		
		for (this_year = 2006; this_year <= 2014; this_year++)
	    {
	    	// year labels...
	    	year_labels_arr[year_arr_index] = this_year;
	    		    	
	    	// move the counts into the delivery array that highchart wants... index of 0,1,2,3,4,5,6,7,8,etc..
	    	year_data_arr[year_arr_index] = count_per_year_arr[this_year];
	    	
	    	for(this_month = 1; this_month <= 12; this_month++)
	    	{	
	    		// monthly labels...
	    		month_labels_arr[month_arr_index] = this_month+'-'+this_year;
	    		    	
	    		// move the counts into the delivery array that highchart wants... index of 1,2,3,4,5,6,7,8,etc..
	    		month_data_arr[month_arr_index] = count_per_month_arr[this_month+''+this_year];
	    		   		    		
	    		// only collect the data for january.
	    		//if ((this_year == 2009) && (this_month == 1))
	    		//{
	    			for(this_day = 1; this_day <= 31; this_day++)
	    			{
	    				// monthly labels...
	    				day_labels_arr[day_arr_index] = this_month+'-'+this_day+'-'+this_year;
	    		    	
	    				// move the counts into the delivery array that highchart wants... index of 1,2,3,4,5,6,7,8,etc..
	    				day_data_arr[day_arr_index] = count_per_day_arr[this_day+''+this_month+''+this_year];
	    		   	
	    				// increment the monthly index
	    				day_arr_index++;
	    			} // end for(this_day = 1; this_day <= 31; this_day++)
	    			  
	    		//} // end if ((year == 2009) && (month == 1))
	    		
	    		// increment the monthly index
	    		month_arr_index++;

	    	} // end for(this_month = 1; this_month <= 12; this_month++)
	    		    	
	    	// increment the yearly index
	    	year_arr_index++;

	    } // end for (this_year = 2006; this_year <= 2014; this_year++)
	    
	    //.................................................
	    // DEBUG
	    console.debug('YEARLY: yAxis labels = ' + year_labels_arr);
		console.debug('YEARLY: highcharts data array = ' + year_data_arr);
		console.debug('YEARLY 2008: orig array = ' + count_per_year_arr[2008]);
	    console.debug('MONTHLY: yAxis labels = ' + month_labels_arr);
		console.debug('MONTHLY: highcharts data array = ' + month_data_arr);
		console.debug('JANUARY2009: yAxis labels = ' + day_labels_arr);
		console.debug('JANUARY2009: highcharts data array = ' + day_data_arr);

		//.................................
		// load the bar charts 		
		////...............................................................................
		$('#yearly_chart').highcharts({
	       chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Photos taken each YEAR'
	        },
	        xAxis: {
	            categories: year_labels_arr
	        },
	        yAxis: {
	            title: {
	                text: 'Total Per Year'
	            }
	        },
	        series: [{
	            name: 'Photos',
	            data: year_data_arr 
	        }]
	    }); // end $('#yearly_chart').highcharts({
		$('#yearly_chart').append('<sub>* Obama elected: November 4, 2008<br>* Sworn into office: January 20, 2009</sub><hr>');
		
		//...............................................................................
		$('#monthly_chart').highcharts({
	       chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Flickr.com Photos taken each MONTH'
	        },
	        xAxis: {
	            categories: month_labels_arr
	        },
	        yAxis: {
	            title: {
	                text: 'Total Per Month'
	            }
	        },
	        series: [{
	            name: 'Photos',
	            data: month_data_arr 
	        }]
	    }); // end $('#monthly_chart').highcharts({
		$('#monthly_chart').append('<sub>* Obama elected: November 4, 2008<br>* Sworn into office: January 20, 2009</sub><hr>');
		
		//...............................................
		$('#january_2009_chart').highcharts({
	       chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Flickr.com Photos taken in January 2009'
	        },
	        xAxis: {
	            categories: day_labels_arr
	        },
	        yAxis: {
	            title: {
	                text: 'Total in January 2009'
	            }
	        },
	        series: [{
	            name: 'Photos',
	            data: day_data_arr 		
	        }]
	        //,
	        //turboThreshold : 0
	    }); // end $('#january_2009_chart').highcharts({
		$('#january_2009_chart').append('<sub>* Obama elected: November 4, 2008<br>* Sworn into office: January 20, 2009</sub>');



	 }); // end $.getJSON(apiurl,function(json){
	
	$(window).load(function() {
					
			
	}); // end $(window).load(function() {
	
}); // end $(document).ready(function(){