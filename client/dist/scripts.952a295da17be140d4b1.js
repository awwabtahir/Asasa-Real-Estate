!function(e,t,i){var n=e.scripts[e.scripts.length-1],a=e.createElement("script");a.id="la_x2s6df8d",a.async=!0,a.src="https://asasa.ladesk.com/scripts/track.js",a.onload=a.onreadystatechange=function(){var e,t=this.readyState;t&&"complete"!=t&&"loaded"!=t||(e=this,LiveAgent.instance.isMobileBrowser=!1,LiveAgent.createButton("446a48ae",e))},n.parentElement.insertBefore(a,n.nextSibling)}(document),function(e,t,i){var n=e.scripts[e.scripts.length-1],a=e.createElement("script");a.id="la_x2s6df8d",a.async=!0,a.src="https://asasa.ladesk.com/scripts/track.js",a.onload=a.onreadystatechange=function(){var e=this.readyState;e&&"complete"!=e&&"loaded"!=e||LiveAgent.createButton("c1045226",this)},n.parentElement.insertBefore(a,n.nextSibling)}(document);var myLaForm,integrationWidgetID="98a82353",integrationSRC="https://asasa.ladesk.com/scripts/track.js",integrationID="la_x2s6df8d";function openForm(){var e=document.createElement("div");e.setAttribute("id","modal_plugin"),e.innerHTML='<div id="modal_blocker" style="position: fixed; top:0; left:0; width:100%;height:100%;opacity:0.6;z-index:999998;background:#000;"></div><div id="modal_window" style="z-index:200; position:fixed; left:50%; top:50%; width:80%; max-width:1000px; height:90%; max-height:800px; z-index:999999; background:#fff; border: 0px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.5);"><style>iframe[id*="b_'+integrationWidgetID+'"], #modal_content_wrapper {width:100% !important; height:100% !important;} #modal_content_wrapper {z-index:2; position:relative;} #modal_loading { z-index:1; position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); } .dot { width: 10px; height: 10px; border: 2px solid rgba(0, 0, 0, 0.5); border-radius: 50%; float: left; margin: 0 5px; -webkit-transform: scale(0); transform: scale(0); -webkit-animation: fx 1000ms ease infinite 0ms; animation: fx 1000ms ease infinite 0ms; } .dot:nth-child(2) { -webkit-animation: fx 1000ms ease infinite 300ms; animation: fx 1000ms ease infinite 300ms; } .dot:nth-child(3) { -webkit-animation: fx 1000ms ease infinite 600ms; animation: fx 1000ms ease infinite 600ms; } @-webkit-keyframes fx { 50% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { opacity: 0; } } @keyframes fx { 50% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { opacity: 0; } } }</style><div id="modal_loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div id="modal_content_wrapper"><div id="modal_content"></div></div><div id="modal_close" style="position:absolute; top:0; right:0; margin-top:-30px; margin-right:-30px; cursor:pointer; color: #fff; font-size: 25px; font-family:Arial; display: inline-block; padding:5px;">&#x2716;</div></div>',document.body.appendChild(e),document.getElementById("modal_blocker");var t=document.getElementById("modal_window");t.style.marginTop=-t.offsetHeight/2+"px",t.style.marginLeft=-t.offsetWidth/2+"px";var i=function(e){if(document.getElementById("modal_close").removeEventListener("onclick",i),document.getElementById("modal_blocker").removeEventListener("onclick",i),null!=document.getElementById("la_x2s6df8d")){var t=document.getElementById(integrationID);t.parentNode.removeChild(t)}if(null!=document.getElementById("modal_plugin")){var n=document.getElementById("modal_plugin");n.parentNode.removeChild(n)}delete LiveAgent,delete LiveAgentTracker,delete LiveAgentTrackerXD};document.getElementById("modal_close").addEventListener("click",i,!1),document.getElementById("modal_blocker").addEventListener("click",i,!1);var n=document.createElement("script");n.setAttribute("src",integrationSRC),n.setAttribute("id",integrationID),n.setAttribute("name","formScript"),n.onload=function(){myLaForm=LiveAgent.createForm(integrationWidgetID,document.getElementById("modal_content"))},document.body.appendChild(n)}