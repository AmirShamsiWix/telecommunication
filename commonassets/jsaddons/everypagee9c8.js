//
// NEWSLETTER TRACK2 FRONT END COMPONENT
//
var __trckNm = '_nwstrk2';

var jqrr = $;

jqrr(document).ready(function () {
    // THIS EXECUTES ALWAYS.
    Track2Go();

    if (!IsBeingTracked()) {
        // No tracking cookie, don't continue tracking
    } else {
        // YES tracking cookie.
        SetupTrackButtons();
    }
});


function IsBeingTracked() {
    var ck = Cookies_GetCookie(__trckNm);
    if (ck == null || ck == undefined) return false;
    return true;
}

function TrackButton(btn) {

    // USING BROWSER'S OUTERHTML PROPERTY PROXIED BY JQUERY.
    if (GetShouldStop()) return;

    var btnHtml = btn.prop('outerHTML').trim();//parent().html().trim();
    var label = btn.attr('track2label');
    var obj = {
        html: btnHtml,
        label: label,
    };
    jqrr.ajax({
        method: "POST",
        url: '/newsletter/track2/handler.aspx?action=button',
        data: obj,
        error: function (m) {
            console.log('track-2 button-track post error', m);
        },
        success: function (r) {
            if (!r.Ok) {
                console.log('Track-2 button-track error');
                return;
            }
            if (r.Stop === true) {
                SetShouldStop(true);
                console.log('Track-2 button-track Stop requested');
            } else {
                console.log("Track-2 button-track actions completed");
            }
        },
        dataType: 'json'
    });
}


function SetupTrackButtons() {
    var btns1 = $('[track2],input[type="submit"],input[type="button"],a');
    var arr = [];

    $.each(btns1, function (ix, domEl) {

        var btn = $(domEl);
        var attr = btn.attr('track2no');
        if (attr != null && attr != undefined) {
            /* SKING THIS ONE */
            return;
        }
        var el = btn[0];
        if (arr.indexOf(el) > -1) {
            // BTN TRACKED ALREADY
        } else {
            arr.push(el);

            btn.on('click', () =>TrackButton(btn));
        }

    });

}



function Track2Go() {

    var nam1 = 'schid';
    var url = new URL(document.URL);
    var c = url.searchParams.get(nam1);
    var schid = 0;
    var cid = url.searchParams.get('cid');
    var em = url.searchParams.get('em');

    if (c != null && c != undefined) {
        var id = parseInt(c);
        if (!isNaN(id))
            schid = id;
    }

    if (schid > 0) {

        var obj = {
            schid: schid,
            cid: cid,
            em: em,
        };

        jqrr.ajax({
            method: "POST",
            url: '/newsletter/track2/handler.aspx?action=transfer',
            data: obj,
            error: function(m){
                console.log('track-2 post error', m);
            },
            success: function(r) {
                if (!r.Ok) {
                    console.log('Track-2 error');
                    return;
                }
                console.log("Track-2 actions completed");
            },
            dataType: 'json'
        });
    }
}



function GetShouldStop() {
    var val = Storage_GetWithExpiry('_nwstrk2_stp');
    if (val == null) return false;
    return val;
}

function SetShouldStop(val) {
    /* DURATION IN MSECS. */
    var duration = 60 * 60 * 1000;
    Storage_SetWithExpiry('_nwstrk2_stp', val, duration);
}


function Storage_SetWithExpiry(key, value, ttl) {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}


function Storage_GetWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}








var __escToAdmin = {
    msgA: "'Are you sure you want to leave this page\nand enter the Admin Section?'",
    msgB: "A Popup blocker might have blocked the new window.\nDo you want to open the Admin in this window?",
};

var __escToAdmingCount = 0;
var __escToAdmingTO = null;

document.onkeyup = JumpToAdmin;

function JumpToAdmin(e) {
    var KeyID = (window.event) ? event.keyCode : e.keyCode;
    if (KeyID == 27) {

        __escToAdmingCount++;

        if (__escToAdmingCount < 2) {
            __escToAdmingTO = setTimeout(function () {
                __escToAdmingCount = 0;
            }, 250);
            return;
        }
        clearTimeout(__escToAdmingTO);
        __escToAdmingCount = 0;


        // THE FOLLOWING CHECK IS TO AVOID TRAPPING THE ESC KEY WHEN THE USER IS
        // EDITING A FIELD. IF THE USER IS EDITING A FIELD, THE ESC KEY IS THE STANDARD TO
        // CLEAR THE FIELD, THAT'S WHY WE DON'T WANT TO TRAP IT THERE.
        //
        // BUT NOW WE ARE USING DOUBLE ESC KEY. SO THIS LOGIC WOULD NO LONGER BE APPLYING.
        //

        // if (nn != "INPUT" && nn != "TEXTAREA") {

        var tp = window['__escToAdmin.targetPage'];
        if (window['__escToAdmin.simpleMode']) {
            if (confirm(__escToAdmin.msgA)) {
                var nuWin = window.open("/admin/" + tp);
                if (nuWin == null) {
                    if (confirm(__escToAdmin.msgB))
                        location.href = "/admin/" + tp;
                }
            }
        } else {
            jConfirm(__escToAdmin.msgA, 'Jump to Admin', function (r) {
                if (r) {
                    var nuWin = window.open("/admin/" + tp);
                    if (nuWin == null) {
                        jConfirm(__escToAdmin.msgB, 'Popup Blocked', function (r) {
                            if (r) location.href = "/admin/" + tp;
                        });

                    }

                }
            });
        }

        //}
    }
}












function Cookies_GetCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}






/*
ACTIVATION FUNCTION FOR BLUETONE'S IN-FORM REPORT. 
*/
(function () {
    var ctrlKeyPressed = false;
    var escKeyPressed = false;
    var clickCount = 0;
    var timeoutId;
    var maxDelayMsec = 1000;

    document.addEventListener("keydown", function (event) {
        if (event.key === "Control") {
            ctrlKeyPressed = true;
        }
        if (event.key === "Q" || event.key === "q") {
            escKeyPressed = true;
            if (ctrlKeyPressed) {
                clickCount++;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    clickCount = 0;
                }, maxDelayMsec);

                if (clickCount === 2) {
                    executeFunction();
                }
            }
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.key === "Control") {
            ctrlKeyPressed = false;
        }
        if (event.key === "Escape") {
            escKeyPressed = false;
        }
    });

    function executeFunction() {
        Activate();
    }



    var _loaded = false;
    var _wait = false;
    function Activate() {
        if (_wait) return;

        if (_loaded) {
            ContinueReportation();
            return;
        }
        _wait = true;

        console.log('loading scripts...');

        $.get("/specdev/bluetone/ajax/InPageReportFormService.aspx", function (response) {

            if (!response.Ok) {
                console.log('In-Page report form load error: '+response.Msg);
                return;
            }

            _loaded = true;
            _wait = false;

            $("body").prepend(response.Data);

            var scripts = $("#formContainer").find("script").text();
            window.eval(scripts);

            BeginReportation(response);
        });

    }


    //setTimeout(() => { Activate(); }, 100);


})();