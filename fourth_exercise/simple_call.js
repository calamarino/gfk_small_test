function makeACall(url, callback) {
    $.ajax({
        url: url,
        beforeSend : function() {
            $("#loading").show();
        },
        error: function() {
            alert("Ajax error");
        },
        success: function(success) {
            callback(success);
        },
        complete: function() {
            $("#loading").hide();
        }
    })
}

$(function () {
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
                        $("#t1").html(str);
                    }
                );
            }
        );
    }
);
