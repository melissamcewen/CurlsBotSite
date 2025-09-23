'use client';

import Script from 'next/script';

export function EmailDetectionScript() {
  const emailDetectionScript = `
    !function(){"use strict";function e(e){const t=e.match(/((?=([a-z0-9._!#$%+^&*()[\\]<>-]+))\\2@[a-z0-9._-]+\\.[a-z0-9._-]+)/gi);return t?t[0]:""}function t(t){return e(a(t.toLowerCase()))}function a(e){return e.replace(/\\s/g,"")}async function n(e){const t={sha256Hash:"",sha1Hash:""};if(!("msCrypto"in window)&&"https:"===location.protocol&&"crypto"in window&&"TextEncoder"in window){const a=(new TextEncoder).encode(e),[n,c]=await Promise.all([s("SHA-256",a),s("SHA-1",a)]);t.sha256Hash=n,t.sha1Hash=c}return t}async function s(e,t){const a=await crypto.subtle.digest(e,t);return Array.from(new Uint8Array(a)).map(e=>("00"+e.toString(16)).slice(-2)).join("")}function c(e){let t=!0;return Object.keys(e).forEach(a=>{0===e[a].length&&(t=!1)}),t}function i(e,t,a){e.splice(t,1);const n="?"+e.join("&")+a.hash;history.replaceState(null,"",n)}var o={checkEmail:e,validateEmail:t,trimInput:a,hashEmail:n,hasHashes:c,removeEmailAndReplaceHistory:i,detectEmails:async function(){const e=new URL(window.location.href),a=Array.from(e.searchParams.entries()).map(e=>\`\${e[0]}=\${e[1]}\`);let s,o;const r=["adt_eih","sh_kit"];if(a.forEach((e,t)=>{const a=decodeURIComponent(e),[n,c]=a.split("=");if("adt_ei"===n&&(s={value:c,index:t,emsrc:"url"}),r.includes(n)){o={value:c,index:t,emsrc:"sh_kit"===n?"urlhck":"urlh"}}}),s)t(s.value)&&n(s.value).then(e=>{if(c(e)){const t={value:e,created:Date.now()};localStorage.setItem("adt_ei",JSON.stringify(t)),localStorage.setItem("adt_emsrc",s.emsrc)}});else if(o){const e={value:{sha256Hash:o.value,sha1Hash:""},created:Date.now()};localStorage.setItem("adt_ei",JSON.stringify(e)),localStorage.setItem("adt_emsrc",o.emsrc)}s&&i(a,s.index,e),o&&i(a,o.index,e)},cb:"adthrive"};const{detectEmails:r,cb:l}=o;r()}();
  `;

  return (
    <Script
      id="email-detection-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: emailDetectionScript,
      }}
    />
  );
}
