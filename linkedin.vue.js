/*
<section class="containerIframe" style="position: fixed;top: 0px;right: 0px;z-index: 1000;-webkit-box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.75);box-shadow: 0px 0px 12px 1px rgba(0,0,0,0.75);">
  <iframe class="tuto" id="myIframe" name="myIframe" src="https://www.linkedin.com" style="height: 500px;"></iframe>
</section>
*/

(function(){

    var count = 0;
    var stop = true;
    function periodicall(iterator){
        if(stop) return;
        let nextElement = iterator.next();
        if (!nextElement.done) {
		window.document.querySelector("iframe#myIframe").setAttribute("src", nextElement.value.href);
		count++;
		onloadDone = () => {
			setTimeout(function() {
                		periodicall(iterator);
                	}, Math.floor((Math.random()*2000)+5000));
		};
        } else {
            window.console.info("load next page");
            if (window.document.querySelector("button[aria-label='Next']")) {
                    (window.document.querySelector("button[aria-label='Next']")).click()
            }
            setTimeout(function(){
                periodicall(loadProfileLinks());
            }, 20000);
        }
    };

    var onloadDone = () => window.console.log('default listener');

    document.querySelector("iframe#myIframe").onload = function() {
	clearConsole();
	window.console.log('myframe is loaded');
	onloadDone();
    }

    function loadProfileLinks() {
        return window.document.querySelectorAll("div[data-view-name='search-entity-result-universal-template'] a.app-aware-link.scale-down").values();
    }
    
    var clearConsole = window.clear;

    Api = {
        stop : ()=> stop = true,
        start : ()=> {
            if(stop){
                stop = false;
                periodicall(loadProfileLinks());
            }
        },
        count: ()=> count
    }

    window["Linkedin"] = Api;
    
})();
