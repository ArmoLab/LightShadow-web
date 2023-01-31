window.location.flying = async function (TargetURL) {
    var TargetURLObject = toURLObj(TargetURL);
    if (
        (TargetURLObject === "notValid" || TargetURLObject.hostname === location.hostname) &&
        window.fetch && window.DOMParser
    ) {
            var TargetResponse = await fetch(TargetURL).then(function (res) {return res.text()})
            var TempParser = new DOMParser();
            var TargetDOM = TempParser.parseFromString(TargetResponse, "text/html");
            document.title = TargetDOM.title;
            document.body.innerHTML = TargetDOM.body.innerHTML;
            history.pushState({}, "0", TargetURL)
            DOMLoadedEval()
    } else {
        location.assign(TargetURL);
    }
}
function toURLObj (Strings) {
    try {
        return new URL(Strings)
    } catch (e) {
        return "notValid"
    }
}

if (
    document.querySelectorAll &&
    window.fetch && window.DOMParser
) {
    function DOMLoadedEval () {
        let Links2Fly = document.querySelectorAll("a[href]");
        for (var i=0; i<Links2Fly.length; i++) {
            let link = toURLObj(Links2Fly[i].href);
            if (link === "notValid" || link.hostname === location.hostname) {
                Links2Fly[i].href = "javascript:location.flying('" + Links2Fly[i].href + "')"
            }
        }
    }
    addEventListener("DOMContentLoaded", DOMLoadedEval)
}
