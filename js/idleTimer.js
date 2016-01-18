idleTimer = null;
idleState = false;
idleWait = 15000;
(function ($) {
    $(document).ready(function () {   
        $('*').bind('mousemove keydown scroll', function () {
            clearTimeout(idleTimer);            
            idleState = false;
            idleTimer = setTimeout(function () { 
			alert(window.location.href);
			if(window.location.href!="#summarypage")
			{window.location.href="#mainpage";}
                idleState = true; }, idleWait);
        });
        $("body").trigger("mousemove");
    });
}) (jQuery)