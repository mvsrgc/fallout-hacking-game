(this.webpackJsonpfallout3=this.webpackJsonpfallout3||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(6),o=n.n(c),l=(n(13),n(7)),s=n(2),i=n(1);var u=function(e){var t=e.character,n=e.checkWinner;return r.a.createElement("span",{onClick:function(){return function(e){e.length>1&&n(e)}(t)},className:"hover:bg-fallout-green hover:text-black"},t)};var m=function(e){var t=e.sequence,n=e.checkWinner,a=t.split(" "),c=a[0],o=a[1].split(/([A-Z]+)/).map((function(e,t){return Object(i.a)(e)[0]&&Object(i.a)(e)[0].charAt(0).match(/[A-Z]/)?r.a.createElement(u,{key:t,character:e,checkWinner:n}):Object(i.a)(e).map((function(e,t){return r.a.createElement(u,{key:t,character:e,checkWinner:n})}))}));return r.a.createElement("p",null,c," ",o)};var f=function(e){var t=e.entry;return r.a.createElement("span",null,">"," ",t)},h=function(e){return Math.floor(Math.random()*e)};function p(e,t){for(var n="",a=0;a<t;a++)n+=e.charAt(h(e.length));return n}function d(e,t,n){return"0x".concat((e+n*t).toString(16).toLocaleUpperCase())}function E(e,t){for(var n=0,a=Math.min(e.length,t.length),r=0;r<a;r++)e.charAt(r)===t.charAt(r)&&n++;return n}var v=["STORY","SYNOPSIS","THE","PLAYER","CHARACTER","STUMBLES","IRRADIATED","PRESSURE","ABILITY"],y=function(e,t){switch(t.type){case"check-winner":return e.hasWon||0===e.attemptsLeft?Object(s.a)({},e):t.payload===e.winnerWord?Object(s.a)(Object(s.a)({},e),{},{hasWon:!0,history:e.history.concat([t.payload,"Success!"])}):e.attemptsLeft-1===0?Object(s.a)(Object(s.a)({},e),{},{attemptsLeft:e.attemptsLeft-1,history:e.history.concat([t.payload,"".concat(E(e.winnerWord,t.payload),"/").concat(e.winnerWord.length," correct."),"You are locked out!"])}):Object(s.a)(Object(s.a)({},e),{},{attemptsLeft:e.attemptsLeft-1,history:e.history.concat([t.payload,"".concat(E(e.winnerWord,t.payload),"/").concat(e.winnerWord.length," correct."),"Incorrect attempt!"])})}},O={history:[],hasWon:!1,attemptsLeft:3,winnerWord:v[h(v.length)],sequences:function(e,t,n){for(var a=Object(i.a)(e),r=Object(i.a)(t),c=function(e){for(var t,n,a=Object(i.a)(e),r=a.length;r>0;)n=Math.floor(Math.random()*r),t=a[--r],a[r]=a[n],a[n]=t;return a}(Object(i.a)(e.keys())),o=0;o<n;o++){var l=h(r.length),s=r[l];r.splice(l,1);var u=h(12-s.length),m=c[o],f=a[m].substring(0,u+7),p=a[m].substring(u+s.length+7);a[m]=f+s+p}return a}(function(e,t){for(var n=[],a=0;a<e;a++){var r="".concat(d(61323,a,12)," ").concat(p(t,12));n.push(r)}return n}(34,"./@.!@#$%^&*()-=+><,[]{}"),v,9)};var b=function(){var e=Object(a.useReducer)(y,O),t=Object(l.a)(e,2),n=t[0],c=t[1],o=n.history,s=(n.hasWon,n.attemptsLeft),i=(n.winnerWord,n.sequences),u=function(e){c({type:"check-winner",payload:e})};return r.a.createElement("div",{className:"container mx-auto"},r.a.createElement("div",null,r.a.createElement("p",null,"ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL"),r.a.createElement("p",null,"ENTER PASSWORD NOW")),r.a.createElement("div",null,r.a.createElement("div",{className:"flex space-x-3"},r.a.createElement("span",null,s," ATTEMPT(S) LEFT:"),Array.from({length:s},(function(e,t){return r.a.createElement("span",{key:t},"\u2587")})))),r.a.createElement("div",{className:"mt-3"},r.a.createElement("div",{className:"flex justify-between sm:space-x-12 sm:justify-start"},r.a.createElement("div",{className:"flex flex-col"},i.map((function(e,t){if(t<=16)return r.a.createElement(m,{key:t,sequence:e,checkWinner:u})}))),r.a.createElement("div",{className:"flex flex-col"},i.map((function(e,t){if(t>16)return r.a.createElement(m,{key:t,sequence:e,checkWinner:u})}))),r.a.createElement("div",{className:"hidden mt-3 sm:flex sm:flex-col sm:justify-end"},o.map((function(e,t){return r.a.createElement(f,{key:t,entry:e})})))),r.a.createElement("div",{className:"flex flex-col-reverse mt-3 sm:hidden"},o.map((function(e,t){return r.a.createElement(f,{key:t,entry:e})})))))};var k=function(){return r.a.createElement(b,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.a32bec88.chunk.js.map