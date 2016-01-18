idleTimer = null;
idleState = false;
idleWait = 15000;
(function ($) {
    $(document).ready(function () {   
        $('*').bind('mousemove keydown scroll', function () {
            clearTimeout(idleTimer);            
            idleState = false;
            idleTimer = setTimeout(function () { 
			var url=window.location.href;
			var res = str.split("#");
			alert(res);
			if(res!="summarypage")
			{window.location.href="#mainpage";}
                idleState = true; }, idleWait);
        });
        $("body").trigger("mousemove");
    });
}) (jQuery)