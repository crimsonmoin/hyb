var clearWorker;
var longpollerWorker;
var id=0;
$(document).on("pagecreate","#connectpage",function(){
  $("button").on("click",function(){
	  id=$("#txtid").val();
	  if(id==""){alert('Please enter store id.');}
	  else{window.location.href="#mainpage";}
  });    
});
$(document).on("pagecreate","#mainpage",function(){
  $("#mainpage").on("click",function(){
    window.location.href="#cpanelpage";
  });    
});
$(document).on("pagecreate","#cpanelpage",function(){			  
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
	$(".image").hide();
	$(".video").hide();
	$(".ppt").show();
	$(".icon-11").on("click",function(e){
	  e.preventDefault();
	  $(".image").fadeTo("fast",0.5);
	  $(".video").fadeTo("fast",0.5);
	  $(".ppt").fadeTo("fast",1);
	  $(".ppt").show();
	  $(".image").hide();
	  $(".video").hide();
	  //window.location.href="#summarypage";
  });    
  $(".icon-21").on("click",function(e){
	  console.log('2');
	  e.preventDefault();
	  $(".ppt").fadeTo("fast",0.5);
	  $(".video").fadeTo("fast",0.5);
	  $(".image").fadeTo("fast",1);
	  $(".image").show();
	  $(".ppt").hide();
	  $(".video").hide();
  });    
  $(".icon-31").on("click",function(e){
	  console.log('3');
	  e.preventDefault();
	  $(".ppt").fadeTo("fast",0.5);
	  $(".image").fadeTo("fast",0.5);
	  $(".video").fadeTo("fast",1);
	  $(".video").show();
	  $(".ppt").hide();
	  $(".image").hide();
  });    
});

$(document).on("pageshow","#summarypage",function(){
	$("#timer3G").timer();
	$("#timer4G").timer();
	$("#timer3G").timer('remove');
	$("#timer4G").timer('remove');
	console.log(longpollerWorker);
	console.log(clearWorker);
	
	if(typeof(longpollerWorker)!="undefined"){
		longpollerWorker.terminate();
		longpollerWorker=undefined;
	}
	if(typeof(clearWorker)!="undefined"){
		clearWorker.terminate();
		clearWorker=undefined;
	}
	if (typeof (Worker) !== "undefined") {
                 //Creating Worker Object
                 longpollerWorker = new Worker("js/longpolling.js");
                 //Call Back Function for Success
                 longpollerWorker.onmessage = workerResultReceiver;
                 //Call Back function if some error occurred
                 longpollerWorker.onerror = workerErrorReceiver;    
                 function workerResultReceiver(e) {
                     var data=JSON.parse(e.data);
						if(data.device1==0&&data.device2==0){
							$("#timer3G").timer({
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
		if(typeof(Worker) !== "undefined") {
			clearWorker = new Worker("js/timerclear.js");
			clearWorker.onmessage = function(event) {
			 alert('started');
			};
		}
	};
	clearTimers();	
});