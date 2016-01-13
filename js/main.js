var clearWorker;
var longpollerWorker;
var operation="";
var id=0;
var MasterData=[
{'type':'PPT','size':'4mb','op':'upload'},
{'type':'PPT','size':'2mb','op':'upload'},
{'type':'Image','size':'21mb','op':'download'},
{'type':'Image','size':'12mb','op':'download'},
{'type':'Video','size':'17mb','op':'download'},
{'type':'Video','size':'2mb','op':'download'},
{'type':'App','size':'12mb','op':'download'},
{'type':'App','size':'45mb','op':'download'},
{'type':'App','size':'20mb','op':'download'},
{'type':'App','size':'11mb','op':'download'},
{'type':'YouTube','size':'0mb','op':'streaming'},
{'type':'YouTube','size':'0mb','op':'streaming'},
];
var op=0;
$(document).on("pagecreate","#connectpage",function(){
  $("button").on("click",function(){
	  id=$("#txtid").val();
	  if(id==""){alert('Please enter store id.');}
	  else{
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					window.location.href="#mainpage";
				}
				if(xhttp.status == 204){alert('Store id is invalid');}
			}
		xhttp.open("GET", "http://testapi.moinwebdev.com/rest/api.php?request=GetTime&id="+id, true);
		xhttp.send();
		}
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
	  window.location.href="#youtubepage";
  });    
  $(".icon-2").on("click",function(e){
	  e.preventDefault();
	  window.location.href="#downloadspage";
  });    
  $(".icon-3").on("click",function(e){
	  e.preventDefault();
	  window.location.href="#apppage";
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
	  op=parseInt($(this).attr("data-op"));
	  operation=$(this).attr("title");
	  /*var xhttp = new XMLHttpRequest();
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
		  xhttp.send();*/
		  window.location.href="#summarypage"; 
	});
});
$(document).on("pagecreate","#youtubepage",function(){
	$(".thumper a").click(function(){
	  op=parseInt($(this).attr("data-op"));
	  operation=$(this).attr("title");
	  window.location.href="#summarypage"; 
	});
});
$(document).on("pagecreate","#apppage",function(){
	$(".appdetail button").click(function(){
	  op=parseInt($(this).attr("data-op"));
	  operation=$(this).attr("title");
	  window.location.href="#summarypage"; 
	});
});
$(document).on("pageshow","#summarypage",function(){
	$("#timer3G").timer();
	$("#timer4G").timer();
	$("#timer3G").timer('remove');
	$("#timer4G").timer('remove');
	$("#summarypage h1").html('Test Perform<br/>'+MasterData[op].type+" "+MasterData[op].op+"<br/>"+"File Size : "+MasterData[op].size);
	$(".back").hide();
	if(typeof(longpollerWorker)!="undefined"){
		longpollerWorker.terminate();
		longpollerWorker=undefined;
	}
	function longPoller(){
		if (typeof (Worker) !== "undefined") {
                 //Creating Worker Object
                 longpollerWorker = new Worker("js/longpolling.js");
                 //Call Back Function for Success
                 longpollerWorker.onmessage = workerResultReceiver;
				 // send message to web worker
                 //Call Back function if some error occurred
                 longpollerWorker.onerror = workerErrorReceiver;    
                 function workerResultReceiver(e) {
                     var data=JSON.parse(e.data);
						if(data.device1==1&&data.device2==1){$(".back").show();}
						if(data.device2==1){$('#timer4G').timer('pause');}
						if(data.device1==1){$('#timer3G').timer('pause');}
                 }
				 longpollerWorker.postMessage(id);
                 function workerErrorReceiver(e) {
                     console.log("there was a problem with the WebWorker within " + e);
                 }
              }
              else {
                  alert("Sorry!!! could not connect");
              }
	};
	function clearTimers(){
		/*if(typeof(Worker) !== "undefined") {
			clearWorker = new Worker("js/timerclear.js");
			clearWorker.onmessage = function(event) {
			 console.log('started');
			};
		}*/
		/*if(typeof(clearWorker)!="undefined"){
		clearWorker.terminate();
		clearWorker=undefined;
		}*/
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var res=JSON.parse(xhttp.responseText);
			if(res.status=="Success"&&res.device1==0&&res.device2==0){
				$("#timer3G").timer({format: '%M:%S' });
				$("#timer4G").timer({format: '%M:%S' });
				longPoller();
			}
			else{alert('Failed to trigger operation');$(".back").show();}
		}
		if(xhttp.status == 204){alert('Failed to trigger operation');$(".back").show();}
	};
	xhttp.open("GET", "http://testapi.moinwebdev.com/rest/api.php?request=clearTimers&id="+id+"&op="+operation, true);
	xhttp.send();
	};
	clearTimers();	
});