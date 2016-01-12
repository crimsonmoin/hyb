var clearWorker;
var longpollerWorker;
var operation="";
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
	  $(".icon-21").fadeTo("fast",0.5);
	  $(".icon-31").fadeTo("fast",0.5);
	  $(".icon-11").fadeTo("fast",1);
	  $(".ppt").show();
	  $(".image").hide();
	  $(".video").hide();
	 
  });    
  $(".icon-21").on("click",function(e){
	  console.log('2');
	  e.preventDefault();
	  $(".icon-11").fadeTo("fast",0.5);
	  $(".icon-31").fadeTo("fast",0.5);
	  $(".icon-21").fadeTo("fast",1);
	  $(".image").show();
	  $(".ppt").hide();
	  $(".video").hide();
  });    
  $(".icon-31").on("click",function(e){
	  console.log('3');
	  e.preventDefault();
	  $(".icon-11").fadeTo("fast",0.5);
	  $(".icon-21").fadeTo("fast",0.5);
	  $(".icon-31").fadeTo("fast",1);
	  $(".video").show();
	  $(".ppt").hide();
	  $(".image").hide();
  });
  $(".thumper a").click(function(){
	  operation=$(this).attr("title");
	  var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
				var data=JSON.parse(xhttp.responseText);
					if(data.status==1){
						window.location.href="#summarypage"; 
					}
					else{
						alert('Failed to connect');
					}
			}
		  };
		  xhttp.open("GET", "http://testapi.moinwebdev.com/rest/api.php?request=Operation&id="+id+"&op="+operation, true);
		  xhttp.send();
	});
});

$(document).on("pageshow","#summarypage",function(){
	$("#timer3G").timer();
	$("#timer4G").timer();
	$("#timer3G").timer('remove');
	$("#timer4G").timer('remove');
	$(".back").hide();
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
					 if(data.device1==1&&data.device2==1){$(".back").show();}
						if(data.device1==0&&data.device2==0){
							$(".back").hide();
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
                  alert("Sorry!!! could not connect");
              }
			  
	function clearTimers(){
		if(typeof(Worker) !== "undefined") {
			clearWorker = new Worker("js/timerclear.js");
			clearWorker.onmessage = function(event) {
			 console.log('started');
			};
		}
	};
	clearTimers();	
});