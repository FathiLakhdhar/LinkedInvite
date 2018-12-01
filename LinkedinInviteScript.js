(function(){
    var stop = false;
    var count = 0;
    var singleton = null;
    var time  = Math.floor((Math.random()*9000)+9000);
    var clientHeight = document.body.clientHeight;
    
    function periodicall() {
        if(stop)return;
        if((clientHeight * 1.5) > document.body.clientHeight){
            scrollDown();
        }
        time  = Math.floor((Math.random()*9000)+9000);
        sendRequest();
        setTimeout(periodicall, time);
    };
    
    function sendRequest(){
        var $btn = $("[data-control-name='invite']").first();
        if($btn){
            count ++;
            $btn.click();
            console.log('Clicked : ',$btn.find('span.visually-hidden').text().trim());
        }
    }
    function scrollDown(){
        scroll(0, 0);
        scroll(0, document.body.clientHeight);
        setTimeout(function(){
            scroll(0, 0);
        }, 1000)
    }

    var Api = {
        invite: {
            start : ()=>{
                stop = false;
                if(singleton == null){
                    singleton = {};
                    singleton.periodicall = periodicall;
                    console.log("started...");
                    scrollDown();                    
                    singleton.periodicall();
                }else{
                    console.log("is run")
                    return;
                }
            },
            stop: ()=>{
                stop = true;
                singleton = null;
                console.log("stoped...")                    
                console.info("Nombre invitation : ", count)
            },
            count : ()=>count
        } 
    }

    window["LinkedIn"] = Api;


})();
