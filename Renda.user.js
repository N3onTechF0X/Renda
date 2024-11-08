// ==UserScript==
// @name         Renda
// @description  Powerful clicker for Tanki Online
// @author       N3onTechF0X
// @match        https://*.tankionline.com/*
// @icon         https://raw.githubusercontent.com/N3onTechF0X/Renda/main/images/logo.png
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

GM_xmlhttpRequest({method:"GET",url:"https://raw.githubusercontent.com/N3onTechF0X/Renda/main/Renda.min.js",nocache:!0,onload:resp=>{eval(resp.responseText)}});
