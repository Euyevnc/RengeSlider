!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="./",s(s.s=3)}([function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CLICK=e.ALWAYS=e.NONE=e.HORIZONTAL=e.VERTICAL=e.RANGE=e.POINT=e.STRIDE=e.SCALE_CLICK=e.DRAG=e.DIRECT=void 0,e.DIRECT="direct",e.DRAG="drag",e.SCALE_CLICK="scaleClick",e.STRIDE="stride",e.POINT="point",e.RANGE="range",e.VERTICAL="vertical",e.HORIZONTAL="horizontal",e.NONE="none",e.ALWAYS="always",e.CLICK="click"},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(2);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.subscribe=t=>{this.observers.push(t)},this.unsubscribe=t=>{this.observers=this.observers.filter(e=>e!==t)},this.broadcast=(...t)=>{this.observers.forEach(e=>e(...t))},this.observers=[]}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),n=s(4),r=s(19),a=s(21),o=s(23),l=s(1),c=void(jQuery.fn.rangeSlider=function(t){return new d(this[0],t)});class d{constructor(t,e){this.getConfig=()=>this.config.getData(),this.changeConfig=t=>{const e=this.config.getData();this.config.setData(t);const s=this.config.getData();this.configObserver.broadcast(e,s)},this.addValuesUpdateListener=t=>{this.presenter.addValuesUpdateListener(t)},this.removeValuesUpdateListener=t=>{this.presenter.removeValuesUpdateListener(t)},this.addConfigChangeListener=t=>this.configObserver.subscribe(t),this.removeConfigChangeListener=t=>this.configObserver.unsubscribe(t),this.root=t,this.config=new o.default(e),this.model=new r.default(this.config),this.view=new n.default(this.root,this.config),this.presenter=new a.default(this.view,this.model),this.configObserver=new l.default,this.addConfigChangeListener(()=>{this.reRender()}),this.addConfigChangeListener((t,e)=>{t.step!==e.step&&this.model.adaptValues()});const{start:s,end:i}=this.config.getData();this.model.updateDirectly({startPosition:s,endPosition:i})}getValues(){return this.model.getValues()}setValues(t,e){const{type:s}=this.config.getData();s===i.POINT?this.model.updateDirectly({endPosition:t}):this.model.updateDirectly({startPosition:t,endPosition:e})}reRender(){this.view.render(),this.model.updateDirectly({})}}e.default=c},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(5);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(1),n=s(6),r=s(9),a=s(12),o=s(15);s(18);e.default=class{constructor(t,e){this.updateView=t=>{const{start:e,end:s}=t.coordinates,{start:i,end:n}=t.values;this.tumblers.update(e,s,i,n),this.indicator.update(e,s),this.scale.update(i,n)},this.observer=new i.default,this.root=t,this.config=e,this.render()}render(){const{root:t,config:e}=this,{orient:s}=e.getData(),i=document.createElement("div");i.className="range-slider  js-range-slider  range-slider_orient_"+s,this.element=i,this.line=new o.default(e,i,this.observer.broadcast),this.scale=new a.default(e,i,this.observer.broadcast),this.tumblers=new n.default(e,this.line.element,this.observer.broadcast),this.indicator=new r.default(e,this.line.element),t.innerHTML="",t.append(this.element)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(7);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0);s(8);e.default=class{constructor(t,e,s){this.render=()=>{const{orient:t,type:e}=this.config.getData(),s=[];for(let n=0;n<2;n+=1){const r=document.createElement("div");r.className="js-range-slider__tumbler range-slider__tumbler  range-slider__tumbler_orient_"+t,r.tabIndex=0;const a=this.createCloud();this.clouds.push(a),r.append(a),r.addEventListener("touchstart",this.handlerTumblerTouchStart),r.addEventListener("pointerdown",this.handleTumblerPointerDown),r.addEventListener("keydown",this.handlerTumblerKeydown),r.addEventListener("focus",this.handlerTumblerFocus);e===i.POINT&&0===n&&(r.style.display="none"),s.push(r)}this.elements=s,this.elements.forEach(t=>{this.parent.append(t)})},this.handlerTumblerTouchStart=t=>{t.preventDefault()},this.handleTumblerPointerDown=t=>{const{cloud:e}=this.config.getData(),s=t.target.closest(".js-range-slider__tumbler"),n=s.querySelector(".js-range-slider__cloud "),r=s===this.elements[0];document.body.style.cursor="pointer",e===i.CLICK&&n.classList.remove("range-slider__cloud_invisible");const a=t=>{this.handlerDocumentMove(t,r)};document.addEventListener("pointermove",a),document.addEventListener("pointerup",()=>{e===i.CLICK&&n.classList.add("range-slider__cloud_invisible"),document.body.style.cursor="auto",document.removeEventListener("pointermove",a)},{capture:!0,once:!0})},this.handlerTumblerFocus=t=>{const{cloud:e}=this.config.getData(),s=t.target,n=s.querySelector(".js-range-slider__cloud ");e===i.CLICK&&n.classList.remove("range-slider__cloud_invisible"),s.onblur=t=>{e===i.CLICK&&n.classList.add("range-slider__cloud_invisible"),t.target.onblur=null}},this.handlerTumblerKeydown=t=>{const{callback:e}=this,{orient:s}=this.config.getData(),n=t.target===this.elements[0],r="ArrowDown"===t.key&&s===i.VERTICAL||"ArrowLeft"===t.key&&s!==i.VERTICAL,a="ArrowUp"===t.key&&s===i.VERTICAL||"ArrowRight"===t.key&&s!==i.VERTICAL;r?(e(i.STRIDE,n?{startPosition:-1}:{endPosition:-1}),t.preventDefault()):a&&(e(i.STRIDE,n?{startPosition:1}:{endPosition:1}),t.preventDefault())},this.handlerDocumentMove=(t,e)=>{const{orient:s}=this.config.getData(),n=this.elements[0].closest(".js-range-slider"),r=(n.getBoundingClientRect().bottom-t.clientY)/n.getBoundingClientRect().height*100,a=(t.clientX-n.getBoundingClientRect().left)/n.getBoundingClientRect().width*100,o=s===i.VERTICAL?r:a;e?this.callback(i.DRAG,{startPosition:o}):this.callback(i.DRAG,{endPosition:o})},this.createCloud=()=>{const{orient:t,cloud:e}=this.config.getData(),s=document.createElement("div");s.className="js-range-slider__cloud range-slider__cloud  range-slider__cloud_orient_"+t;const n=document.createElement("b");return n.className="js-range-slider__cloud-value range-slider__cloud-value",s.append(n),e!==i.ALWAYS&&s.classList.add("range-slider__cloud_invisible"),s},this.updateClouds=(t,e)=>{const{elements:s}=this,{list:n,orient:r,type:a}=this.config.getData();let o,l;n.length?(o=n[t].toString(),l=n[e].toString()):(o=t.toString(),l=e.toString()),s[0].querySelector(".js-range-slider__cloud-value").innerText=o,s[1].querySelector(".js-range-slider__cloud-value").innerText=l;const[c,d]=this.elements;if(a===i.POINT)return;const h=r===i.VERTICAL?Math.abs(c.offsetTop-d.offsetTop):Math.abs(c.offsetLeft-d.offsetLeft),u=this.clouds[0],f=this.clouds[1],g=r===i.VERTICAL?u.offsetHeight:u.offsetWidth,p=r===i.VERTICAL?f.offsetHeight:f.offsetWidth;h<=g?u.classList.add("range-slider__cloud_decentralized"):u.classList.remove("range-slider__cloud_decentralized"),h<=p?f.classList.add("range-slider__cloud_decentralized"):f.classList.remove("range-slider__cloud_decentralized")},this.config=t,this.parent=e,this.clouds=[],this.callback=s,this.render()}update(t,e,s,n){const{orient:r}=this.config.getData(),[a,o]=this.elements;r===i.VERTICAL?(a.style.top=100-t+"%",o.style.top=100-e+"%"):(a.style.left=t+"%",o.style.left=e+"%"),a.style.zIndex=100===e?"2":"1",this.updateClouds(s,n)}}},function(t,e,s){},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(10);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0);s(11);e.default=class{constructor(t,e){this.config=t,this.parent=e,this.render()}render(){const{orient:t}=this.config.getData(),e=document.createElement("div");e.className="range-slider__indicator  range-slider__indicator_orient_"+t,this.element=e,this.parent.append(this.element)}update(t,e){const{orient:s}=this.config.getData(),n=this.element;s===i.VERTICAL?(n.style.bottom=t+"%",n.style.top=100-e+"%"):(n.style.left=t+"%",n.style.right=100-e+"%")}}},function(t,e,s){},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(13);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0);s(14);e.default=class{constructor(t,e,s){this.render=()=>{var t,e,s;const{orient:n,scaleInterval:r,rangeStart:a,rangeOffset:o,scale:l}=this.config.getData(),c=Math.max((null===(t=r.toString().split(".")[1])||void 0===t?void 0:t.length)||0,(null===(e=a.toString().split(".")[1])||void 0===e?void 0:e.length)||0,(null===(s=o.toString().split(".")[1])||void 0===s?void 0:s.length)||0),d=t=>+t.toFixed(c),h=Math.ceil(+(o/r).toFixed(5)),u=document.createElement("div");u.className="js-range-slider__scale range-slider__scale  range-slider__scale_orient_"+n;for(let t=0;t<=h;t+=1)if(0===t){const t=this.createDivision(a);n===i.VERTICAL?t.style.height="0px":t.style.width="0px",u.append(t)}else if(t===h){const t=this.createDivision(d(o+a));t.style.flexShrink="1",u.append(t)}else u.append(this.createDivision(d(t*r+a)));l||u.classList.add("range-slider__scale_invisible"),this.element=u,this.parent.append(this.element)},this.handlerDivisionPointerDown=t=>{const{orient:e,type:s}=this.config.getData(),n=t.target.closest(".js-range-slider__scale-division"),r=e===i.VERTICAL?n.offsetTop:n.offsetLeft+n.offsetWidth,a=e===i.VERTICAL?[...n.closest(".js-range-slider").querySelectorAll(".js-range-slider__tumbler")].map(t=>t.offsetTop):[...n.closest(".js-range-slider").querySelectorAll(".js-range-slider__tumbler")].map(t=>t.offsetLeft),o=Math.abs(r-a[0]),l=Math.abs(r-a[1]),c=e===i.VERTICAL?100-100/n.closest(".js-range-slider__scale").offsetHeight*r:100/n.closest(".js-range-slider__scale").offsetWidth*r;s===i.POINT||o>=l?this.callback(i.SCALE_CLICK,{endPosition:c}):this.callback(i.SCALE_CLICK,{startPosition:c})},this.handlerDivisionKeydown=t=>{if("Enter"!==t.code)return;const{orient:e,type:s}=this.config.getData(),n=t.target.closest(".js-range-slider__scale-division"),r=e===i.VERTICAL?n.offsetTop+n.offsetHeight:n.offsetLeft,a=e===i.VERTICAL?[...n.closest(".js-range-slider").querySelectorAll(".js-range-slider__tumbler")].map(t=>t.offsetTop):[...n.closest(".js-range-slider").querySelectorAll(".js-range-slider__tumbler")].map(t=>t.offsetLeft),o=Math.abs(r-a[0]),l=Math.abs(r-a[1]),c=e===i.VERTICAL?100-100/n.closest(".js-range-slider__scale").offsetHeight*r:100/n.closest(".js-range-slider__scale").offsetWidth*r;s===i.POINT||o>=l?this.callback(i.SCALE_CLICK,{endPosition:c}):this.callback(i.SCALE_CLICK,{startPosition:c})},this.createDivision=t=>{const{list:e,orient:s,scaleInterval:n,rangeOffset:r}=this.config.getData(),a=e.length,o=document.createElement("span");if(o.className="js-range-slider__scale-division range-slider__scale-division  range-slider__scale-division_orient_"+s,s===i.VERTICAL){const t=Math.min(n/r*100,100);o.style.height=t+"%"}else{const t=Math.min(n/r*100,100);o.style.width=t+"%"}o.setAttribute("value",""+t.toString());const l=document.createElement("span");return l.className="range-slider__scale-value js-range-slider__scale-value",l.innerHTML=a?e[t].toString():t.toString(),l.tabIndex=0,l.addEventListener("pointerdown",this.handlerDivisionPointerDown),l.addEventListener("keydown",this.handlerDivisionKeydown),o.append(l),this.divisions.push(o),o},this.parent=e,this.config=t,this.divisions=[],this.callback=s,this.render()}update(t,e){this.element.querySelectorAll(".js-range-slider__scale-division").forEach(s=>{const i=s,n=+s.getAttribute("value");n>=t&&n<=e?i.classList.add("range-slider__scale-division_active"):i.classList.remove("range-slider__scale-division_active")})}}},function(t,e,s){},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(16);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0);s(17);e.default=class{constructor(t,e,s){this.handlerLinePointerDown=t=>{const{orient:e,type:s}=this.config.getData();if(t.target.closest(".range-slider__tumbler"))return;const n=e===i.VERTICAL?t.clientY:t.clientX,r=this.element.closest(".js-range-slider"),a=(r.getBoundingClientRect().bottom-n)/r.getBoundingClientRect().height*100,o=(n-r.getBoundingClientRect().left)/r.getBoundingClientRect().width*100,l=e===i.VERTICAL?a:o,c=e===i.VERTICAL?[...t.target.closest(".js-range-slider").querySelectorAll(".js-range-slider__tumbler")].map(t=>t.getBoundingClientRect().top+t.offsetHeight/2):[...t.target.closest(".js-range-slider").querySelectorAll(".js-range-slider__tumbler")].map(t=>t.getBoundingClientRect().left+t.offsetWidth/2),d=Math.abs(n-c[0]),h=Math.abs(n-c[1]);s===i.POINT||d>=h?this.callback(i.SCALE_CLICK,{endPosition:l}):this.callback(i.SCALE_CLICK,{startPosition:l})},this.config=t,this.parent=e,this.callback=s,this.render()}render(){const{orient:t}=this.config.getData(),e=document.createElement("div");e.className="range-slider__line  range-slider__line_orient_"+t,e.addEventListener("pointerdown",this.handlerLinePointerDown),this.element=e,this.parent.append(this.element)}}},function(t,e,s){},function(t,e,s){},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(20);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),n=s(2);e.default=class{constructor(t){this.updateDirectly=t=>{this.update(this.processValue,t)},this.updateFromPercent=t=>{this.update(this.processPercent,t)},this.updateFromStride=t=>{this.update(this.processStep,t)},this.adaptValues=()=>{const{step:t,rangeOffset:e,type:s}=this.config.getData();let n=this.end===e?e:Math.min(e,Math.round(this.end/t)*t),r=Math.min(e,Math.round(this.start/t)*t);if(r===n&&s!==i.POINT){Math.abs(r-this.start)<Math.abs(n-this.end)?n=Math.min(e,n+t):r=Math.ceil(n/t)*t-t}this.setValues({start:this.matchDecimalPart(r),end:n===e?n:this.matchDecimalPart(n)})},this.update=(t,e)=>{const s=this.start,i=this.end;let{start:n,end:r}=t(e);const a=n!==s||r!==i;t===this.processValue?this.setValues({start:n,end:r}):a&&(({start:n,end:r}=this.accordinateTheCoordinates({start:n,end:r})),this.setValues({start:n,end:r}))},this.processValue=t=>{const{rangeStart:e,type:s,rangeOffset:n}=this.config.getData(),{startPosition:r,endPosition:a}=t,o=1/(Math.pow(10,this.stepDecimalPlace)||1),l=this.start,c=this.end;let d=isNaN(r)?l:r-e,h=isNaN(a)?c:a-e;return h=s===i.POINT?Math.max(0,Math.min(h,n)):Math.max(o,Math.min(h,n)),d=s===i.POINT?0:Math.min(h-o,Math.max(0,d)),{start:d,end:h}},this.processPercent=t=>{const{rangeOffset:e,step:s}=this.config.getData(),{startPosition:i,endPosition:n}=t,r=this.convertToValue(i),a=Math.round(r/s)*s,o=this.convertToValue(n);return{start:a,end:o>=e-e%s*.5?e:Math.round(o/s)*s}},this.processStep=t=>{const{step:e}=this.config.getData(),{startPosition:s,endPosition:i}=t,n=this.start,r=this.end,a=this.matchDecimalPart(n/e),o=this.matchDecimalPart(r/e);return{start:s<0?Math.ceil(a)*e+e*s:Math.floor(a)*e+e*s,end:i<0?Math.ceil(o)*e+e*i:Math.floor(o)*e+e*i}},this.accordinateTheCoordinates=t=>{const{type:e,rangeOffset:s,step:n}=this.config.getData(),{start:r,end:a}=t,o=this.start,l=this.end,c=isNaN(r)?o:Math.max(r,0),d=isNaN(a)?l:Math.min(a,s),h=this.matchDecimalPart(c/n),u=this.matchDecimalPart(d/n),f=e===i.POINT?0:Math.max(Math.ceil(u)*n-n,o),g=e===i.POINT?0:Math.min(Math.floor(h)*n+n,l),p=Math.min(c,f),_=Math.max(d,g),v={};return p!==o&&(v.start=this.matchDecimalPart(p)),_!==l&&(v.end=_===s?_:this.matchDecimalPart(_)),v},this.setValues=t=>{const{start:e,end:s}=t;isNaN(e)||(this.start=e),isNaN(s)||(this.end=s),this.callTheBroadcast()},this.callTheBroadcast=()=>{const{start:t,end:e}=this,s={start:this.convertToPercent(t),end:this.convertToPercent(e)};this.observer.broadcast({coordinates:s,values:this.getValues()})},this.matchDecimalPart=t=>parseFloat(t.toFixed(this.stepDecimalPlace)),this.convertToPercent=t=>t/(this.config.getData().rangeOffset/100),this.convertToValue=t=>t/(100/this.config.getData().rangeOffset),this.config=t,this.observer=new n.default}getValues(){var t,e,s,i,n;const{rangeStart:r,rangeOffset:a,step:o}=this.config.getData(),{start:l,end:c}=this,d=Math.max((null===(t=o.toString().split(".")[1])||void 0===t?void 0:t.length)||0,(null===(e=r.toString().split(".")[1])||void 0===e?void 0:e.length)||0,(null===(s=a.toString().split(".")[1])||void 0===s?void 0:s.length)||0,(null===(i=l.toString().split(".")[1])||void 0===i?void 0:i.length)||0,(null===(n=c.toString().split(".")[1])||void 0===n?void 0:n.length)||0);return{start:+(this.start+r).toFixed(d),end:+(this.end+r).toFixed(d)}}get stepDecimalPlace(){const{step:t}=this.config.getData(),e=t.toString().split(".")[1];return(null==e?void 0:e.length)||0}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(22);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(1),n=s(0);e.default=class{constructor(t,e){this.reactToInteraction=(t,e)=>{switch(t){case n.DRAG:case n.SCALE_CLICK:this.model.updateFromPercent(e);break;case n.STRIDE:this.model.updateFromStride(e)}},this.reactToUpdate=t=>{this.modelObserver.broadcast(t)},this.connectLayers=()=>{this.model.observer.subscribe(this.reactToUpdate),this.view.observer.subscribe(this.reactToInteraction)},this.view=t,this.model=e,this.modelObserver=new i.default,this.modelObserver.subscribe(this.view.updateView),this.connectLayers()}addValuesUpdateListener(t){this.modelObserver.subscribe(t)}removeValuesUpdateListener(t){this.modelObserver.unsubscribe(t)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(24);e.default=i.default},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),n=s(25);e.default=class{constructor(t){this.setData(t)}getData(){return Object.assign(Object.assign({},this),{list:[...this.list]})}setData(t){const{type:e,list:s,orient:r,cloud:a,scale:o,rangeStart:l,scaleInterval:c,rangeOffset:d,step:h,start:u,end:f}=t,g=e===i.RANGE||e===i.POINT;this.type=g?e:this.type||n.default.type;const p=r===i.VERTICAL||r===i.HORIZONTAL;this.orient=p?r:this.orient||n.default.orient;const _=a===i.NONE||a===i.ALWAYS||a===i.CLICK;this.cloud=_?a:this.cloud||n.default.cloud,this.scale=void 0!==o?o:this.scale||n.default.scale,this.rangeStart=void 0!==l?l:this.rangeStart||n.default.rangeStart,this.step=Math.abs(h||this.step||n.default.step),this.rangeOffset=void 0!==d?Math.max(this.step,Math.abs(d)):this.rangeOffset||n.default.rangeOffset,this.scaleInterval=void 0!==c?Math.max(this.step,Math.abs(c)):this.scaleInterval||n.default.scaleInterval;if(s&&s.length)this.list=s,this.rangeOffset=s.length-1,this.rangeStart=0,this.step=1,this.scaleInterval=1;else{const t=this.list&&this.list.length;this.list=t?this.list:n.default.list}this.end=void 0!==f?f:this.end||this.rangeStart+this.rangeOffset,this.start=void 0!==u?u:this.start||this.rangeStart}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(0),n={type:i.RANGE,orient:i.HORIZONTAL,cloud:i.CLICK,rangeOffset:100,rangeStart:0,scaleInterval:10,step:1,scale:!1,list:[],start:0,end:0};e.default=n}]);