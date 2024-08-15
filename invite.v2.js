(function(){

    var count = 0;
    var stop = true;
    var skipConnect; false;
    function periodicall(iterator){
        if(stop) return;
        let nextElement = iterator.next();
        if (!nextElement.done) {
            if (nextElement.value.outerText == "Connect") {
                if (skipConnect) {
                    console.log("skip connect");
                    periodicall(iterator);
                    return;
                }
                console.log("before click")
    		    nextElement.value.parentNode.scrollIntoView();
                nextElement.value.parentNode.click();
                console.log("after click")
                setTimeout(function(){
                    var envoyer = document.querySelector("button[aria-label=\"Send now\"]:not([disabled])") || document.querySelector("button[aria-label=\"Send without a note\"]:not([disabled])");
                    if(envoyer){
                            envoyer.click();
                            count++;
                    }else{
                        var dismiss = document.querySelector("button[aria-label=\"Dismiss\"]");
                        if (dismiss) dismiss.click();
                    }
            		setTimeout(function() {
                		periodicall(iterator);
                	}, Math.floor((Math.random()*2000)+3000));
                }, 3000);
            } else if (nextElement.value.outerText == "Follow") {
                console.log("before click");
                nextElement.value.parentNode.scrollIntoView();
                nextElement.value.parentNode.click();
                count++;
                console.log("after click");
                setTimeout(function() {
                		periodicall(iterator);
            	}, Math.floor((Math.random()*2000)+3000));
            } else {
    			setTimeout(function() {
                		periodicall(iterator);
            	}, Math.floor((Math.random()*2000)+3000));
    		}
        } else {
            clearConsole();
            console.info("load next page");
            if (document.querySelector("button[aria-label='Next']")) {
                    (document.querySelector("button[aria-label='Next']")).click()
            }
    
            setTimeout(function(){
                periodicall(loadSpans());
            }, 20000);
        }
        
        
        
    };

    function loadSpans() {
        return document.querySelectorAll(".reusable-search__result-container span.artdeco-button__text").values();
    }
    
    var clearConsole = window.clear;

    Api = {
        stop : ()=> stop = true,
        skipConnect: (b) => skipConnect = b,
        start : ()=> {
            if(stop){
                stop = false;
                periodicall(loadSpans());
            }
        },
        count: ()=> count
    }

    window["Linkedin"] = Api;
    
})();
