const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");document.querySelector("body");let d=null;function r(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.background=t}t.addEventListener("click",(()=>{d=setInterval(r,1e3),t.toggleAttribute("disabled"),e.removeAttribute("disabled")})),e.addEventListener("click",(()=>{clearInterval(d),e.toggleAttribute("disabled"),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.c829cee8.js.map