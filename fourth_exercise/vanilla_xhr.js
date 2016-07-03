function makeACall(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);

    xhr.onreadystatechange = function () {
        var DONE = 4; // 4 request done
        var OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                callback(xhr.responseText);
            }
            else {
                alert("Ajax error");
            }
        }
    };
}

(function () {
    var str = "";
    //var url1 = "http://localhost:9123/a1";
    //var url2 = "http://localhost:9123/a2";
    var url1 = "https://cdn.gfkdaphne.com/tests/async.php?a=1";
    var url2 = "https://cdn.gfkdaphne.com/tests/async.php?a=2";

    makeACall(
        url1,
        function (value) {
            str += value + " ";
            makeACall(
                url2,
                function (value)
                {
                    str += value;
                    document.getElementById("loading").style.visibility = "hidden";
                    document.getElementById("t1").innerHTML = str;
                }
            )
        }
    )
})();