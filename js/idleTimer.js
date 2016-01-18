function idler(){
idleTimer = null;
idleState = false;
idleWait = 15000;
(function ($) { 
        $('*').bind('mousemove keydown scroll', function () {
            clearTimeout(idleTimer);            
            idleState = false;
            idleTimer = setTimeout(function () { 
			var str=window.location.href;
			var res = str.split("#");
			//alert(res[1]);
			if(res[1]!="summarypage")
			{window.location.href="#mainpage";}
                idleState = true; }, idleWait);
        });
        $("body").trigger("mousemove");
}) (jQuery)
};
idler();