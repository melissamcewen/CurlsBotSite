webpackJsonp([0xf6a97759aba9],{"./node_modules/deep-equal/index.js":function(e,t,n){function r(e){return null===e||void 0===e}function l(e){return!(!e||"object"!=typeof e||"number"!=typeof e.length)&&("function"==typeof e.copy&&"function"==typeof e.slice&&!(e.length>0&&"number"!=typeof e[0]))}function a(e,t,n){var a,c;if(r(e)||r(t))return!1;if(e.prototype!==t.prototype)return!1;if(u(e))return!!u(t)&&(e=o.call(e),t=o.call(t),s(e,t,n));if(l(e)){if(!l(t))return!1;if(e.length!==t.length)return!1;for(a=0;a<e.length;a++)if(e[a]!==t[a])return!1;return!0}try{var d=i(e),f=i(t)}catch(e){return!1}if(d.length!=f.length)return!1;for(d.sort(),f.sort(),a=d.length-1;a>=0;a--)if(d[a]!=f[a])return!1;for(a=d.length-1;a>=0;a--)if(c=d[a],!s(e[c],t[c],n))return!1;return typeof e==typeof t}var o=Array.prototype.slice,i=n("./node_modules/deep-equal/lib/keys.js"),u=n("./node_modules/deep-equal/lib/is_arguments.js"),s=e.exports=function(e,t,n){return n||(n={}),e===t||(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():!e||!t||"object"!=typeof e&&"object"!=typeof t?n.strict?e===t:e==t:a(e,t,n))}},"./node_modules/deep-equal/lib/is_arguments.js":function(e,t){function n(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function r(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Object.prototype.hasOwnProperty.call(e,"callee")&&!Object.prototype.propertyIsEnumerable.call(e,"callee")||!1}var l="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();t=e.exports=l?n:r,t.supported=n,t.unsupported=r},"./node_modules/deep-equal/lib/keys.js":function(e,t){function n(e){var t=[];for(var n in e)t.push(n);return t}t=e.exports="function"==typeof Object.keys?Object.keys:n,t.shim=n},"./node_modules/exenv/index.js":function(e,t,n){var r;!function(){"use strict";var l=!("undefined"==typeof window||!window.document||!window.document.createElement),a={canUseDOM:l,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:l&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:l&&!!window.screen};r=function(){return a}.call(t,n,t,e),!(void 0!==r&&(e.exports=r))}()},"./node_modules/react-helmet/lib/Helmet.js":function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.Helmet=void 0;var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n("./node_modules/react/react.js"),d=r(c),f=n("./node_modules/prop-types/index.js"),p=r(f),m=n("./node_modules/react-side-effect/lib/index.js"),E=r(m),h=n("./node_modules/deep-equal/index.js"),T=r(h),y=n("./node_modules/react-helmet/lib/HelmetUtils.js"),A=n("./node_modules/react-helmet/lib/HelmetConstants.js"),b=function(e){var t,n;return n=t=function(t){function n(){return a(this,n),o(this,t.apply(this,arguments))}return i(n,t),n.prototype.shouldComponentUpdate=function(e){return!(0,T.default)(this.props,e)},n.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case A.TAG_NAMES.SCRIPT:case A.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case A.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},n.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,l=e.newChildProps,a=e.nestedChildren;return u({},r,(t={},t[n.type]=[].concat(r[n.type]||[],[u({},l,this.mapNestedChildrenToProps(n,a))]),t))},n.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,l=e.newProps,a=e.newChildProps,o=e.nestedChildren;switch(r.type){case A.TAG_NAMES.TITLE:return u({},l,(t={},t[r.type]=o,t.titleAttributes=u({},a),t));case A.TAG_NAMES.BODY:return u({},l,{bodyAttributes:u({},a)});case A.TAG_NAMES.HTML:return u({},l,{htmlAttributes:u({},a)})}return u({},l,(n={},n[r.type]=u({},a),n))},n.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=u({},t);return Object.keys(e).forEach(function(t){var r;n=u({},n,(r={},r[t]=e[t],r))}),n},n.prototype.warnOnInvalidChildren=function(e,t){return!0},n.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return d.default.Children.forEach(e,function(e){if(e&&e.props){var a=e.props,o=a.children,i=l(a,["children"]),u=(0,y.convertReactPropstoHtmlAttributes)(i);switch(n.warnOnInvalidChildren(e,o),e.type){case A.TAG_NAMES.LINK:case A.TAG_NAMES.META:case A.TAG_NAMES.NOSCRIPT:case A.TAG_NAMES.SCRIPT:case A.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:u,nestedChildren:o});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:u,nestedChildren:o})}}}),t=this.mapArrayTypeChildrenToProps(r,t)},n.prototype.render=function(){var t=this.props,n=t.children,r=l(t,["children"]),a=u({},r);return n&&(a=this.mapChildrenToProps(n,a)),d.default.createElement(e,a)},s(n,null,[{key:"canUseDOM",set:function(t){e.canUseDOM=t}}]),n}(d.default.Component),t.propTypes={base:p.default.object,bodyAttributes:p.default.object,children:p.default.oneOfType([p.default.arrayOf(p.default.node),p.default.node]),defaultTitle:p.default.string,defer:p.default.bool,encodeSpecialCharacters:p.default.bool,htmlAttributes:p.default.object,link:p.default.arrayOf(p.default.object),meta:p.default.arrayOf(p.default.object),noscript:p.default.arrayOf(p.default.object),onChangeClientState:p.default.func,script:p.default.arrayOf(p.default.object),style:p.default.arrayOf(p.default.object),title:p.default.string,titleAttributes:p.default.object,titleTemplate:p.default.string},t.defaultProps={defer:!0,encodeSpecialCharacters:!0},t.peek=e.peek,t.rewind=function(){var t=e.rewind();return t||(t=(0,y.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},n},S=function(){return null},_=(0,E.default)(y.reducePropsToState,y.handleClientStateChange,y.mapStateOnServer)(S),g=b(_);g.renderStatic=g.rewind,t.Helmet=g,t.default=g},"./node_modules/react-helmet/lib/HelmetConstants.js":function(e,t){t.__esModule=!0;var n=(t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"}),r=(t.VALID_TAG_NAMES=Object.keys(n).map(function(e){return n[e]}),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(r).reduce(function(e,t){return e[r[t]]=t,e},{}),t.SELF_CLOSING_TAGS=[n.NOSCRIPT,n.SCRIPT,n.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},"./node_modules/react-helmet/lib/HelmetUtils.js":function(e,t,n){(function(e){function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n("./node_modules/react/react.js"),i=r(o),u=n("./node_modules/object-assign/index.js"),s=r(u),c=n("./node_modules/react-helmet/lib/HelmetConstants.js"),d=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},f=function(e){var t=T(e,c.TAG_NAMES.TITLE),n=T(e,c.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,function(){return t});var r=T(e,c.HELMET_PROPS.DEFAULT_TITLE);return t||r||void 0},p=function(e){return T(e,c.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},m=function(e,t){return t.filter(function(t){return"undefined"!=typeof t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return a({},e,t)},{})},E=function(e,t){return t.filter(function(e){return"undefined"!=typeof e[c.TAG_NAMES.BASE]}).map(function(e){return e[c.TAG_NAMES.BASE]}).reverse().reduce(function(t,n){if(!t.length)for(var r=Object.keys(n),l=0;l<r.length;l++){var a=r[l],o=a.toLowerCase();if(e.indexOf(o)!==-1&&n[o])return t.concat(n)}return t},[])},h=function(e,t,n){var r={};return n.filter(function(t){return!!Array.isArray(t[e])||("undefined"!=typeof t[e]&&g("Helmet: "+e+' should be of type "Array". Instead found type "'+l(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,n){var l={};n.filter(function(e){for(var n=void 0,a=Object.keys(e),o=0;o<a.length;o++){var i=a[o],u=i.toLowerCase();t.indexOf(u)===-1||n===c.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||u===c.TAG_PROPERTIES.REL&&"stylesheet"===e[u].toLowerCase()||(n=u),t.indexOf(i)===-1||i!==c.TAG_PROPERTIES.INNER_HTML&&i!==c.TAG_PROPERTIES.CSS_TEXT&&i!==c.TAG_PROPERTIES.ITEM_PROP||(n=i)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return r[n]||(r[n]={}),l[n]||(l[n]={}),!r[n][s]&&(l[n][s]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var a=Object.keys(l),o=0;o<a.length;o++){var i=a[o],u=(0,s.default)({},r[i],l[i]);r[i]=u}return e},[]).reverse()},T=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},y=function(e){return{baseTag:E([c.TAG_PROPERTIES.HREF],e),bodyAttributes:m(c.ATTRIBUTE_NAMES.BODY,e),defer:T(e,c.HELMET_PROPS.DEFER),encode:T(e,c.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:m(c.ATTRIBUTE_NAMES.HTML,e),linkTags:h(c.TAG_NAMES.LINK,[c.TAG_PROPERTIES.REL,c.TAG_PROPERTIES.HREF],e),metaTags:h(c.TAG_NAMES.META,[c.TAG_PROPERTIES.NAME,c.TAG_PROPERTIES.CHARSET,c.TAG_PROPERTIES.HTTPEQUIV,c.TAG_PROPERTIES.PROPERTY,c.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:h(c.TAG_NAMES.NOSCRIPT,[c.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:p(e),scriptTags:h(c.TAG_NAMES.SCRIPT,[c.TAG_PROPERTIES.SRC,c.TAG_PROPERTIES.INNER_HTML],e),styleTags:h(c.TAG_NAMES.STYLE,[c.TAG_PROPERTIES.CSS_TEXT],e),title:f(e),titleAttributes:m(c.ATTRIBUTE_NAMES.TITLE,e)}},A=function(){var e=Date.now();return function(t){var n=Date.now();n-e>16?(e=n,t(n)):setTimeout(function(){A(t)},0)}}(),b=function(e){return clearTimeout(e)},S="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||A:e.requestAnimationFrame||A,_="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||b:e.cancelAnimationFrame||b,g=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},C=null,w=function(e){C&&_(C),e.defer?C=S(function(){v(e,function(){C=null})}):(v(e),C=null)},v=function(e,t){var n=e.baseTag,r=e.bodyAttributes,l=e.htmlAttributes,a=e.linkTags,o=e.metaTags,i=e.noscriptTags,u=e.onChangeClientState,s=e.scriptTags,d=e.styleTags,f=e.title,p=e.titleAttributes;P(c.TAG_NAMES.BODY,r),P(c.TAG_NAMES.HTML,l),M(f,p);var m={baseTag:R(c.TAG_NAMES.BASE,n),linkTags:R(c.TAG_NAMES.LINK,a),metaTags:R(c.TAG_NAMES.META,o),noscriptTags:R(c.TAG_NAMES.NOSCRIPT,i),scriptTags:R(c.TAG_NAMES.SCRIPT,s),styleTags:R(c.TAG_NAMES.STYLE,d)},E={},h={};Object.keys(m).forEach(function(e){var t=m[e],n=t.newTags,r=t.oldTags;n.length&&(E[e]=n),r.length&&(h[e]=m[e].oldTags)}),t&&t(),u(e,E,h)},O=function(e){return Array.isArray(e)?e.join(""):e},M=function(e,t){"undefined"!=typeof e&&document.title!==e&&(document.title=O(e)),P(c.TAG_NAMES.TITLE,t)},P=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(c.HELMET_ATTRIBUTE),l=r?r.split(","):[],a=[].concat(l),o=Object.keys(t),i=0;i<o.length;i++){var u=o[i],s=t[u]||"";n.getAttribute(u)!==s&&n.setAttribute(u,s),l.indexOf(u)===-1&&l.push(u);var d=a.indexOf(u);d!==-1&&a.splice(d,1)}for(var f=a.length-1;f>=0;f--)n.removeAttribute(a[f]);l.length===a.length?n.removeAttribute(c.HELMET_ATTRIBUTE):n.getAttribute(c.HELMET_ATTRIBUTE)!==o.join(",")&&n.setAttribute(c.HELMET_ATTRIBUTE,o.join(","))}},R=function(e,t){var n=document.head||document.querySelector(c.TAG_NAMES.HEAD),r=n.querySelectorAll(e+"["+c.HELMET_ATTRIBUTE+"]"),l=Array.prototype.slice.call(r),a=[],o=void 0;return t&&t.length&&t.forEach(function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===c.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===c.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var i="undefined"==typeof t[r]?"":t[r];n.setAttribute(r,i)}n.setAttribute(c.HELMET_ATTRIBUTE,"true"),l.some(function(e,t){return o=t,n.isEqualNode(e)})?l.splice(o,1):a.push(n)}),l.forEach(function(e){return e.parentNode.removeChild(e)}),a.forEach(function(e){return n.appendChild(e)}),{oldTags:l,newTags:a}},I=function(e){return Object.keys(e).reduce(function(t,n){var r="undefined"!=typeof e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},N=function(e,t,n,r){var l=I(n),a=O(t);return l?"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+l+">"+d(a,r)+"</"+e+">":"<"+e+" "+c.HELMET_ATTRIBUTE+'="true">'+d(a,r)+"</"+e+">"},j=function(e,t,n){return t.reduce(function(t,r){var l=Object.keys(r).filter(function(e){return!(e===c.TAG_PROPERTIES.INNER_HTML||e===c.TAG_PROPERTIES.CSS_TEXT)}).reduce(function(e,t){var l="undefined"==typeof r[t]?t:t+'="'+d(r[t],n)+'"';return e?e+" "+l:l},""),a=r.innerHTML||r.cssText||"",o=c.SELF_CLOSING_TAGS.indexOf(e)===-1;return t+"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+l+(o?"/>":">"+a+"</"+e+">")},"")},L=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[c.REACT_TAG_MAP[n]||n]=e[n],t},t)},G=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[c.HTML_TAG_MAP[n]||n]=e[n],t},t)},H=function(e,t,n){var r,l=(r={key:t},r[c.HELMET_ATTRIBUTE]=!0,r),a=L(n,l);return[i.default.createElement(c.TAG_NAMES.TITLE,a,t)]},k=function(e,t){return t.map(function(t,n){var r,l=(r={key:n},r[c.HELMET_ATTRIBUTE]=!0,r);return Object.keys(t).forEach(function(e){var n=c.REACT_TAG_MAP[e]||e;if(n===c.TAG_PROPERTIES.INNER_HTML||n===c.TAG_PROPERTIES.CSS_TEXT){var r=t.innerHTML||t.cssText;l.dangerouslySetInnerHTML={__html:r}}else l[n]=t[e]}),i.default.createElement(e,l)})},x=function(e,t,n){switch(e){case c.TAG_NAMES.TITLE:return{toComponent:function(){return H(e,t.title,t.titleAttributes,n)},toString:function(){return N(e,t.title,t.titleAttributes,n)}};case c.ATTRIBUTE_NAMES.BODY:case c.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return L(t)},toString:function(){return I(t)}};default:return{toComponent:function(){return k(e,t)},toString:function(){return j(e,t,n)}}}},U=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,l=e.htmlAttributes,a=e.linkTags,o=e.metaTags,i=e.noscriptTags,u=e.scriptTags,s=e.styleTags,d=e.title,f=void 0===d?"":d,p=e.titleAttributes;return{base:x(c.TAG_NAMES.BASE,t,r),bodyAttributes:x(c.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:x(c.ATTRIBUTE_NAMES.HTML,l,r),link:x(c.TAG_NAMES.LINK,a,r),meta:x(c.TAG_NAMES.META,o,r),noscript:x(c.TAG_NAMES.NOSCRIPT,i,r),script:x(c.TAG_NAMES.SCRIPT,u,r),style:x(c.TAG_NAMES.STYLE,s,r),title:x(c.TAG_NAMES.TITLE,{title:f,titleAttributes:p},r)}};t.convertReactPropstoHtmlAttributes=G,t.handleClientStateChange=w,t.mapStateOnServer=U,t.reducePropsToState=y,t.requestAnimationFrame=S,t.warn=g}).call(t,function(){return this}())},"./node_modules/react-side-effect/lib/index.js":function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n("./node_modules/react/react.js"),u=r(i),s=n("./node_modules/exenv/index.js"),c=r(s),d=n("./node_modules/shallowequal/index.js"),f=r(d);e.exports=function(e,t,n){function r(e){return e.displayName||e.name||"Component"}if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if("undefined"!=typeof n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(s){function d(){m=e(p.map(function(e){return e.props})),E.canUseDOM?t(m):n&&(m=n(m))}if("function"!=typeof s)throw new Error("Expected WrappedComponent to be a React component.");var p=[],m=void 0,E=function(e){function t(){return l(this,t),a(this,e.apply(this,arguments))}return o(t,e),t.peek=function(){return m},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=m;return m=void 0,p=[],e},t.prototype.shouldComponentUpdate=function(e){return!(0,f.default)(e,this.props)},t.prototype.componentWillMount=function(){p.push(this),d()},t.prototype.componentDidUpdate=function(){d()},t.prototype.componentWillUnmount=function(){var e=p.indexOf(this);p.splice(e,1),d()},t.prototype.render=function(){return u.default.createElement(s,this.props)},t}(i.Component);return E.displayName="SideEffect("+r(s)+")",E.canUseDOM=c.default.canUseDOM,E}}},"./node_modules/shallowequal/index.js":function(e,t){e.exports=function(e,t,n,r){var l=n?n.call(r,e,t):void 0;if(void 0!==l)return!!l;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var a=Object.keys(e),o=Object.keys(t);if(a.length!==o.length)return!1;for(var i=Object.prototype.hasOwnProperty.bind(t),u=0;u<a.length;u++){var s=a[u];if(!i(s))return!1;var c=e[s],d=t[s];if(l=n?n.call(r,c,d,s):void 0,l===!1||void 0===l&&c!==d)return!1}return!0}},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/mgmcewen/Sites/curlsbot/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/mgmcewen/Sites/curlsbot/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/mgmcewen/Sites/curlsbot/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":[["/Users/mgmcewen/Sites/curlsbot/node_modules/babel-preset-env/lib/index.js",{"loose":true,"uglify":true,"modules":"commonjs","targets":{"browsers":["> 1%","last 2 versions","IE >= 9"]},"exclude":["transform-regenerator","transform-es2015-typeof-symbol"]}],"/Users/mgmcewen/Sites/curlsbot/node_modules/babel-preset-stage-0/lib/index.js","/Users/mgmcewen/Sites/curlsbot/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/pages/cg-lite.js':function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var l=n("./node_modules/react/react.js"),a=r(l),o=n("./node_modules/gatsby-link/index.js"),i=(r(o),n("./node_modules/react-helmet/lib/Helmet.js")),u=r(i),s=function(){return a.default.createElement("div",null,a.default.createElement(u.default,{title:"Curly Girl Lite",meta:[{name:"description",content:"Products that won't leave your hair greasy"},{name:"keywords",content:"products, greasy hair, fine hair, wavy hair curly girl"}]}),a.default.createElement("h1",null,"Curly Girl = Greasy Hair? "),a.default.createElement("p",null,"One of the most common issues I see in the ",a.default.createElement("a",{href:"https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair"},"curly girl community"),' is greasy hair. Some people say it is just your hair "getting used to it," but I don\'t think so. I think a lot of is caused by using products that are too heavy for your hair. If your hair is any of the following:'),a.default.createElement("ul",null,a.default.createElement("li",null,"Fine"),a.default.createElement("li",null,"Wavy"),a.default.createElement("li",null,"Low porosity")),a.default.createElement("p",null,"You may need lighter products. Think about last time you spilled oil on clothing. Hard to get out right? When you use oily products you're doing the same thing to your hair."),a.default.createElement("p",null,"Some common ",a.default.createElement("em",null,"oily")," product lines include:"),a.default.createElement("ul",null,a.default.createElement("li",null,"Shea Moisture (with some exceptions listed below)"),a.default.createElement("li",null,"Cantu"),a.default.createElement("li",null,"Carol's Daughter"),a.default.createElement("li",null,"Adding plain oil to your hair")),a.default.createElement("p",null,"Using lighter products will help your hair curl or wave better, and prevent it from looking greasy."),a.default.createElement("p",null,"Some people (like me!) also have naturally oily skin, which means that oily products just contribute to the problem. Removing them and adding in a sulfate-free cleanser (often called a low-poo) can make a huge difference."),a.default.createElement("p",null,"Another way to lighten up your routine is limit your styling products to 1-2 products. Lighter products are mostly gels and mousses rather than creams and leave ins. "),a.default.createElement("h1",null,"Oil Free Products"),a.default.createElement("p",null,"These are the lightest products. They provide ample slip and moisture without oils or butters. * = I've tried this and like it. "),a.default.createElement("h2",null,"Moptop $$$"),a.default.createElement("ul",null,a.default.createElement("li",null,"Cleanser: ",a.default.createElement("a",{href:"http://amzn.to/2Az2Gic"},"Gentle Shampoo")),a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2nAr1zd"},"Light Conditioner (contains very small amount of oil)")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2BQEHcq"},"Curly Hair Custard")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2jm7UEk"},"Anti-frizz Medium Hold Gel"))),a.default.createElement("h2",null,"Not Your Mothers Naturals Blue Sea Kale & Pure Coconut Water Sea Minerals $"),a.default.createElement("ul",null,a.default.createElement("li",null,"Cleanser: ",a.default.createElement("a",{href:"http://amzn.to/2ksVu0L"},"Shampoo")),a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2jjxiLa"},"Conditioner")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2ATSu4p"},"Mousse"))),a.default.createElement("h2",null,"Kinky Curly $$"),a.default.createElement("ul",null,a.default.createElement("li",null,"Cleanser: ",a.default.createElement("a",{href:"http://amzn.to/2AvuqnA"},"Come Clean*")),a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2BNFN8N"},"Knot Today")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2krToyr"},"Curling Custard")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2jm0Ibl"},"Spiral Spritz"))),a.default.createElement("h2",null,"Jessicurl $$"),a.default.createElement("ul",null,a.default.createElement("li",null,a.default.createElement("a",{href:"https://www.jessicurl.com/product/gentle-lather-shampoo"},"Cleanser: Gentle Lather Shampoo- no fragrance"))),a.default.createElement("h2",null,"Sweet Curls Elixirs"),a.default.createElement("p",null,a.default.createElement("a",{href:"https://www.etsy.com/shop/SweetCurlsElixirs?ref=l2-shopheader-name"},"This is an etsy shop where the products are custom made. Most are available oil free!")),a.default.createElement("h2",null,"Budget Option"),a.default.createElement("ul",null,a.default.createElement("li",null,'Cleanser: It\'s hard to find a cheap "low poo" under $10. One option is ',a.default.createElement("a",{href:"http://amzn.to/2iYUVf7"},"Johnson's Baby Gentle Shampoo With Calming Lavender (some consider the sulfate it has, sodium trideceth sulfate, too harsh, but it should be OK for those with low-porosity/greasy skin). ")," Another option is Trader Joe's Tea Tree Tingle."),a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2iWmsxD"},"Suave Essentials Conditioner, Tropical Coconut")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2krQaL4"},"Herbal Essences Totally Twisted Curl Boosting Hair Mousse")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2zTIvbs"},"Aussie Instant Freeze Gel"))),a.default.createElement("h2",null,"DIY Options"),a.default.createElement("ul",null,a.default.createElement("li",null,"Conditioner/cleaner: ",a.default.createElement("a",{href:"https://blog.mountainroseherbs.com/diy-herbal-hair-rinses"},"Hair rinses*"),": my own personal fav is just marshmallow root pieces (1 tbsp) steeped in 1 cup of water overnight. "),a.default.createElement("li",null,"Styler/conditioner: ",a.default.createElement("a",{href:"http://www.minimalistbeauty.com/marshmallow-root-in-natural-hair-care/"},"Marshmallow root gel*"),"- I sometimes add a dash of slippery elm (half teaspoon) while hot for extra frizz control"),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://www.minimalistbeauty.com/diy-natural-hair-gel/"},"Flax seed gel*"))),a.default.createElement("h1",null,"Oil Light Products"),a.default.createElement("p",null,"These are lighter products that still contain oils/butters, but in smaller quantities. They work well for many people, especially under drier conditions or in small amounts. "),a.default.createElement("h2",null,"Moptop $$$"),a.default.createElement("ul",null,a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2BNGdMs"},"Daily Conditioner "))),a.default.createElement("h2",null,"Giovanni $"),a.default.createElement("ul",null,a.default.createElement("li",null,"Cleanser: ",a.default.createElement("a",{href:"hhttp://amzn.to/2itE0gC"},"50:50 Balanced Shampoo")),a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2iWryd9"},"50:50 Balanced Conditioner")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2AvBy3k"},"Hair Styling Mousse")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2BOB2vt"},"LA Natural Gel"))),a.default.createElement("h2",null,"Jessicurl $$"),a.default.createElement("ul",null,a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2jn4OzU"},"Aloeba Daily Conditioner")),a.default.createElement("li",null,"Styler: Rockin' Ringlets Styling Potion"),a.default.createElement("li",null,"Styler: Spiralicious Styling Gel")),a.default.createElement("h2",null,"Not Your Mothers Naturals Tahitian Gardenia Flower and Mango Butter $"),a.default.createElement("ul",null,a.default.createElement("li",null,"Cleanser: ",a.default.createElement("a",{href:"hhttp://amzn.to/2kqN61P"},"Shampoo")),a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2kqN61P"},"Conditioner*")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2kqN61P"},"Combing Cream*")," - use as a cream without combing"),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2ATSu4p"},"Detangler*"),"- use in very small amounts as a gel-like product or refresher")),a.default.createElement("h2",null,"Shea Moisture Fruit Fusion Coconut Water Weightless $"),a.default.createElement("p",null," Warning some items in this line are not CG (the spray has drying alcohol) and in general it is one of the heavier lines on this list."),a.default.createElement("ul",null,a.default.createElement("li",null,"Cleanser: ",a.default.createElement("a",{href:"http://amzn.to/2zWT0dV"},"Shampoo")),a.default.createElement("li",null,"Conditioner: ",a.default.createElement("a",{href:"http://amzn.to/2zY9aDO"},"Creme Rinse ")),a.default.createElement("li",null,"Styler: ",a.default.createElement("a",{href:"http://amzn.to/2kqpP05"},"Mousse"))),a.default.createElement("h2",null,"Innersense $$$"),a.default.createElement("p",null,"A lot of people with fine hair love ",a.default.createElement("a",{href:"https://innersensebeauty.com/"},"these products"),", but I don't know that much about them personally. "),a.default.createElement("h2",null,"Devacurl $$$"),a.default.createElement("p",null,a.default.createElement("a",{href:"http://www.devacurl.com/"},"Devacurl")," has a few great light products like B'Leave In*, Foam*, and the Delight Conditioner and Low-Poo. But some of their products are heavy just in my personal experience like the Cream ."))};t.default=s,e.exports=t.default}});
//# sourceMappingURL=component---src-pages-cg-lite-js-b0e697b15b275f434aaf.js.map