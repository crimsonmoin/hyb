function idleTimer(){
idleTimer = null;
idleState = false;
idleWait = 15000;
(function ($) {
    $(document).ready(function () {   
        $('*').bind('mousemove keydown scroll', function () {
            clearTimeout(idleTimer);            
            idleState = false;
            idleTimer = setTimeout(function () { 
			var str=window.location.href;
			var res = str.split("#");
			if(res[1]!="summarypage")
			{window.location.href="#mainpage";}
                idleState = true; }, idleWait);
        });
        $("body").trigger("mousemove");
    });
}) (jQuery)
};
idleTimer();