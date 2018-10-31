// For text
(function (d, src, c) { var t = d.scripts[d.scripts.length - 1], s = d.createElement('script'); s.id = 'la_x2s6df8d'; s.async = true; s.src = src; s.onload = s.onreadystatechange = function () { var rs = this.readyState; if (rs && (rs != 'complete') && (rs != 'loaded')) { return; } c(this); }; t.parentElement.insertBefore(s, t.nextSibling); })(document,
    'https://asasa.ladesk.com/scripts/track.js',
    function (e) {
        LiveAgent.instance.isMobileBrowser = false;
        LiveAgent.createButton('446a48ae', e);
    });

// For Call
(function (d, src, c) { var t = d.scripts[d.scripts.length - 1], s = d.createElement('script'); s.id = 'la_x2s6df8d'; s.async = true; s.src = src; s.onload = s.onreadystatechange = function () { var rs = this.readyState; if (rs && (rs != 'complete') && (rs != 'loaded')) { return; } c(this); }; t.parentElement.insertBefore(s, t.nextSibling); })(document,
    'https://asasa.ladesk.com/scripts/track.js',
    function (e) { LiveAgent.createButton('c1045226', e); });


// For Feedback
// (function(d, src, c) { var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');s.id='la_x2s6df8d';s.async=true;s.src=src;s.onload=s.onreadystatechange=function(){var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);};t.parentElement.insertBefore(s,t.nextSibling);})(document,
//     'https://asasa.ladesk.com/scripts/track.js',
//     function(e){ LiveAgent.createButton('4bec48d5', e); });


// Contact form
var integrationWidgetID = "98a82353";
var integrationSRC = "https://asasa.ladesk.com/scripts/track.js";
var integrationID = 'la_x2s6df8d';
var myLaForm;
function openForm() {

    var node = document.createElement("div");
    node.setAttribute("id", "modal_plugin");
    node.innerHTML = '<div id="modal_blocker" style="position: fixed; top:0; left:0; width:100%;height:100%;opacity:0.6;z-index:999998;background:#000;"></div>'
        + '<div id="modal_window" style="z-index:200; position:fixed; left:50%; top:50%; width:80%; max-width:1000px; height:90%; max-height:800px; z-index:999999; background:#fff; border: 0px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.5);">'
        + '<style>iframe[id*="b_' + integrationWidgetID + '"], #modal_content_wrapper {width:100% !important; height:100% !important;} #modal_content_wrapper {z-index:2; position:relative;} #modal_loading { z-index:1; position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); } .dot { width: 10px; height: 10px; border: 2px solid rgba(0, 0, 0, 0.5); border-radius: 50%; float: left; margin: 0 5px; -webkit-transform: scale(0); transform: scale(0); -webkit-animation: fx 1000ms ease infinite 0ms; animation: fx 1000ms ease infinite 0ms; } .dot:nth-child(2) { -webkit-animation: fx 1000ms ease infinite 300ms; animation: fx 1000ms ease infinite 300ms; } .dot:nth-child(3) { -webkit-animation: fx 1000ms ease infinite 600ms; animation: fx 1000ms ease infinite 600ms; } @-webkit-keyframes fx { 50% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { opacity: 0; } } @keyframes fx { 50% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { opacity: 0; } } }</style>'
        + '<div id="modal_loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>'
        + '<div id="modal_content_wrapper"><div id="modal_content"></div></div>'
        + '<div id="modal_close" style="position:absolute; top:0; right:0; margin-top:-30px; margin-right:-30px; cursor:pointer; color: #fff; font-size: 25px; font-family:Arial; display: inline-block; padding:5px;">&#x2716;</div></div>';
    document.body.appendChild(node);
    var modalWrapper = document.getElementById("modal_blocker");
    var modalWindow = document.getElementById("modal_window");
    modalWindow.style.marginTop = (-modalWindow.offsetHeight) / 2 + "px";
    modalWindow.style.marginLeft = (-modalWindow.offsetWidth) / 2 + "px";

    var closeModal = function (e) {
        document.getElementById("modal_close").removeEventListener("onclick", closeModal);
        document.getElementById("modal_blocker").removeEventListener("onclick", closeModal);
        if (document.getElementById("la_x2s6df8d") != null) {
            var scriptEl = document.getElementById(integrationID);
            scriptEl.parentNode.removeChild(scriptEl);
        }
        if (document.getElementById("modal_plugin") != null) {
            var modalEl = document.getElementById("modal_plugin");
            modalEl.parentNode.removeChild(modalEl);
        }
        delete LiveAgent;
        delete LiveAgentTracker;
        delete LiveAgentTrackerXD;
    };

    document.getElementById("modal_close").addEventListener("click", closeModal, false);
    document.getElementById("modal_blocker").addEventListener("click", closeModal, false);

    var my_awesome_script = document.createElement('script');
    my_awesome_script.setAttribute('src', integrationSRC);
    my_awesome_script.setAttribute('id', integrationID);
    my_awesome_script.setAttribute('name', 'formScript');
    my_awesome_script.onload = function () { myLaForm = LiveAgent.createForm(integrationWidgetID, document.getElementById('modal_content')); };
    document.body.appendChild(my_awesome_script);

}
