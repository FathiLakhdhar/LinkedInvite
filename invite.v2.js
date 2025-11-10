(function () {

    var count = 0;
    var stop = true;
    var skipConnect; false;
    var maxRequestSent = 100;
    function periodicall(iterator) {
        if (stop) return;
        if (count > maxRequestSent) {
            console.info("Max request sent reached");
            return;
        }
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
                clickConnect(nextElement.value);
                console.log("after click")
                setTimeout(function () {
                    var envoyer = document.querySelector("#interop-outlet").shadowRoot.querySelector("button[aria-label=\"Send now\"]:not([disabled])") || 
                                    document.querySelector("#interop-outlet").shadowRoot.querySelector("button[aria-label=\"Send without a note\"]:not([disabled])");
                    if (envoyer) {
                        envoyer.click();
                        count++;
                    } else {
                        var dismiss = document.querySelector("#interop-outlet").shadowRoot.querySelector("button[aria-label=\"Dismiss\"]");
                        if (dismiss) dismiss.click();
                    }
                    setTimeout(function () {
                        periodicall(iterator);
                    }, Math.floor((Math.random() * 2000) + 3000));
                }, 3000);
            } else if (nextElement.value.outerText == "Follow") {
                console.log("before click");
                nextElement.value.parentNode.scrollIntoView();
                clickFollow(nextElement.value);
                count++;
                console.log("after click");
                setTimeout(function () {
                    periodicall(iterator);
                }, Math.floor((Math.random() * 2000) + 3000));
            } else {
                setTimeout(function () {
                    periodicall(iterator);
                }, Math.floor((Math.random() * 2000) + 3000));
            }
        } else {
            clearConsole();
            console.info("load next page");
            nextPage();

            setTimeout(function () {
                periodicall(loadSpans());
            }, 20000);
        }



    };

    function nextPage() {
        const next = elementSelector("button", (attrName, attrValue) => "data-testid" == attrName && attrValue == "pagination-controls-next-button-visible")[0];
        next.click();
    }

    function clickConnect(elem) {
        elem.click();
    }

    function clickFollow(elem) {
        elem.click();
    }

    function loadSpans() {
        const toreturn = [];
        toreturn.push(...elementSelector("a", (attrName, attrValue) => "href" == attrName && attrValue.startsWith("/preload/search-custom-invite")));
        toreturn.push(...elementSelector("button", (attrName, attrValue) => "aria-label" == attrName && attrValue.startsWith("Follow ")));
        return toreturn.values();
    }

    const elementSelector = (selector, predicate) => [...document.querySelectorAll(selector)]
    .filter(ele => [...ele.attributes]
        .filter(({ name, value }) => predicate(name, value))
        .length > 0
    );

    var clearConsole = window.clear;

    Api = {
        stop: () => stop = true,
        skipConnect: (b) => skipConnect = b,
        maxRequestSent: (max) => maxRequestSent = max,
        start: () => {
            if (stop) {
                stop = false;
                periodicall(loadSpans());
            }
        },
        count: () => count
    }

    window["Linkedin"] = Api;

})();
