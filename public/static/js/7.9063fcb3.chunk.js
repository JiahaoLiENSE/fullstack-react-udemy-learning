(this["webpackJsonpbuilding-frontend"]=this["webpackJsonpbuilding-frontend"]||[]).push([[7],{41:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(48);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},48:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(46),r=a.n(n),c=a(47),l=a(10),o=a(0),i=a.n(o),s=a(1),u=a(41),m=a(43),d=a(57),p=(a(64),function(e){var t=Object(o.useRef)(),a=e.center,n=e.zoom;return Object(o.useEffect)((function(){new window.ol.Map({target:t.current.id,layers:[new window.ol.layer.Tile({source:new window.ol.source.OSM})],view:new window.ol.View({center:window.ol.proj.fromLonLat([a.lng,a.lat]),zoom:n})})}),[a,n]),i.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style,id:"map"})}),E=a(49),f=a(15),h=a(11),v=a(50),w=(a(65),function(e){var t=Object(o.useContext)(h.a),a=Object(v.a)(),n=a.isLoading,s=a.error,w=a.sendRequest,b=a.clearError,O=Object(o.useState)(!1),g=Object(l.a)(O,2),j=g[0],k=g[1],C=Object(o.useState)(!1),N=Object(l.a)(C,2),_=N[0],y=N[1],D=function(){return k(!1)},L=function(){y(!1)},I=function(){var a=Object(c.a)(r.a.mark((function a(){return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return y(!1),a.prev=1,a.next=4,w("https://react-learn-app.herokuapp.com/api"+"/places/".concat(e.id),"DELETE",null,{Authorization:"Bearer "+t.token});case 4:e.onDelete(e.id),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(1);case 9:case"end":return a.stop()}}),a,null,[[1,7]])})));return function(){return a.apply(this,arguments)}}();return i.a.createElement(i.a.Fragment,null,i.a.createElement(E.a,{error:s,onClear:b}),i.a.createElement(d.a,{show:j,onCancel:D,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:i.a.createElement(m.a,{onClick:D},"CLOSE")},i.a.createElement("div",{className:"map-container"},i.a.createElement(p,{center:e.coordinates,zoom:16}))),i.a.createElement(d.a,{show:_,onCancel:L,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:i.a.createElement(i.a.Fragment,null,i.a.createElement(m.a,{inverse:!0,onClick:L},"CANCEL"),i.a.createElement(m.a,{danger:!0,onClick:I},"DELETE"))},i.a.createElement("p",null,"Do you want to proceed and delete this place? Please note that it can't be undone thereafter.")),i.a.createElement("li",{className:"place-item"},i.a.createElement(u.a,{className:"place-item__content"},n&&i.a.createElement(f.a,{asOverlay:!0}),i.a.createElement("div",{className:"place-item__image"},i.a.createElement("img",{src:"".concat("https://react-learn-app.herokuapp.com","/").concat(e.image),alt:e.title})),i.a.createElement("div",{className:"place-item__info"},i.a.createElement("h2",null,e.title),i.a.createElement("h3",null,e.address),i.a.createElement("p",null,e.description)),i.a.createElement("div",{className:"place-item__actions"},i.a.createElement(m.a,{inverse:!0,onClick:function(){return k(!0)}},"VIEW ON MAP"),t.userId===e.creatorId&&i.a.createElement(m.a,{to:"/places/".concat(e.id)},"EDIT"),t.userId===e.creatorId&&i.a.createElement(m.a,{danger:!0,onClick:function(){y(!0)}},"DELETE")))))}),b=(a(66),function(e){return 0===e.items.length?i.a.createElement("div",{className:"place-list center"},i.a.createElement(u.a,null,i.a.createElement("h2",null,"No places found. Maybe create one?"),i.a.createElement(m.a,{to:"/places/new"},"Share Place"))):i.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return i.a.createElement(w,{key:t.id,id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))});t.default=function(){var e=Object(o.useState)(),t=Object(l.a)(e,2),a=t[0],n=t[1],u=Object(v.a)(),m=u.isLoading,d=u.error,p=u.sendRequest,h=u.clearError,w=Object(s.g)(),O=Object(s.h)().userId;Object(o.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("".concat("https://react-learn-app.herokuapp.com/api","/places/user/").concat(O));case 3:t=e.sent,n(t.places),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),w.push("/");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[p,O,w]);return i.a.createElement(i.a.Fragment,null,i.a.createElement(E.a,{error:d,onClear:h}),m&&i.a.createElement("div",{className:"center"},i.a.createElement(f.a,null)),!m&&a&&i.a.createElement(b,{items:a,onDeletePlace:function(e){n((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=7.9063fcb3.chunk.js.map