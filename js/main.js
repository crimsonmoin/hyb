$(document).on("pagecreate","#mainpage",function(){
  $("#mainpage").on("click",function(){
    window.location.href="#cpanelpage";
  });    
});
$(document).on("pagecreate","#cpanelpage",function(){
			  
	/***************************************************/
  $(".icon-1").on("click",function(e){
	  e.preventDefault();
	  console.log('1');
  });    
  $(".icon-2").on("click",function(e){
	  console.log('2');
	  e.preventDefault();
	  window.location.href="#downloadspage";
  });    
  $(".icon-3").on("click",function(e){
	  console.log('3');
	  e.preventDefault();
  });    
});

$(document).on("pagecreate","#downloadspage",function(){
	$(".icon-11").on("click",function(e){
	  e.preventDefault();
	  console.log('1');
	  window.location.href="#summarypage";
  });    
  $(".icon-21").on("click",function(e){
	  console.log('2');
	  e.preventDefault();
	  window.location.href="#summarypage";
  });    
  $(".icon-31").on("click",function(e){
	  console.log('3');
	  e.preventDefault();
	  window.location.href="#summarypage";
  });    
});

$(document).on("pagecreate","#summarypage",function(){
	if (typeof (Worker) !== "undefined") {
                 //Creating Worker Object
                 var worker = new Worker("js/longpolling.js");
                 //Call Back Function for Success
                 worker.onmessage = workerResultReceiver;
                 //Call Back function if some error occurred
                 worker.onerror = workerErrorReceiver;    
                 function workerResultReceiver(e) {
                     var data=JSON.parse(e.data);
						if(data.device1==0&&data.device2==0){
							$('#timer3G').timer('remove');$('#timer4G').timer('remove');
							$('#timer3G').timer({
							format: '%M:%S'  
							});
							$('#timer4G').timer({
							format: '%M:%S'  
							});
						}
						if(data.device2==1){$('#timer4G').timer('pause');}
						if(data.device1==1){$('#timer3G').timer('pause');}
                 }
                 function workerErrorReceiver(e) {
                     console.log("there was a problem with the WebWorker within " + e);
                 }
              }
              else {
                  alert("Sorry!!! Worker Not Supported in Your Browser");
              }
			  
	function clearTimers(){
		var w;
		if(typeof(Worker) !== "undefined") {
			if(typeof(w) == "undefined") {
				w = new Worker("js/timerclear.js");
			}
			w.onmessage = function(event) {
			 alert('started');
			};
		} else {
		   // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
		}
	};
	clearTimers();	
});