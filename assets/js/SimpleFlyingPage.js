/*
 * a simple flying page javascript just for same origin
 */

window.location.flying = async function (TargetURL) {
    let TargetURLObject =
        (function () {
            try {
                return new URL(TargetURL)
            } catch (e) {
                return "notValid"
            }
        })();

    if (
        (TargetURLObject === "notValid" || TargetURLObject.hostname === location.hostname) &&
        window.fetch
    ) {
        let TargetResponse = await fetch(TargetURL).then(res => res.text())
        let TempParser = new DOMParser();
        let TargetDOM = TempParser.parseFromString(TargetResponse, "text/html");
        document.title = TargetDOM.title;
        document.body.innerHTML = TargetDOM.body.innerHTML;
        history.pushState({}, "0", TargetURL)
    } else {
        location.assign(TargetURL);
    }
}