(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iz8Ny":[function(require,module,exports) {
var d = globalThis.process?.argv || [];
var y = ()=>globalThis.process?.env || {};
var H = new Set(d), _ = (e)=>H.has(e), G = d.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var Z = _("--dry-run"), p = ()=>_("--verbose") || y().VERBOSE === "true", q = p();
var u = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var x = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>u("\uD83D\uDD35 INFO", ...e), m = (...e)=>u("\uD83D\uDFE0 WARN", ...e), S = 0, c = (...e)=>p() && u(`\u{1F7E1} ${S++}`, ...e);
var n = {
    "isContentScript": true,
    "isBackground": false,
    "isReact": false,
    "runtimes": [
        "script-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/Users/danishsheikh/Desktop/extension imps/leet-boost/src/content.js",
    "bundleId": "740e7e8d066c68b6",
    "envHash": "e792fbbdaa78ee84",
    "verbose": "false",
    "secure": false,
    "serverPort": 51593
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function I(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = I;
module.bundle.hotData = {};
var l = globalThis.browser || globalThis.chrome || null;
function b() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function C() {
    return n.port || location.port;
}
var E = "__plasmo_runtime_script_";
function L(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function O(e = C()) {
    let t = b();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function B(e) {
    typeof e.message == "string" && x("[plasmo/parcel-runtime]: " + e.message);
}
function P(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(O());
    return t.addEventListener("message", async function(o) {
        let r = JSON.parse(o.data);
        if (r.type === "update" && await e(r.assets), r.type === "error") for (let a of r.diagnostics.ansi){
            let w = a.codeframe || a.stack;
            m("[plasmo/parcel-runtime]: " + a.message + `
` + w + `

` + a.hints.join(`
`));
        }
    }), t.addEventListener("error", B), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        m(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var s = "__plasmo-loading__";
function $() {
    let e = globalThis.window?.trustedTypes;
    if (typeof e > "u") return;
    let t = document.querySelector('meta[name="trusted-types"]')?.content?.split(" "), o = t ? t[t?.length - 1] : void 0;
    return typeof e < "u" ? e.createPolicy(o || `trusted-html-${s}`, {
        createHTML: (a)=>a
    }) : void 0;
}
var T = $();
function g() {
    return document.getElementById(s);
}
function f() {
    return !g();
}
function F() {
    let e = document.createElement("div");
    e.id = s;
    let t = `
  <style>
    #${s} {
      background: #f3f3f3;
      color: #333;
      border: 1px solid #333;
      box-shadow: #333 4.7px 4.7px;
    }

    #${s}:hover {
      background: #e3e3e3;
      color: #444;
    }

    @keyframes plasmo-loading-animate-svg-fill {
      0% {
        fill: transparent;
      }
    
      100% {
        fill: #333;
      }
    }

    #${s} .svg-elem-1 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s both infinite;
    }

    #${s} .svg-elem-2 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s both infinite;
    }
    
    #${s} .svg-elem-3 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both infinite;
    }

    #${s} .hidden {
      display: none;
    }

  </style>
  
  <svg height="32" width="32" viewBox="0 0 264 354" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M139.221 282.243C154.252 282.243 166.903 294.849 161.338 308.812C159.489 313.454 157.15 317.913 154.347 322.109C146.464 333.909 135.26 343.107 122.151 348.538C109.043 353.969 94.6182 355.39 80.7022 352.621C66.7861 349.852 54.0034 343.018 43.9705 332.983C33.9375 322.947 27.105 310.162 24.3369 296.242C21.5689 282.323 22.9895 267.895 28.4193 254.783C33.8491 241.671 43.0441 230.464 54.8416 222.579C59.0353 219.777 63.4908 217.438 68.1295 215.588C82.0915 210.021 94.6978 222.671 94.6978 237.703L94.6978 255.027C94.6978 270.058 106.883 282.243 121.914 282.243H139.221Z" fill="#333" class="svg-elem-1" ></path>
    <path d="M192.261 142.028C192.261 126.996 204.867 114.346 218.829 119.913C223.468 121.763 227.923 124.102 232.117 126.904C243.915 134.789 253.11 145.996 258.539 159.108C263.969 172.22 265.39 186.648 262.622 200.567C259.854 214.487 253.021 227.272 242.988 237.308C232.955 247.343 220.173 254.177 206.256 256.946C192.34 259.715 177.916 258.294 164.807 252.863C151.699 247.432 140.495 238.234 132.612 226.434C129.808 222.238 127.47 217.779 125.62 213.137C120.056 199.174 132.707 186.568 147.738 186.568L165.044 186.568C180.076 186.568 192.261 174.383 192.261 159.352L192.261 142.028Z" fill="#333" class="svg-elem-2" ></path>
    <path d="M95.6522 164.135C95.6522 179.167 83.2279 191.725 68.8013 187.505C59.5145 184.788 50.6432 180.663 42.5106 175.227C26.7806 164.714 14.5206 149.772 7.28089 132.289C0.041183 114.807 -1.85305 95.5697 1.83772 77.0104C5.52849 58.4511 14.6385 41.4033 28.0157 28.0228C41.393 14.6423 58.4366 5.53006 76.9914 1.83839C95.5461 -1.85329 114.779 0.0414162 132.257 7.2829C149.735 14.5244 164.674 26.7874 175.184 42.5212C180.62 50.6576 184.744 59.5332 187.46 68.8245C191.678 83.2519 179.119 95.6759 164.088 95.6759L122.869 95.6759C107.837 95.6759 95.6522 107.861 95.6522 122.892L95.6522 164.135Z" fill="#333" class="svg-elem-3"></path>
  </svg>
  <span class="hidden">Context Invalidated, Press to Reload</span>
  `;
    return e.innerHTML = T ? T.createHTML(t) : t, e.style.pointerEvents = "none", e.style.position = "fixed", e.style.bottom = "14.7px", e.style.right = "14.7px", e.style.fontFamily = "sans-serif", e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center", e.style.padding = "14.7px", e.style.gap = "14.7px", e.style.borderRadius = "4.7px", e.style.zIndex = "2147483647", e.style.opacity = "0", e.style.transition = "all 0.47s ease-in-out", e;
}
function N(e) {
    return new Promise((t)=>{
        document.documentElement ? (f() && (document.documentElement.appendChild(e), t()), t()) : globalThis.addEventListener("DOMContentLoaded", ()=>{
            f() && document.documentElement.appendChild(e), t();
        });
    });
}
var k = ()=>{
    let e;
    if (f()) {
        let t = F();
        e = N(t);
    }
    return {
        show: async ({ reloadButton: t = !1 } = {})=>{
            await e;
            let o = g();
            o.style.opacity = "1", t && (o.onclick = (r)=>{
                r.stopPropagation(), globalThis.location.reload();
            }, o.querySelector("span").classList.remove("hidden"), o.style.cursor = "pointer", o.style.pointerEvents = "all");
        },
        hide: async ()=>{
            await e;
            let t = g();
            t.style.opacity = "0";
        }
    };
};
var W = `${E}${module.id}__`, i, A = !1, M = k();
async function h() {
    c("Script Runtime - reloading"), A ? globalThis.location?.reload?.() : M.show({
        reloadButton: !0
    });
}
function R() {
    i?.disconnect(), i = l?.runtime.connect({
        name: W
    }), i.onDisconnect.addListener(()=>{
        h();
    }), i.onMessage.addListener((e)=>{
        e.__plasmo_cs_reload__ && h(), e.__plasmo_cs_active_tab__ && (A = !0);
    });
}
function j() {
    if (l?.runtime) try {
        R(), setInterval(R, 24e3);
    } catch  {
        return;
    }
}
j();
P(async (e)=>{
    c("Script runtime - on updated assets"), e.filter((o)=>o.envHash === n.envHash).some((o)=>L(module.bundle, o.id)) && (M.show(), l?.runtime ? i.postMessage({
        __plasmo_cs_changed__: !0
    }) : setTimeout(()=>{
        h();
    }, 4700));
});

},{}],"d9GIc":[function(require,module,exports) {
// Listen for a click event to open the side panel
const openSidePanelHandler = ()=>{
    chrome.sidePanel.open({
        windowId: windowId
    });
};
// You can add the event listener to a specific element like a button
document.querySelector("#open-side-panel-btn")?.addEventListener("click", openSidePanelHandler);
(function() {
    const observeButtonAndAttachListener = ()=>{
        const observer = new MutationObserver(()=>{
            const submitButton = document.querySelector('button[data-e2e-locator="console-submit-button"]');
            if (submitButton) {
                console.log("Submit button detected");
                attachClickListener(submitButton);
                observer.disconnect() // Stop observing once the button is found
                ;
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
    const attachClickListener = (submitButton)=>{
        submitButton.addEventListener("click", ()=>{
            console.log("Submit button clicked");
            waitForAcceptedText() // Trigger check after button is clicked
            ;
        });
    };
    const waitForAcceptedText = ()=>{
        const checkAcceptedText = ()=>{
            const acceptedText = document.querySelector('span[data-e2e-locator="submission-result"]');
            if (acceptedText && acceptedText.textContent.trim() === "Accepted") {
                console.log("Accepted text detected");
                fetchSubmissionDetails();
                observer.disconnect() // Stop observing for changes
                ;
            }
        };
        const observer = new MutationObserver(()=>checkAcceptedText());
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
    const fetchSubmissionDetails = ()=>{
        const urlString = window.location.href;
        const match = urlString.match(/\/submissions\/(\d+)/);
        if (match && match[1]) {
            const submissionId = parseInt(match[1], 10);
            console.log("Extracted submissionId:", submissionId);
            const query = `
          query submissionDetails($submissionId: Int!) {
            submissionDetails(submissionId: $submissionId) {
              code
              lang {
                name
                verboseName
              }
            }
          }
        `;
            const variables = {
                submissionId
            };
            const url = "https://leetcode.com/graphql/";
            const headers = {
                "Content-Type": "application/json",
                Accept: "*/*",
                "User-Agent": navigator.userAgent
            };
            const body = JSON.stringify({
                query,
                variables,
                operationName: "submissionDetails"
            });
            fetch(url, {
                method: "POST",
                headers,
                body
            }).then((response)=>response.json()).then((data)=>{
                if (data.data?.submissionDetails) {
                    const { code, lang } = data.data.submissionDetails;
                    console.log("Extracted Code:", code);
                    console.log("Programming Language:", lang.verboseName);
                    postToBigOCalcEndpoint(code, lang.verboseName, submissionId, code);
                } else console.error("Details not found in response");
            }).catch((error)=>console.error("Error:", error));
        } else console.error("No valid submissionId found in the URL");
    };
    const postToBigOCalcEndpoint = (code, language, submissionId, submissionCode)=>{
        const endpointUrl = "https://daleseo-bigocalc.web.val.run";
        const requestBody = JSON.stringify({
            code,
            lang: language
        });
        const headers = {
            "Content-Type": "application/json"
        };
        fetch(endpointUrl, {
            method: "POST",
            headers,
            body: requestBody
        }).then((response)=>response.json()).then((data)=>{
            console.log("Response from BigO Calc Endpoint:", data);
            chrome.runtime.sendMessage({
                action: "updatePopup",
                submissionId: submissionId,
                submissionCode: submissionCode,
                language: language,
                result: data
            });
        }).catch((error)=>console.error("Error posting to BigO Calc endpoint:", error));
    };
    // Start observing for the submit button
    observeButtonAndAttachListener();
})();
// code for observing the question name changed, as soon as the div with specifed text appears, it will alert the question namethe alert will prompt
function extractProblemName() {
    // Get the current URL
    const currentUrl = window.location.href;
    // Use a regular expression to extract the part after "/problems/"
    const regex = /\/problems\/([^/]+)/;
    const match = currentUrl.match(regex);
    // If a match is found, extract the problem name
    if (match && match[1]) {
        let problemName = match[1].replace(/-/g, " ") // Replace hyphens with spaces
        ;
        // Trim any leading or trailing whitespace
        problemName = problemName.trim();
        // alert(problemName)
        // If a valid problem name exists, make the API call
        if (problemName) {
            const apiUrl = `https://leet-code-extension-companydata.vercel.app/companyInfoStats?title=${problemName}`;
            // Make the API call using fetch
            fetch(apiUrl).then((response)=>response.json()).then((data)=>{
                // Log the response data to the console
                console.log("API Response:", data.company);
                chrome.runtime.sendMessage({
                    action: "sendCompanyNames",
                    result: data.company
                });
            }).catch((error)=>{
                console.error("Error fetching data:", error);
            });
        } else console.log("Problem name is empty after cleaning.");
    } else console.log("No problem in URL");
}
// Listen for changes in the URL (when the page is navigated to a new problem)
window.addEventListener("popstate", extractProblemName);
// Extract the problem name when the script is first loaded
setInterval(()=>{
    extractProblemName();
}, 20000);

},{}]},["iz8Ny","d9GIc"], "d9GIc", "parcelRequire872a")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQjtnQkFDaEIsVUFBVTtnQkFDVixRQUFRO1lBQ1Y7UUFDRixHQUNDLE1BQU0sQ0FBQyxRQUNOLFFBQVEsTUFBTSx3Q0FBd0M7SUFFNUQ7SUFFQSx3Q0FBd0M7SUFDeEM7QUFDRixDQUFBO0FBTUEsb0pBQW9KO0FBRXBKLFNBQVM7SUFDUCxzQkFBc0I7SUFDdEIsTUFBTSxhQUFhLE9BQU8sU0FBUztJQUVuQyxrRUFBa0U7SUFDbEUsTUFBTSxRQUFRO0lBQ2QsTUFBTSxRQUFRLFdBQVcsTUFBTTtJQUUvQixnREFBZ0Q7SUFDaEQsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUU7UUFDckIsSUFBSSxjQUFjLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxNQUFNLEtBQUssOEJBQThCOztRQUU1RSwwQ0FBMEM7UUFDMUMsY0FBYyxZQUFZO1FBQzFCLHFCQUFxQjtRQUNyQixvREFBb0Q7UUFDcEQsSUFBSSxhQUFhO1lBQ2YsTUFBTSxTQUFTLENBQUMsMEVBQTBFLEVBQUUsWUFBWSxDQUFDO1lBRXpHLGdDQUFnQztZQUNoQyxNQUFNLFFBQ0gsS0FBSyxDQUFDLFdBQWEsU0FBUyxRQUM1QixLQUFLLENBQUM7Z0JBQ0wsdUNBQXVDO2dCQUN2QyxRQUFRLElBQUksaUJBQWlCLEtBQUs7Z0JBRWxDLE9BQU8sUUFBUSxZQUFZO29CQUN6QixRQUFRO29CQUNSLFFBQVEsS0FBSztnQkFDZjtZQUNGLEdBQ0MsTUFBTSxDQUFDO2dCQUNOLFFBQVEsTUFBTSx3QkFBd0I7WUFDeEM7UUFDSixPQUNFLFFBQVEsSUFBSTtJQUVoQixPQUNFLFFBQVEsSUFBSTtBQUVoQjtBQUVBLDhFQUE4RTtBQUM5RSxPQUFPLGlCQUFpQixZQUFZO0FBRXBDLDJEQUEyRDtBQUUzRCxZQUFZO0lBQ1Y7QUFDRixHQUFHIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1ydW50aW1lQDAuMjUuMS9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS1lNDc3MDI2ODdjODc5ZDM2LmpzIiwic3JjL2NvbnRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGQ9Z2xvYmFsVGhpcy5wcm9jZXNzPy5hcmd2fHxbXTt2YXIgeT0oKT0+Z2xvYmFsVGhpcy5wcm9jZXNzPy5lbnZ8fHt9O3ZhciBIPW5ldyBTZXQoZCksXz1lPT5ILmhhcyhlKSxHPWQuZmlsdGVyKGU9PmUuc3RhcnRzV2l0aChcIi0tXCIpJiZlLmluY2x1ZGVzKFwiPVwiKSkubWFwKGU9PmUuc3BsaXQoXCI9XCIpKS5yZWR1Y2UoKGUsW3Qsb10pPT4oZVt0XT1vLGUpLHt9KTt2YXIgWj1fKFwiLS1kcnktcnVuXCIpLHA9KCk9Pl8oXCItLXZlcmJvc2VcIil8fHkoKS5WRVJCT1NFPT09XCJ0cnVlXCIscT1wKCk7dmFyIHU9KGU9XCJcIiwuLi50KT0+Y29uc29sZS5sb2coZS5wYWRFbmQoOSksXCJ8XCIsLi4udCk7dmFyIHg9KC4uLmUpPT5jb25zb2xlLmVycm9yKFwiXFx1ezFGNTM0fSBFUlJPUlwiLnBhZEVuZCg5KSxcInxcIiwuLi5lKSx2PSguLi5lKT0+dShcIlxcdXsxRjUzNX0gSU5GT1wiLC4uLmUpLG09KC4uLmUpPT51KFwiXFx1ezFGN0UwfSBXQVJOXCIsLi4uZSksUz0wLGM9KC4uLmUpPT5wKCkmJnUoYFxcdXsxRjdFMX0gJHtTKyt9YCwuLi5lKTt2YXIgbj17XCJpc0NvbnRlbnRTY3JpcHRcIjp0cnVlLFwiaXNCYWNrZ3JvdW5kXCI6ZmFsc2UsXCJpc1JlYWN0XCI6ZmFsc2UsXCJydW50aW1lc1wiOltcInNjcmlwdC1ydW50aW1lXCJdLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJwb3J0XCI6MTgxNSxcImVudHJ5RmlsZVBhdGhcIjpcIi9Vc2Vycy9kYW5pc2hzaGVpa2gvRGVza3RvcC9leHRlbnNpb24gaW1wcy9sZWV0LWJvb3N0L3NyYy9jb250ZW50LmpzXCIsXCJidW5kbGVJZFwiOlwiNzQwZTdlOGQwNjZjNjhiNlwiLFwiZW52SGFzaFwiOlwiZTc5MmZiYmRhYTc4ZWU4NFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjUxNTkzfTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9bi5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOm4udmVyYm9zZX19O3ZhciBEPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIEkoZSl7RC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1JO21vZHVsZS5idW5kbGUuaG90RGF0YT17fTt2YXIgbD1nbG9iYWxUaGlzLmJyb3dzZXJ8fGdsb2JhbFRoaXMuY2hyb21lfHxudWxsO2Z1bmN0aW9uIGIoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiBDKCl7cmV0dXJuIG4ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgRT1cIl9fcGxhc21vX3J1bnRpbWVfc2NyaXB0X1wiO2Z1bmN0aW9uIEwoZSx0KXtsZXR7bW9kdWxlczpvfT1lO3JldHVybiBvPyEhb1t0XTohMX1mdW5jdGlvbiBPKGU9QygpKXtsZXQgdD1iKCk7cmV0dXJuYCR7bi5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QodCk/XCJ3c3NcIjpcIndzXCJ9Oi8vJHt0fToke2V9L2B9ZnVuY3Rpb24gQihlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZ4KFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gUChlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoTygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCByPUpTT04ucGFyc2Uoby5kYXRhKTtpZihyLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHIuYXNzZXRzKSxyLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCBhIG9mIHIuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IHc9YS5jb2RlZnJhbWV8fGEuc3RhY2s7bShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIithLm1lc3NhZ2UrYFxuYCt3K2BcblxuYCthLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsQiksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57dihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PnttKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgcz1cIl9fcGxhc21vLWxvYWRpbmdfX1wiO2Z1bmN0aW9uICQoKXtsZXQgZT1nbG9iYWxUaGlzLndpbmRvdz8udHJ1c3RlZFR5cGVzO2lmKHR5cGVvZiBlPlwidVwiKXJldHVybjtsZXQgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ0cnVzdGVkLXR5cGVzXCJdJyk/LmNvbnRlbnQ/LnNwbGl0KFwiIFwiKSxvPXQ/dFt0Py5sZW5ndGgtMV06dm9pZCAwO3JldHVybiB0eXBlb2YgZTxcInVcIj9lLmNyZWF0ZVBvbGljeShvfHxgdHJ1c3RlZC1odG1sLSR7c31gLHtjcmVhdGVIVE1MOmE9PmF9KTp2b2lkIDB9dmFyIFQ9JCgpO2Z1bmN0aW9uIGcoKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocyl9ZnVuY3Rpb24gZigpe3JldHVybiFnKCl9ZnVuY3Rpb24gRigpe2xldCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5pZD1zO2xldCB0PWBcbiAgPHN0eWxlPlxuICAgICMke3N9IHtcbiAgICAgIGJhY2tncm91bmQ6ICNmM2YzZjM7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XG4gICAgICBib3gtc2hhZG93OiAjMzMzIDQuN3B4IDQuN3B4O1xuICAgIH1cblxuICAgICMke3N9OmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlM2UzZTM7XG4gICAgICBjb2xvcjogIzQ0NDtcbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIHBsYXNtby1sb2FkaW5nLWFuaW1hdGUtc3ZnLWZpbGwge1xuICAgICAgMCUge1xuICAgICAgICBmaWxsOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cbiAgICBcbiAgICAgIDEwMCUge1xuICAgICAgICBmaWxsOiAjMzMzO1xuICAgICAgfVxuICAgIH1cblxuICAgICMke3N9IC5zdmctZWxlbS0xIHtcbiAgICAgIGFuaW1hdGlvbjogcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCAxLjQ3cyBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KSAwLjhzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuXG4gICAgIyR7c30gLnN2Zy1lbGVtLTIge1xuICAgICAgYW5pbWF0aW9uOiBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIDEuNDdzIGN1YmljLWJlemllcigwLjQ3LCAwLCAwLjc0NSwgMC43MTUpIDAuOXMgYm90aCBpbmZpbml0ZTtcbiAgICB9XG4gICAgXG4gICAgIyR7c30gLnN2Zy1lbGVtLTMge1xuICAgICAgYW5pbWF0aW9uOiBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIDEuNDdzIGN1YmljLWJlemllcigwLjQ3LCAwLCAwLjc0NSwgMC43MTUpIDFzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuXG4gICAgIyR7c30gLmhpZGRlbiB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICA8L3N0eWxlPlxuICBcbiAgPHN2ZyBoZWlnaHQ9XCIzMlwiIHdpZHRoPVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI2NCAzNTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICA8cGF0aCBkPVwiTTEzOS4yMjEgMjgyLjI0M0MxNTQuMjUyIDI4Mi4yNDMgMTY2LjkwMyAyOTQuODQ5IDE2MS4zMzggMzA4LjgxMkMxNTkuNDg5IDMxMy40NTQgMTU3LjE1IDMxNy45MTMgMTU0LjM0NyAzMjIuMTA5QzE0Ni40NjQgMzMzLjkwOSAxMzUuMjYgMzQzLjEwNyAxMjIuMTUxIDM0OC41MzhDMTA5LjA0MyAzNTMuOTY5IDk0LjYxODIgMzU1LjM5IDgwLjcwMjIgMzUyLjYyMUM2Ni43ODYxIDM0OS44NTIgNTQuMDAzNCAzNDMuMDE4IDQzLjk3MDUgMzMyLjk4M0MzMy45Mzc1IDMyMi45NDcgMjcuMTA1IDMxMC4xNjIgMjQuMzM2OSAyOTYuMjQyQzIxLjU2ODkgMjgyLjMyMyAyMi45ODk1IDI2Ny44OTUgMjguNDE5MyAyNTQuNzgzQzMzLjg0OTEgMjQxLjY3MSA0My4wNDQxIDIzMC40NjQgNTQuODQxNiAyMjIuNTc5QzU5LjAzNTMgMjE5Ljc3NyA2My40OTA4IDIxNy40MzggNjguMTI5NSAyMTUuNTg4QzgyLjA5MTUgMjEwLjAyMSA5NC42OTc4IDIyMi42NzEgOTQuNjk3OCAyMzcuNzAzTDk0LjY5NzggMjU1LjAyN0M5NC42OTc4IDI3MC4wNTggMTA2Ljg4MyAyODIuMjQzIDEyMS45MTQgMjgyLjI0M0gxMzkuMjIxWlwiIGZpbGw9XCIjMzMzXCIgY2xhc3M9XCJzdmctZWxlbS0xXCIgPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE5Mi4yNjEgMTQyLjAyOEMxOTIuMjYxIDEyNi45OTYgMjA0Ljg2NyAxMTQuMzQ2IDIxOC44MjkgMTE5LjkxM0MyMjMuNDY4IDEyMS43NjMgMjI3LjkyMyAxMjQuMTAyIDIzMi4xMTcgMTI2LjkwNEMyNDMuOTE1IDEzNC43ODkgMjUzLjExIDE0NS45OTYgMjU4LjUzOSAxNTkuMTA4QzI2My45NjkgMTcyLjIyIDI2NS4zOSAxODYuNjQ4IDI2Mi42MjIgMjAwLjU2N0MyNTkuODU0IDIxNC40ODcgMjUzLjAyMSAyMjcuMjcyIDI0Mi45ODggMjM3LjMwOEMyMzIuOTU1IDI0Ny4zNDMgMjIwLjE3MyAyNTQuMTc3IDIwNi4yNTYgMjU2Ljk0NkMxOTIuMzQgMjU5LjcxNSAxNzcuOTE2IDI1OC4yOTQgMTY0LjgwNyAyNTIuODYzQzE1MS42OTkgMjQ3LjQzMiAxNDAuNDk1IDIzOC4yMzQgMTMyLjYxMiAyMjYuNDM0QzEyOS44MDggMjIyLjIzOCAxMjcuNDcgMjE3Ljc3OSAxMjUuNjIgMjEzLjEzN0MxMjAuMDU2IDE5OS4xNzQgMTMyLjcwNyAxODYuNTY4IDE0Ny43MzggMTg2LjU2OEwxNjUuMDQ0IDE4Ni41NjhDMTgwLjA3NiAxODYuNTY4IDE5Mi4yNjEgMTc0LjM4MyAxOTIuMjYxIDE1OS4zNTJMMTkyLjI2MSAxNDIuMDI4WlwiIGZpbGw9XCIjMzMzXCIgY2xhc3M9XCJzdmctZWxlbS0yXCIgPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTk1LjY1MjIgMTY0LjEzNUM5NS42NTIyIDE3OS4xNjcgODMuMjI3OSAxOTEuNzI1IDY4LjgwMTMgMTg3LjUwNUM1OS41MTQ1IDE4NC43ODggNTAuNjQzMiAxODAuNjYzIDQyLjUxMDYgMTc1LjIyN0MyNi43ODA2IDE2NC43MTQgMTQuNTIwNiAxNDkuNzcyIDcuMjgwODkgMTMyLjI4OUMwLjA0MTE4MyAxMTQuODA3IC0xLjg1MzA1IDk1LjU2OTcgMS44Mzc3MiA3Ny4wMTA0QzUuNTI4NDkgNTguNDUxMSAxNC42Mzg1IDQxLjQwMzMgMjguMDE1NyAyOC4wMjI4QzQxLjM5MyAxNC42NDIzIDU4LjQzNjYgNS41MzAwNiA3Ni45OTE0IDEuODM4MzlDOTUuNTQ2MSAtMS44NTMyOSAxMTQuNzc5IDAuMDQxNDE2MiAxMzIuMjU3IDcuMjgyOUMxNDkuNzM1IDE0LjUyNDQgMTY0LjY3NCAyNi43ODc0IDE3NS4xODQgNDIuNTIxMkMxODAuNjIgNTAuNjU3NiAxODQuNzQ0IDU5LjUzMzIgMTg3LjQ2IDY4LjgyNDVDMTkxLjY3OCA4My4yNTE5IDE3OS4xMTkgOTUuNjc1OSAxNjQuMDg4IDk1LjY3NTlMMTIyLjg2OSA5NS42NzU5QzEwNy44MzcgOTUuNjc1OSA5NS42NTIyIDEwNy44NjEgOTUuNjUyMiAxMjIuODkyTDk1LjY1MjIgMTY0LjEzNVpcIiBmaWxsPVwiIzMzM1wiIGNsYXNzPVwic3ZnLWVsZW0tM1wiPjwvcGF0aD5cbiAgPC9zdmc+XG4gIDxzcGFuIGNsYXNzPVwiaGlkZGVuXCI+Q29udGV4dCBJbnZhbGlkYXRlZCwgUHJlc3MgdG8gUmVsb2FkPC9zcGFuPlxuICBgO3JldHVybiBlLmlubmVySFRNTD1UP1QuY3JlYXRlSFRNTCh0KTp0LGUuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixlLnN0eWxlLnBvc2l0aW9uPVwiZml4ZWRcIixlLnN0eWxlLmJvdHRvbT1cIjE0LjdweFwiLGUuc3R5bGUucmlnaHQ9XCIxNC43cHhcIixlLnN0eWxlLmZvbnRGYW1pbHk9XCJzYW5zLXNlcmlmXCIsZS5zdHlsZS5kaXNwbGF5PVwiZmxleFwiLGUuc3R5bGUuanVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIixlLnN0eWxlLmFsaWduSXRlbXM9XCJjZW50ZXJcIixlLnN0eWxlLnBhZGRpbmc9XCIxNC43cHhcIixlLnN0eWxlLmdhcD1cIjE0LjdweFwiLGUuc3R5bGUuYm9yZGVyUmFkaXVzPVwiNC43cHhcIixlLnN0eWxlLnpJbmRleD1cIjIxNDc0ODM2NDdcIixlLnN0eWxlLm9wYWNpdHk9XCIwXCIsZS5zdHlsZS50cmFuc2l0aW9uPVwiYWxsIDAuNDdzIGVhc2UtaW4tb3V0XCIsZX1mdW5jdGlvbiBOKGUpe3JldHVybiBuZXcgUHJvbWlzZSh0PT57ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50PyhmKCkmJihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZSksdCgpKSx0KCkpOmdsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwoKT0+e2YoKSYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpLHQoKX0pfSl9dmFyIGs9KCk9PntsZXQgZTtpZihmKCkpe2xldCB0PUYoKTtlPU4odCl9cmV0dXJue3Nob3c6YXN5bmMoe3JlbG9hZEJ1dHRvbjp0PSExfT17fSk9Pnthd2FpdCBlO2xldCBvPWcoKTtvLnN0eWxlLm9wYWNpdHk9XCIxXCIsdCYmKG8ub25jbGljaz1yPT57ci5zdG9wUHJvcGFnYXRpb24oKSxnbG9iYWxUaGlzLmxvY2F0aW9uLnJlbG9hZCgpfSxvLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIiksby5zdHlsZS5jdXJzb3I9XCJwb2ludGVyXCIsby5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYWxsXCIpfSxoaWRlOmFzeW5jKCk9Pnthd2FpdCBlO2xldCB0PWcoKTt0LnN0eWxlLm9wYWNpdHk9XCIwXCJ9fX07dmFyIFc9YCR7RX0ke21vZHVsZS5pZH1fX2AsaSxBPSExLE09aygpO2FzeW5jIGZ1bmN0aW9uIGgoKXtjKFwiU2NyaXB0IFJ1bnRpbWUgLSByZWxvYWRpbmdcIiksQT9nbG9iYWxUaGlzLmxvY2F0aW9uPy5yZWxvYWQ/LigpOk0uc2hvdyh7cmVsb2FkQnV0dG9uOiEwfSl9ZnVuY3Rpb24gUigpe2k/LmRpc2Nvbm5lY3QoKSxpPWw/LnJ1bnRpbWUuY29ubmVjdCh7bmFtZTpXfSksaS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntoKCl9KSxpLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihlPT57ZS5fX3BsYXNtb19jc19yZWxvYWRfXyYmaCgpLGUuX19wbGFzbW9fY3NfYWN0aXZlX3RhYl9fJiYoQT0hMCl9KX1mdW5jdGlvbiBqKCl7aWYobD8ucnVudGltZSl0cnl7UigpLHNldEludGVydmFsKFIsMjRlMyl9Y2F0Y2h7cmV0dXJufX1qKCk7UChhc3luYyBlPT57YyhcIlNjcmlwdCBydW50aW1lIC0gb24gdXBkYXRlZCBhc3NldHNcIiksZS5maWx0ZXIobz0+by5lbnZIYXNoPT09bi5lbnZIYXNoKS5zb21lKG89PkwobW9kdWxlLmJ1bmRsZSxvLmlkKSkmJihNLnNob3coKSxsPy5ydW50aW1lP2kucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2NoYW5nZWRfXzohMH0pOnNldFRpbWVvdXQoKCk9PntoKCl9LDQ3MDApKX0pO1xuIiwiLy8gTGlzdGVuIGZvciBhIGNsaWNrIGV2ZW50IHRvIG9wZW4gdGhlIHNpZGUgcGFuZWxcbmNvbnN0IG9wZW5TaWRlUGFuZWxIYW5kbGVyID0gKCkgPT4ge1xuICBjaHJvbWUuc2lkZVBhbmVsLm9wZW4oeyB3aW5kb3dJZDogd2luZG93SWQgfSlcbn1cblxuLy8gWW91IGNhbiBhZGQgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIGEgc3BlY2lmaWMgZWxlbWVudCBsaWtlIGEgYnV0dG9uXG5kb2N1bWVudFxuICAucXVlcnlTZWxlY3RvcihcIiNvcGVuLXNpZGUtcGFuZWwtYnRuXCIpXG4gID8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5TaWRlUGFuZWxIYW5kbGVyKVxuLy8gSW4gY29udGVudC5qc1xuOyhmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IG9ic2VydmVCdXR0b25BbmRBdHRhY2hMaXN0ZW5lciA9ICgpID0+IHtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICdidXR0b25bZGF0YS1lMmUtbG9jYXRvcj1cImNvbnNvbGUtc3VibWl0LWJ1dHRvblwiXSdcbiAgICAgIClcbiAgICAgIGlmIChzdWJtaXRCdXR0b24pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdWJtaXQgYnV0dG9uIGRldGVjdGVkXCIpXG4gICAgICAgIGF0dGFjaENsaWNrTGlzdGVuZXIoc3VibWl0QnV0dG9uKVxuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCkgLy8gU3RvcCBvYnNlcnZpbmcgb25jZSB0aGUgYnV0dG9uIGlzIGZvdW5kXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcbiAgfVxuXG4gIGNvbnN0IGF0dGFjaENsaWNrTGlzdGVuZXIgPSAoc3VibWl0QnV0dG9uKSA9PiB7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdCBidXR0b24gY2xpY2tlZFwiKVxuICAgICAgd2FpdEZvckFjY2VwdGVkVGV4dCgpIC8vIFRyaWdnZXIgY2hlY2sgYWZ0ZXIgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgd2FpdEZvckFjY2VwdGVkVGV4dCA9ICgpID0+IHtcbiAgICBjb25zdCBjaGVja0FjY2VwdGVkVGV4dCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGFjY2VwdGVkVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICdzcGFuW2RhdGEtZTJlLWxvY2F0b3I9XCJzdWJtaXNzaW9uLXJlc3VsdFwiXSdcbiAgICAgIClcbiAgICAgIGlmIChhY2NlcHRlZFRleHQgJiYgYWNjZXB0ZWRUZXh0LnRleHRDb250ZW50LnRyaW0oKSA9PT0gXCJBY2NlcHRlZFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWNjZXB0ZWQgdGV4dCBkZXRlY3RlZFwiKVxuICAgICAgICBmZXRjaFN1Ym1pc3Npb25EZXRhaWxzKClcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpIC8vIFN0b3Agb2JzZXJ2aW5nIGZvciBjaGFuZ2VzXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiBjaGVja0FjY2VwdGVkVGV4dCgpKVxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcbiAgfVxuXG4gIGNvbnN0IGZldGNoU3VibWlzc2lvbkRldGFpbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgdXJsU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICBjb25zdCBtYXRjaCA9IHVybFN0cmluZy5tYXRjaCgvXFwvc3VibWlzc2lvbnNcXC8oXFxkKykvKVxuXG4gICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG4gICAgICBjb25zdCBzdWJtaXNzaW9uSWQgPSBwYXJzZUludChtYXRjaFsxXSwgMTApXG4gICAgICBjb25zb2xlLmxvZyhcIkV4dHJhY3RlZCBzdWJtaXNzaW9uSWQ6XCIsIHN1Ym1pc3Npb25JZClcblxuICAgICAgY29uc3QgcXVlcnkgPSBgXG4gICAgICAgICAgcXVlcnkgc3VibWlzc2lvbkRldGFpbHMoJHN1Ym1pc3Npb25JZDogSW50ISkge1xuICAgICAgICAgICAgc3VibWlzc2lvbkRldGFpbHMoc3VibWlzc2lvbklkOiAkc3VibWlzc2lvbklkKSB7XG4gICAgICAgICAgICAgIGNvZGVcbiAgICAgICAgICAgICAgbGFuZyB7XG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHZlcmJvc2VOYW1lXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIGBcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgc3VibWlzc2lvbklkIH1cbiAgICAgIGNvbnN0IHVybCA9IFwiaHR0cHM6Ly9sZWV0Y29kZS5jb20vZ3JhcGhxbC9cIlxuICAgICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIEFjY2VwdDogXCIqLypcIixcbiAgICAgICAgXCJVc2VyLUFnZW50XCI6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHF1ZXJ5LFxuICAgICAgICB2YXJpYWJsZXMsXG4gICAgICAgIG9wZXJhdGlvbk5hbWU6IFwic3VibWlzc2lvbkRldGFpbHNcIlxuICAgICAgfSlcblxuICAgICAgZmV0Y2godXJsLCB7IG1ldGhvZDogXCJQT1NUXCIsIGhlYWRlcnMsIGJvZHkgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuZGF0YT8uc3VibWlzc2lvbkRldGFpbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29kZSwgbGFuZyB9ID0gZGF0YS5kYXRhLnN1Ym1pc3Npb25EZXRhaWxzXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4dHJhY3RlZCBDb2RlOlwiLCBjb2RlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcm9ncmFtbWluZyBMYW5ndWFnZTpcIiwgbGFuZy52ZXJib3NlTmFtZSlcblxuICAgICAgICAgICAgcG9zdFRvQmlnT0NhbGNFbmRwb2ludChjb2RlLCBsYW5nLnZlcmJvc2VOYW1lLCBzdWJtaXNzaW9uSWQsIGNvZGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEZXRhaWxzIG5vdCBmb3VuZCBpbiByZXNwb25zZVwiKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcikpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyB2YWxpZCBzdWJtaXNzaW9uSWQgZm91bmQgaW4gdGhlIFVSTFwiKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBvc3RUb0JpZ09DYWxjRW5kcG9pbnQgPSAoXG4gICAgY29kZSxcbiAgICBsYW5ndWFnZSxcbiAgICBzdWJtaXNzaW9uSWQsXG4gICAgc3VibWlzc2lvbkNvZGVcbiAgKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnRVcmwgPSBcImh0dHBzOi8vZGFsZXNlby1iaWdvY2FsYy53ZWIudmFsLnJ1blwiXG4gICAgY29uc3QgcmVxdWVzdEJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IGNvZGUsIGxhbmc6IGxhbmd1YWdlIH0pXG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfVxuXG4gICAgZmV0Y2goZW5kcG9pbnRVcmwsIHsgbWV0aG9kOiBcIlBPU1RcIiwgaGVhZGVycywgYm9keTogcmVxdWVzdEJvZHkgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBmcm9tIEJpZ08gQ2FsYyBFbmRwb2ludDpcIiwgZGF0YSlcblxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgYWN0aW9uOiBcInVwZGF0ZVBvcHVwXCIsXG4gICAgICAgICAgc3VibWlzc2lvbklkOiBzdWJtaXNzaW9uSWQsXG4gICAgICAgICAgc3VibWlzc2lvbkNvZGU6IHN1Ym1pc3Npb25Db2RlLFxuICAgICAgICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICAgICAgICByZXN1bHQ6IGRhdGFcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PlxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcG9zdGluZyB0byBCaWdPIENhbGMgZW5kcG9pbnQ6XCIsIGVycm9yKVxuICAgICAgKVxuICB9XG5cbiAgLy8gU3RhcnQgb2JzZXJ2aW5nIGZvciB0aGUgc3VibWl0IGJ1dHRvblxuICBvYnNlcnZlQnV0dG9uQW5kQXR0YWNoTGlzdGVuZXIoKVxufSkoKVxuXG5cblxuXG5cbi8vIGNvZGUgZm9yIG9ic2VydmluZyB0aGUgcXVlc3Rpb24gbmFtZSBjaGFuZ2VkLCBhcyBzb29uIGFzIHRoZSBkaXYgd2l0aCBzcGVjaWZlZCB0ZXh0IGFwcGVhcnMsIGl0IHdpbGwgYWxlcnQgdGhlIHF1ZXN0aW9uIG5hbWV0aGUgYWxlcnQgd2lsbCBwcm9tcHRcblxuZnVuY3Rpb24gZXh0cmFjdFByb2JsZW1OYW1lKCkge1xuICAvLyBHZXQgdGhlIGN1cnJlbnQgVVJMXG4gIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gIC8vIFVzZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBleHRyYWN0IHRoZSBwYXJ0IGFmdGVyIFwiL3Byb2JsZW1zL1wiXG4gIGNvbnN0IHJlZ2V4ID0gL1xcL3Byb2JsZW1zXFwvKFteL10rKS9cbiAgY29uc3QgbWF0Y2ggPSBjdXJyZW50VXJsLm1hdGNoKHJlZ2V4KVxuXG4gIC8vIElmIGEgbWF0Y2ggaXMgZm91bmQsIGV4dHJhY3QgdGhlIHByb2JsZW0gbmFtZVxuICBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0pIHtcbiAgICBsZXQgcHJvYmxlbU5hbWUgPSBtYXRjaFsxXS5yZXBsYWNlKC8tL2csIFwiIFwiKSAvLyBSZXBsYWNlIGh5cGhlbnMgd2l0aCBzcGFjZXNcblxuICAgIC8vIFRyaW0gYW55IGxlYWRpbmcgb3IgdHJhaWxpbmcgd2hpdGVzcGFjZVxuICAgIHByb2JsZW1OYW1lID0gcHJvYmxlbU5hbWUudHJpbSgpXG4gICAgLy8gYWxlcnQocHJvYmxlbU5hbWUpXG4gICAgLy8gSWYgYSB2YWxpZCBwcm9ibGVtIG5hbWUgZXhpc3RzLCBtYWtlIHRoZSBBUEkgY2FsbFxuICAgIGlmIChwcm9ibGVtTmFtZSkge1xuICAgICAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vbGVldC1jb2RlLWV4dGVuc2lvbi1jb21wYW55ZGF0YS52ZXJjZWwuYXBwL2NvbXBhbnlJbmZvU3RhdHM/dGl0bGU9JHtwcm9ibGVtTmFtZX1gXG5cbiAgICAgIC8vIE1ha2UgdGhlIEFQSSBjYWxsIHVzaW5nIGZldGNoXG4gICAgICBmZXRjaChhcGlVcmwpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIC8vIExvZyB0aGUgcmVzcG9uc2UgZGF0YSB0byB0aGUgY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQVBJIFJlc3BvbnNlOlwiLCBkYXRhLmNvbXBhbnkpXG5cbiAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICBhY3Rpb246IFwic2VuZENvbXBhbnlOYW1lc1wiLFxuICAgICAgICAgICAgcmVzdWx0OiBkYXRhLmNvbXBhbnlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGRhdGE6XCIsIGVycm9yKVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlByb2JsZW0gbmFtZSBpcyBlbXB0eSBhZnRlciBjbGVhbmluZy5cIilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJObyBwcm9ibGVtIGluIFVSTFwiKVxuICB9XG59XG5cbi8vIExpc3RlbiBmb3IgY2hhbmdlcyBpbiB0aGUgVVJMICh3aGVuIHRoZSBwYWdlIGlzIG5hdmlnYXRlZCB0byBhIG5ldyBwcm9ibGVtKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBleHRyYWN0UHJvYmxlbU5hbWUpXG5cbi8vIEV4dHJhY3QgdGhlIHByb2JsZW0gbmFtZSB3aGVuIHRoZSBzY3JpcHQgaXMgZmlyc3QgbG9hZGVkXG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgZXh0cmFjdFByb2JsZW1OYW1lKClcbn0sIDIwMDAwKSJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJjb250ZW50LjA2NmM2OGI2LmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);