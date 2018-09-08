webpackJsonp([18104154977512],{245:function(e,l,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}l.__esModule=!0;var n=t(1),o=a(n),s=t(9),r=a(s),u=t(12),i=a(u),d=t(15),c=(a(d),function(){return o.default.createElement("div",null,o.default.createElement(i.default,{title:"How Curlsbot Works",meta:[{name:"description",content:"Info about how Curlsbot analyzes products"},{name:"keywords",content:"products, curly girl"},{property:"og:image",content:"http://www.curlsbot.com/img/icon.png"}]}),o.default.createElement("h1",null,"How Curlsbot Works"),o.default.createElement("p",null,"When you paste in an ingredient list, the code behind Curlsbot starts analyzing it. I'll take you step by step to see how it works."),o.default.createElement("p",null,"The rules are based on the latest edition handbook with some updates based on current research. For example Lorraine Massey never mentions Sodium Coco Sulfate, but we know it's essentially identical to the sulfates she does mention, so we label it as not CG. "),o.default.createElement("p",null,"Remember, Curlsbot is NOT perfect, but it learns from you.  ",o.default.createElement("a",{href:"http://m.me/curlsbot"},"Send us a message")," if you see anything wrong or questionable. Thanks to your messages, Curlsbot is 200% smarter and getting smarter every day."),o.default.createElement("h2",null,"1. Sees if it's a valid ingredient list"),o.default.createElement("p",null,"First Curlsbot sees if it's a valid ingredient list - if it's a URL it won't analzye it. If it's a list where each ingredient isn't seperated by a comma, it can't analyze it. I may add more support for non comma seperated lists in the future."),o.default.createElement("h2",null,"2. Looks for silicones"),o.default.createElement("p",null,'Curlsbot sees if any ingredients contain the letters "cone", "demethicon", "silane" or "siloxane." If any ingredient has these, it\'s probably a silicone. Curlsbot will tell you it\'s not CG UNLESS it also has a peg/ppg/pg- prefix. These are PEG silicones and they are CG since they are modified to be water soluble.'),o.default.createElement("h2",null,"3. Looks for waxes"),o.default.createElement("p",null,'Then it looks for ingredients with the words "wax", "cera", "cire", "lanolin," and "paraffin." It marks these non-CG unless they are emulsified or have a peg prefix to make them water soluble.'),o.default.createElement("h2",null,"4. Looks for sulfates AND other detergents."),o.default.createElement("p",null,"It looks for the sulfates mentioned in the curly girl handbook as well as alternative names for these sulfates and other detergents known to be harsh. See our ",o.default.createElement(r.default,{to:"/cleansers",className:"btn btn-secondary"},"cleansers article for more info")),o.default.createElement("h2",null,"5. Looks for drying alcohols"),o.default.createElement("p",null,'Next Curlsbot looks for words that contain "alcohol", "witch," or "propanol." It then sees if they match our list of alcohols and if not marks them "unknown." Please message us if you see an unknown alcohol so we can add to our database:'),o.default.createElement("ul",null,o.default.createElement("li",null,'"denatured alcohol",'),o.default.createElement("li",null,'"sd alcohol 40",'),o.default.createElement("li",null,'"witch hazel",'),o.default.createElement("li",null,'"isopropanol",'),o.default.createElement("li",null,'"ethanol",'),o.default.createElement("li",null,'"sd alcohol",'),o.default.createElement("li",null,'"propanol",'),o.default.createElement("li",null,'"propyl alcohol",'),o.default.createElement("li",null,'"isopropyl alcohol",'),o.default.createElement("li",null,'"alcohol denat.",'),o.default.createElement("li",null,'"sd alcohol 40-b",'),o.default.createElement("li",null,'"alcohol denat",'),o.default.createElement("li",null,'"sd alcohol 40b",'),o.default.createElement("li",null,'"alcohol",'),o.default.createElement("li",null,'"hamamellis virginiana (witch hazel) extract",'),o.default.createElement("li",null,'"ethyl alcohol",'),o.default.createElement("li",null,'"denatured alcohol (sd alcohol 40)",'),o.default.createElement("li",null,'"sd alcohol 40-b (alcohol denat)",'),o.default.createElement("li",null,'"phenylpropanol"')),o.default.createElement("h2",null,"6. Other ingredients"),o.default.createElement("p",null,'It also looks for common misspellings of sulfates, silicones and waxes like "dimethcione".'),o.default.createElement("h2",null,"7. What Curlsbot CAN'T do"),o.default.createElement("h3",null,"Silicon Quaternium"),o.default.createElement("p",null,"We mark these as NOT cg. Some people consider them OK if you use a low poo but Curlsbot is focused on ingredients that are true to the CG principles - which means they can be cowashed out."),o.default.createElement("h3",null,"Polyquats"),o.default.createElement("p",null,"Some people find ",o.default.createElement("a",{href:"http://science-yhairblog.blogspot.com/2013/11/polyquat-or-not.html"},"polyquats build up even though they are CG.")," Curlsbot may provide info about this in the future."),o.default.createElement("h3",null,"Oils"),o.default.createElement("p",null,' Some "curly girl" sites list other ingredients as forbidden like castor and mineral oil. However these are not mentioned in the original handbook and are no more "water insoluble" than other oils like coconut oil.'),o.default.createElement("h3",null,"Misspellings"),o.default.createElement("p",null,"Curlsbot knows a few common misspellings, but sometimes things can slip through. Always ",o.default.createElement("em",null,"double check")," the results! If in doubt ",o.default.createElement("a",{href:"http://m.me/curlsbot"},"send us a message")," "))});l.default=c,e.exports=l.default}});
//# sourceMappingURL=component---src-pages-howitworks-js-b90745d799a9491b2570.js.map