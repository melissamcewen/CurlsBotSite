webpackJsonp([37467347102080],{"./node_modules/immutability-helper/index.js":function(e,t,o){function n(e){if(e instanceof Array)return h(e.constructor(e.length),e);if(e&&"object"==typeof e){var t=e.constructor&&e.constructor.prototype;return h(Object.create(t||null),e)}return e}function r(){function e(o,r){Array.isArray(o)&&Array.isArray(r)||d(!Array.isArray(r),"update(): You provided an invalid spec to update(). The spec may not contain an array except as the value of $set, $push, $unshift, $splice or any custom command allowing an array value."),d("object"==typeof r&&null!==r,"update(): You provided an invalid spec to update(). The spec and every included key path must be plain objects containing one of the following commands: %s.",Object.keys(t).join(", "));var s=o;return m(r).forEach(function(a){if(y.call(t,a)){var i=o===s;s=t[a](r[a],s,r,o),i&&e.isEquals(s,o)&&(s=o)}else{var u=e(o[a],r[a]);e.isEquals(u,s[a])&&("undefined"!=typeof u||y.call(o,a))||(s===o&&(s=n(o)),s[a]=u)}}),s}var t=h({},w);return e.extend=function(e,o){t[e]=o},e.isEquals=function(e,t){return e===t},e}function s(e,t,o){d(Array.isArray(e),"update(): expected target of %s to be an array; got %s.",o,e);var n=t[o];d(Array.isArray(n),"update(): expected spec of %s to be an array; got %s. Did you forget to wrap your parameter in an array?",o,n)}function a(e){d(Array.isArray(e),"update(): expected spec of $toggle to be an array; got %s. Did you forget to wrap the key(s) in an array?",e)}function i(e,t){d(Array.isArray(e),"Expected $splice target to be an array; got %s",e),u(t.$splice)}function u(e){d(Array.isArray(e),"update(): expected spec of $splice to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?",e)}function l(e){d("function"==typeof e,"update(): expected spec of $apply to be a function; got %s.",e)}function c(e){d(1===Object.keys(e).length,"Cannot have more than one key in an object with $set")}function p(e,t){d(t&&"object"==typeof t,"update(): $merge expects a spec of type 'object'; got %s",t),d(e&&"object"==typeof e,"update(): $merge expects a target of type 'object'; got %s",e)}var d=o("./node_modules/invariant/browser.js"),y=Object.prototype.hasOwnProperty,f=Array.prototype.splice,h=Object.assign||function(e,t){return m(t).forEach(function(o){y.call(t,o)&&(e[o]=t[o])}),e},m="function"==typeof Object.getOwnPropertySymbols?function(e){return Object.keys(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.keys(e)},w={$push:function(e,t,o){return s(t,o,"$push"),e.length?t.concat(e):t},$unshift:function(e,t,o){return s(t,o,"$unshift"),e.length?e.concat(t):t},$splice:function(e,t,o,r){return i(t,o),e.forEach(function(e){u(e),t===r&&e.length&&(t=n(r)),f.apply(t,e)}),t},$set:function(e,t,o){return c(o),e},$toggle:function(e,t){a(e,t);var o=e.length?n(t):t;return e.forEach(function(e){o[e]=!t[e]}),o},$unset:function(e,t,o,r){return d(Array.isArray(e),"update(): expected spec of $unset to be an array; got %s. Did you forget to wrap the key(s) in an array?",e),e.forEach(function(e){Object.hasOwnProperty.call(t,e)&&(t===r&&(t=n(r)),delete t[e])}),t},$merge:function(e,t,o,r){return p(t,e),m(e).forEach(function(o){e[o]!==t[o]&&(t===r&&(t=n(r)),t[o]=e[o])}),t},$apply:function(e,t){return l(e),e(t)}};e.exports=r(),e.exports.newContext=r},"./src/components/answeroption.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return a.default.createElement("li",{className:"answerOption"},a.default.createElement("input",{type:"radio",className:"radioCustomButton",name:"radioGroup",checked:e.answerType===e.answer,id:e.answerType,value:e.points,disabled:e.answer,onChange:e.onAnswerSelected}),a.default.createElement("label",{className:"radioCustomLabel",htmlFor:e.answerType},e.answerContent))}t.__esModule=!0;var s=o("./node_modules/react/react.js"),a=n(s);r.propTypes={answerType:a.default.PropTypes.string.isRequired,answerContent:a.default.PropTypes.string.isRequired,answer:a.default.PropTypes.number.isRequired,points:a.default.PropTypes.number,onAnswerSelected:a.default.PropTypes.func.isRequired},t.default=r,e.exports=t.default},"./src/components/question.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return a.default.createElement("h2",{className:"question"},e.content)}t.__esModule=!0;var s=o("./node_modules/react/react.js"),a=n(s);r.propTypes={content:a.default.PropTypes.string.isRequired},t.default=r,e.exports=t.default},"./src/components/questioncount.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return a.default.createElement("div",{className:"questionCount"},"Question ",a.default.createElement("span",null,e.counter)," of ",a.default.createElement("span",null,e.total))}t.__esModule=!0;var s=o("./node_modules/react/react.js"),a=n(s);r.propTypes={counter:a.default.PropTypes.number.isRequired,total:a.default.PropTypes.number.isRequired},t.default=r,e.exports=t.default},"./src/components/quiz.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){function t(t){return a.default.createElement(d.default,{key:t.content,answerContent:t.content,answerType:t.type,points:t.points,answer:e.answer,questionId:e.questionId,onAnswerSelected:e.onAnswerSelected})}return a.default.createElement("div",{key:e.questionId},a.default.createElement(c.default,{counter:e.questionId,total:e.questionTotal}),a.default.createElement(u.default,{content:e.question}),a.default.createElement("ul",{className:"answerOptions"},e.answerOptions.map(t)))}t.__esModule=!0;var s=o("./node_modules/react/react.js"),a=n(s),i=o("./src/components/question.js"),u=n(i),l=o("./src/components/questioncount.js"),c=n(l),p=o("./src/components/answeroption.js"),d=n(p);r.propTypes={answer:a.default.PropTypes.number.isRequired,answerOptions:a.default.PropTypes.array.isRequired,counter:a.default.PropTypes.number.isRequired,points:a.default.PropTypes.number,question:a.default.PropTypes.string.isRequired,questionId:a.default.PropTypes.number.isRequired,questionTotal:a.default.PropTypes.number.isRequired,onAnswerSelected:a.default.PropTypes.func.isRequired},t.default=r,e.exports=t.default},"./src/components/result.js":function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){e.quizStats;return a.default.createElement("div",{className:"result"},a.default.createElement("h2",null," Result"),a.default.createElement("h3",null," Your hair is: ",a.default.createElement("strong",null,e.quizResult)),a.default.createElement("h2",null,"Product recs"),a.default.createElement("p",null,"Right now we only have recs for low porosity, but check back later for recommendations for other porosities!"),a.default.createElement("ul",null,a.default.createElement("li",null,a.default.createElement(u.default,{to:"/cg-lite/"},"Low porosity product recommendations"),": If you're low porosity, you're probably prone to build up. Products that are too heavy (in oils or butters) or used in excessive amounts can weigh your hair down. Use heavy products sparingly or use lighter products to keep your hair from getting limp. Cleansing with a low-poo (sulfate free shampoo) can also prevent your hair from getting weighed down."),a.default.createElement("li",null,"High porosity recommendations (coming soon!): If you are high porosity, your hair benefits from a lot of nourishment and moisture. Use rich creamy products to help give your hair shine and lock in moisture. Your hair is vulnerable to damage (or is damaged) so handle with care. Swap your shampoo for a gentle co-wash (a cleansing conditioner). "),a.default.createElement("li",null,"Normal porosity recommendations (coming soon!): If you have normal porosity your hair is healthy and easy to work with. Products that are balanced with moisture can help your hair remain healthy. You may want to alternate co-wash and low-poo for balance.")))}t.__esModule=!0;var s=o("./node_modules/react/react.js"),a=n(s),i=o("./node_modules/gatsby-link/index.js"),u=n(i);r.propTypes={quizResult:a.default.PropTypes.string.isRequired},t.default=r,e.exports=t.default},"./src/data/quizquestions.js":function(e,t){"use strict";t.__esModule=!0;var o=[{question:"Take a strand of hair that's still attached to your head and slide your fingers from the bottom up the shaft towards the scalp",answers:[{type:"High",content:"I feel little bumps",points:2},{type:"Normal",content:"It feels smooth",points:0},{type:"Normal",content:"Hmm...I can't quite say",points:0}]},{question:"Which sounds more like your experience with products:",answers:[{type:"Low",content:"Products sit on my hair and end up looking like grease or buildup",points:-4},{type:"High",content:"My hair absorbs products like a sponge, so I have to use a lot of product",points:4},{type:"Normal",content:"I don't really have either of these issues",points:0}]},{question:"I do not absorb hair color or treatments easily",answers:[{type:"Low",content:"Yes",points:-2},{type:"Normal",content:"No, they absorb just fine",points:0},{type:"Normal",content:"I don't color so this doesn't apply to me",points:0}]},{question:"My hair takes a long time to dry compared to other people with similar hair density",answers:[{type:"Low",content:"Yes, ugh it takes forever to dry",points:-2},{type:"Normal",content:"No, it seems to take a pretty normal amount of time to dry",points:0}]},{question:"Which describes your hair better?",answers:[{type:"High",content:"My hair looks dull and dry",points:2},{type:"Low",content:"My hair appears healthy and shiny, but has little volume",points:-2},{type:"Normal",content:"My hair has a good amount of volume and looks pretty healthy",points:0}]},{question:"My hair was previously bleached, colored, or permed or otherwise heavily processed/heat damaged within the past year",answers:[{type:"High",content:"Yes",points:2},{type:"Normal",content:"Nope",points:0}]},{question:"Have you tried oils in your hair?",answers:[{type:"Low",content:"Yes, and they made my hair look limp and greasy",points:-2},{type:"High",content:"Oils make my hair look healthy and shiny",points:2},{type:"Normal",content:"Some oils work well in my hair but I have to be careful and use only some types and/or in small amounts",points:0},{type:"Normal",content:"Hmm I've never tried oil on my hair before",points:0}]},{question:"Which do you need more of?",answers:[{type:"Low",content:"Clarifying treatments",points:-2},{type:"High",content:"Deep conditioning",points:2},{type:"Normal",content:"I use both equally or I don't use either",points:0}]},{question:"How often do you need to wish your hair?",answers:[{type:"Low",content:"I seem to need to wash my hair often or it looks greasy",points:-2},{type:"Normal",content:"I can go a few days (3-4) without washing and my hair looks great",points:0},{type:"High",content:"I can go over 4 days without washing and my hair looks great",points:2}]},{question:"How does your hair respond to sulfate-containing shampoo?",answers:[{type:"Low",content:"It looks fine or great!",points:-2},{type:"Normal",content:"It seems a little dry",points:0},{type:"High",content:"Sulfate-containg shampoos make my hair look very dry and unhealthy",points:2}]},{question:"Low-poo or co-wash",answers:[{type:"Low",content:"Low-poo",points:-1},{type:"Normal",content:"I don't know about this or I haven't tried both",points:0},{type:"Normal",content:"I alternate the two",points:0},{type:"High",content:"Co-wash",points:1}]}];t.default=o,e.exports=t.default},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/mgmcewen/Sites/curlsbot/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/mgmcewen/Sites/curlsbot/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/mgmcewen/Sites/curlsbot/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":[["/Users/mgmcewen/Sites/curlsbot/node_modules/babel-preset-env/lib/index.js",{"loose":true,"uglify":true,"modules":"commonjs","targets":{"browsers":["> 1%","last 2 versions","IE >= 9"]},"exclude":["transform-regenerator","transform-es2015-typeof-symbol"]}],"/Users/mgmcewen/Sites/curlsbot/node_modules/babel-preset-stage-0/lib/index.js","/Users/mgmcewen/Sites/curlsbot/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/pages/porosity.js':function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var i=o("./node_modules/react/react.js"),u=n(i),l=o("./node_modules/immutability-helper/index.js"),c=(n(l),o("./src/components/quiz.js")),p=n(c),d=o("./src/components/result.js"),y=n(d),f=o("./src/data/quizquestions.js"),h=n(f),m=o("./src/components/question.js"),w=(n(m),function(e){function t(o){r(this,t);var n=s(this,e.call(this,o));return n.state={points:0,counter:0,questionId:1,question:"",answerOptions:[],answer:0,result:""},n.handleAnswerSelected=n.handleAnswerSelected.bind(n),n}return a(t,e),t.prototype.componentWillMount=function(){var e=this,t=h.default.map(function(t){return e.shuffleArray(t.answers)});this.setState({question:h.default[0].question,answerOptions:t[0]})},t.prototype.shuffleArray=function(e){for(var t,o,n=e.length;0!==n;)o=Math.floor(Math.random()*n),n-=1,t=e[n],e[n]=e[o],e[o]=t;return e},t.prototype.handleAnswerSelected=function(e){var t=this;this.setUserAnswer(e.currentTarget.value),this.state.questionId<h.default.length?setTimeout(function(){return t.setNextQuestion()},300):setTimeout(function(){return t.setResults(t.getResults())},300)},t.prototype.setUserAnswer=function(e){var t=this.state.points+Number(e);this.setState({answer:e,points:t})},t.prototype.setNextQuestion=function(){var e=this.state.counter+1,t=this.state.questionId+1;this.setState({counter:e,questionId:t,question:h.default[e].question,answerOptions:h.default[e].answers,answer:""})},t.prototype.getResults=function(){var e=this.state.points;return e},t.prototype.setResults=function(e){console.log("set results is running"),console.log(e),e>2?this.setState({result:"probably high porosity. "}):e<-2?this.setState({result:"probably low porosity."}):this.setState({result:"probably normal porosity"})},t.prototype.renderQuiz=function(){return u.default.createElement(p.default,{counter:this.state.counter,answer:this.state.answer,answerOptions:this.state.answerOptions,questionId:this.state.questionId,question:this.state.question,questionTotal:h.default.length,onAnswerSelected:this.handleAnswerSelected})},t.prototype.renderResult=function(){return u.default.createElement(y.default,{quizResult:this.state.result})},t.prototype.render=function(){return u.default.createElement("div",{className:"App"},u.default.createElement("div",{className:"App-header"},u.default.createElement("h2",null,"Hair Porosity Quiz"),u.default.createElement("p",null,"Confused about hair porosity? Well it's just how able your hair is to absorb moisture, which is affected by the cuticle structure. A raised cuticle means your hair easily absorbs moisture and is ",u.default.createElement("em",null,"high porosity"),". A tight cuticle means your hair is relucant to absorb moisture and is ",u.default.createElement("em",null,"low porosity"),". If you're somewhere in the middle you are ",u.default.createElement("em",null,"normal porosity"),"."),u.default.createElement("p",null,'Most "tests" of porosity just deal with how your hair floats in water, but they can be ',u.default.createElement("a",{href:""},"inaccurate"),". This quiz focuses on how your hair behaves so it can get a more complete picture of your porosity.")),this.state.result?this.renderResult():this.renderQuiz())},t}(u.default.Component));t.default=w,e.exports=t.default}});
//# sourceMappingURL=component---src-pages-porosity-js-d14f44675edc3f99649b.js.map