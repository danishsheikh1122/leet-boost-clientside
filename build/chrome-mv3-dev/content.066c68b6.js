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
})({"5paYv":[function(require,module,exports) {
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
    "serverPort": 52060
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
extractProblemName();

},{}]},["5paYv","d9GIc"], "d9GIc", "parcelRequire872a")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQjtnQkFDaEIsVUFBVTtnQkFDVixRQUFRO1lBQ1Y7UUFDRixHQUNDLE1BQU0sQ0FBQyxRQUNOLFFBQVEsTUFBTSx3Q0FBd0M7SUFFNUQ7SUFFQSx3Q0FBd0M7SUFDeEM7QUFDRixDQUFBO0FBRUEsb0pBQW9KO0FBRXBKLFNBQVM7SUFDUCxzQkFBc0I7SUFDdEIsTUFBTSxhQUFhLE9BQU8sU0FBUztJQUVuQyxrRUFBa0U7SUFDbEUsTUFBTSxRQUFRO0lBQ2QsTUFBTSxRQUFRLFdBQVcsTUFBTTtJQUUvQixnREFBZ0Q7SUFDaEQsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUU7UUFDckIsSUFBSSxjQUFjLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxNQUFNLEtBQUssOEJBQThCOztRQUU1RSwwQ0FBMEM7UUFDMUMsY0FBYyxZQUFZO1FBQzFCLHFCQUFxQjtRQUNyQixvREFBb0Q7UUFDcEQsSUFBSSxhQUFhO1lBQ2YsTUFBTSxTQUFTLENBQUMsMEVBQTBFLEVBQUUsWUFBWSxDQUFDO1lBRXpHLGdDQUFnQztZQUNoQyxNQUFNLFFBQ0gsS0FBSyxDQUFDLFdBQWEsU0FBUyxRQUM1QixLQUFLLENBQUM7Z0JBQ0wsdUNBQXVDO2dCQUN2QyxRQUFRLElBQUksaUJBQWlCLEtBQUs7Z0JBRWxDLE9BQU8sUUFBUSxZQUFZO29CQUN6QixRQUFRO29CQUNSLFFBQVEsS0FBSztnQkFDZjtZQUVGLEdBQ0MsTUFBTSxDQUFDO2dCQUNOLFFBQVEsTUFBTSx3QkFBd0I7WUFDeEM7UUFDSixPQUNFLFFBQVEsSUFBSTtJQUVoQixPQUNFLFFBQVEsSUFBSTtBQUVoQjtBQUVBLDhFQUE4RTtBQUM5RSxPQUFPLGlCQUFpQixZQUFZO0FBRXBDLDJEQUEyRDtBQUMzRCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzLy5wbnBtL0BwbGFzbW9ocStwYXJjZWwtcnVudGltZUAwLjI1LjEvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtcnVudGltZS9kaXN0L3J1bnRpbWUtMzJhMTRjZTk4NGNkMWRmOS5qcyIsInNyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBkPWdsb2JhbFRoaXMucHJvY2Vzcz8uYXJndnx8W107dmFyIHk9KCk9Pmdsb2JhbFRoaXMucHJvY2Vzcz8uZW52fHx7fTt2YXIgSD1uZXcgU2V0KGQpLF89ZT0+SC5oYXMoZSksRz1kLmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFo9XyhcIi0tZHJ5LXJ1blwiKSxwPSgpPT5fKFwiLS12ZXJib3NlXCIpfHx5KCkuVkVSQk9TRT09PVwidHJ1ZVwiLHE9cCgpO3ZhciB1PShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB4PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksdj0oLi4uZSk9PnUoXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxtPSguLi5lKT0+dShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLFM9MCxjPSguLi5lKT0+cCgpJiZ1KGBcXHV7MUY3RTF9ICR7UysrfWAsLi4uZSk7dmFyIG49e1wiaXNDb250ZW50U2NyaXB0XCI6dHJ1ZSxcImlzQmFja2dyb3VuZFwiOmZhbHNlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJzY3JpcHQtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvVXNlcnMvZGFuaXNoc2hlaWtoL0Rlc2t0b3AvZXh0ZW5zaW9uIGltcHMvbGVldC1ib29zdC9zcmMvY29udGVudC5qc1wiLFwiYnVuZGxlSWRcIjpcIjc0MGU3ZThkMDY2YzY4YjZcIixcImVudkhhc2hcIjpcImU3OTJmYmJkYWE3OGVlODRcIixcInZlcmJvc2VcIjpcImZhbHNlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjo1MjA2MH07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPW4uYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpuLnZlcmJvc2V9fTt2YXIgRD1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBJKGUpe0QuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9STttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGw9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDtmdW5jdGlvbiBiKCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/XCJsb2NhbGhvc3RcIjpuLmhvc3R9ZnVuY3Rpb24gQygpe3JldHVybiBuLnBvcnR8fGxvY2F0aW9uLnBvcnR9dmFyIEU9XCJfX3BsYXNtb19ydW50aW1lX3NjcmlwdF9cIjtmdW5jdGlvbiBMKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gTyhlPUMoKSl7bGV0IHQ9YigpO3JldHVybmAke24uc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIEIoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeChcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIFAoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KE8oKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcj1KU09OLnBhcnNlKG8uZGF0YSk7aWYoci50eXBlPT09XCJ1cGRhdGVcIiYmYXdhaXQgZShyLmFzc2V0cyksci50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgYSBvZiByLmRpYWdub3N0aWNzLmFuc2kpe2xldCB3PWEuY29kZWZyYW1lfHxhLnN0YWNrO20oXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrYS5tZXNzYWdlK2BcbmArdytgXG5cbmArYS5oaW50cy5qb2luKGBcbmApKX19KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLEIpLHQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e3YoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0ZWQgdG8gSE1SIHNlcnZlciBmb3IgJHtuLmVudHJ5RmlsZVBhdGh9YCl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT57bShgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgaXMgY2xvc2VkIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHR9dmFyIHM9XCJfX3BsYXNtby1sb2FkaW5nX19cIjtmdW5jdGlvbiAkKCl7bGV0IGU9Z2xvYmFsVGhpcy53aW5kb3c/LnRydXN0ZWRUeXBlcztpZih0eXBlb2YgZT5cInVcIilyZXR1cm47bGV0IHQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidHJ1c3RlZC10eXBlc1wiXScpPy5jb250ZW50Py5zcGxpdChcIiBcIiksbz10P3RbdD8ubGVuZ3RoLTFdOnZvaWQgMDtyZXR1cm4gdHlwZW9mIGU8XCJ1XCI/ZS5jcmVhdGVQb2xpY3kob3x8YHRydXN0ZWQtaHRtbC0ke3N9YCx7Y3JlYXRlSFRNTDphPT5hfSk6dm9pZCAwfXZhciBUPSQoKTtmdW5jdGlvbiBnKCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHMpfWZ1bmN0aW9uIGYoKXtyZXR1cm4hZygpfWZ1bmN0aW9uIEYoKXtsZXQgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuaWQ9cztsZXQgdD1gXG4gIDxzdHlsZT5cbiAgICAjJHtzfSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjNmM2YzO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMzMzO1xuICAgICAgYm94LXNoYWRvdzogIzMzMyA0LjdweCA0LjdweDtcbiAgICB9XG5cbiAgICAjJHtzfTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZTNlM2UzO1xuICAgICAgY29sb3I6ICM0NDQ7XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIHtcbiAgICAgIDAlIHtcbiAgICAgICAgZmlsbDogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgXG4gICAgICAxMDAlIHtcbiAgICAgICAgZmlsbDogIzMzMztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAjJHtzfSAuc3ZnLWVsZW0tMSB7XG4gICAgICBhbmltYXRpb246IHBsYXNtby1sb2FkaW5nLWFuaW1hdGUtc3ZnLWZpbGwgMS40N3MgY3ViaWMtYmV6aWVyKDAuNDcsIDAsIDAuNzQ1LCAwLjcxNSkgMC44cyBib3RoIGluZmluaXRlO1xuICAgIH1cblxuICAgICMke3N9IC5zdmctZWxlbS0yIHtcbiAgICAgIGFuaW1hdGlvbjogcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCAxLjQ3cyBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KSAwLjlzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuICAgIFxuICAgICMke3N9IC5zdmctZWxlbS0zIHtcbiAgICAgIGFuaW1hdGlvbjogcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCAxLjQ3cyBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KSAxcyBib3RoIGluZmluaXRlO1xuICAgIH1cblxuICAgICMke3N9IC5oaWRkZW4ge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgPC9zdHlsZT5cbiAgXG4gIDxzdmcgaGVpZ2h0PVwiMzJcIiB3aWR0aD1cIjMyXCIgdmlld0JveD1cIjAgMCAyNjQgMzU0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgPHBhdGggZD1cIk0xMzkuMjIxIDI4Mi4yNDNDMTU0LjI1MiAyODIuMjQzIDE2Ni45MDMgMjk0Ljg0OSAxNjEuMzM4IDMwOC44MTJDMTU5LjQ4OSAzMTMuNDU0IDE1Ny4xNSAzMTcuOTEzIDE1NC4zNDcgMzIyLjEwOUMxNDYuNDY0IDMzMy45MDkgMTM1LjI2IDM0My4xMDcgMTIyLjE1MSAzNDguNTM4QzEwOS4wNDMgMzUzLjk2OSA5NC42MTgyIDM1NS4zOSA4MC43MDIyIDM1Mi42MjFDNjYuNzg2MSAzNDkuODUyIDU0LjAwMzQgMzQzLjAxOCA0My45NzA1IDMzMi45ODNDMzMuOTM3NSAzMjIuOTQ3IDI3LjEwNSAzMTAuMTYyIDI0LjMzNjkgMjk2LjI0MkMyMS41Njg5IDI4Mi4zMjMgMjIuOTg5NSAyNjcuODk1IDI4LjQxOTMgMjU0Ljc4M0MzMy44NDkxIDI0MS42NzEgNDMuMDQ0MSAyMzAuNDY0IDU0Ljg0MTYgMjIyLjU3OUM1OS4wMzUzIDIxOS43NzcgNjMuNDkwOCAyMTcuNDM4IDY4LjEyOTUgMjE1LjU4OEM4Mi4wOTE1IDIxMC4wMjEgOTQuNjk3OCAyMjIuNjcxIDk0LjY5NzggMjM3LjcwM0w5NC42OTc4IDI1NS4wMjdDOTQuNjk3OCAyNzAuMDU4IDEwNi44ODMgMjgyLjI0MyAxMjEuOTE0IDI4Mi4yNDNIMTM5LjIyMVpcIiBmaWxsPVwiIzMzM1wiIGNsYXNzPVwic3ZnLWVsZW0tMVwiID48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xOTIuMjYxIDE0Mi4wMjhDMTkyLjI2MSAxMjYuOTk2IDIwNC44NjcgMTE0LjM0NiAyMTguODI5IDExOS45MTNDMjIzLjQ2OCAxMjEuNzYzIDIyNy45MjMgMTI0LjEwMiAyMzIuMTE3IDEyNi45MDRDMjQzLjkxNSAxMzQuNzg5IDI1My4xMSAxNDUuOTk2IDI1OC41MzkgMTU5LjEwOEMyNjMuOTY5IDE3Mi4yMiAyNjUuMzkgMTg2LjY0OCAyNjIuNjIyIDIwMC41NjdDMjU5Ljg1NCAyMTQuNDg3IDI1My4wMjEgMjI3LjI3MiAyNDIuOTg4IDIzNy4zMDhDMjMyLjk1NSAyNDcuMzQzIDIyMC4xNzMgMjU0LjE3NyAyMDYuMjU2IDI1Ni45NDZDMTkyLjM0IDI1OS43MTUgMTc3LjkxNiAyNTguMjk0IDE2NC44MDcgMjUyLjg2M0MxNTEuNjk5IDI0Ny40MzIgMTQwLjQ5NSAyMzguMjM0IDEzMi42MTIgMjI2LjQzNEMxMjkuODA4IDIyMi4yMzggMTI3LjQ3IDIxNy43NzkgMTI1LjYyIDIxMy4xMzdDMTIwLjA1NiAxOTkuMTc0IDEzMi43MDcgMTg2LjU2OCAxNDcuNzM4IDE4Ni41NjhMMTY1LjA0NCAxODYuNTY4QzE4MC4wNzYgMTg2LjU2OCAxOTIuMjYxIDE3NC4zODMgMTkyLjI2MSAxNTkuMzUyTDE5Mi4yNjEgMTQyLjAyOFpcIiBmaWxsPVwiIzMzM1wiIGNsYXNzPVwic3ZnLWVsZW0tMlwiID48L3BhdGg+XG4gICAgPHBhdGggZD1cIk05NS42NTIyIDE2NC4xMzVDOTUuNjUyMiAxNzkuMTY3IDgzLjIyNzkgMTkxLjcyNSA2OC44MDEzIDE4Ny41MDVDNTkuNTE0NSAxODQuNzg4IDUwLjY0MzIgMTgwLjY2MyA0Mi41MTA2IDE3NS4yMjdDMjYuNzgwNiAxNjQuNzE0IDE0LjUyMDYgMTQ5Ljc3MiA3LjI4MDg5IDEzMi4yODlDMC4wNDExODMgMTE0LjgwNyAtMS44NTMwNSA5NS41Njk3IDEuODM3NzIgNzcuMDEwNEM1LjUyODQ5IDU4LjQ1MTEgMTQuNjM4NSA0MS40MDMzIDI4LjAxNTcgMjguMDIyOEM0MS4zOTMgMTQuNjQyMyA1OC40MzY2IDUuNTMwMDYgNzYuOTkxNCAxLjgzODM5Qzk1LjU0NjEgLTEuODUzMjkgMTE0Ljc3OSAwLjA0MTQxNjIgMTMyLjI1NyA3LjI4MjlDMTQ5LjczNSAxNC41MjQ0IDE2NC42NzQgMjYuNzg3NCAxNzUuMTg0IDQyLjUyMTJDMTgwLjYyIDUwLjY1NzYgMTg0Ljc0NCA1OS41MzMyIDE4Ny40NiA2OC44MjQ1QzE5MS42NzggODMuMjUxOSAxNzkuMTE5IDk1LjY3NTkgMTY0LjA4OCA5NS42NzU5TDEyMi44NjkgOTUuNjc1OUMxMDcuODM3IDk1LjY3NTkgOTUuNjUyMiAxMDcuODYxIDk1LjY1MjIgMTIyLjg5Mkw5NS42NTIyIDE2NC4xMzVaXCIgZmlsbD1cIiMzMzNcIiBjbGFzcz1cInN2Zy1lbGVtLTNcIj48L3BhdGg+XG4gIDwvc3ZnPlxuICA8c3BhbiBjbGFzcz1cImhpZGRlblwiPkNvbnRleHQgSW52YWxpZGF0ZWQsIFByZXNzIHRvIFJlbG9hZDwvc3Bhbj5cbiAgYDtyZXR1cm4gZS5pbm5lckhUTUw9VD9ULmNyZWF0ZUhUTUwodCk6dCxlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsZS5zdHlsZS5wb3NpdGlvbj1cImZpeGVkXCIsZS5zdHlsZS5ib3R0b209XCIxNC43cHhcIixlLnN0eWxlLnJpZ2h0PVwiMTQuN3B4XCIsZS5zdHlsZS5mb250RmFtaWx5PVwic2Fucy1zZXJpZlwiLGUuc3R5bGUuZGlzcGxheT1cImZsZXhcIixlLnN0eWxlLmp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIsZS5zdHlsZS5hbGlnbkl0ZW1zPVwiY2VudGVyXCIsZS5zdHlsZS5wYWRkaW5nPVwiMTQuN3B4XCIsZS5zdHlsZS5nYXA9XCIxNC43cHhcIixlLnN0eWxlLmJvcmRlclJhZGl1cz1cIjQuN3B4XCIsZS5zdHlsZS56SW5kZXg9XCIyMTQ3NDgzNjQ3XCIsZS5zdHlsZS5vcGFjaXR5PVwiMFwiLGUuc3R5bGUudHJhbnNpdGlvbj1cImFsbCAwLjQ3cyBlYXNlLWluLW91dFwiLGV9ZnVuY3Rpb24gTihlKXtyZXR1cm4gbmV3IFByb21pc2UodD0+e2RvY3VtZW50LmRvY3VtZW50RWxlbWVudD8oZigpJiYoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpLHQoKSksdCgpKTpnbG9iYWxUaGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsKCk9PntmKCkmJmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlKSx0KCl9KX0pfXZhciBrPSgpPT57bGV0IGU7aWYoZigpKXtsZXQgdD1GKCk7ZT1OKHQpfXJldHVybntzaG93OmFzeW5jKHtyZWxvYWRCdXR0b246dD0hMX09e30pPT57YXdhaXQgZTtsZXQgbz1nKCk7by5zdHlsZS5vcGFjaXR5PVwiMVwiLHQmJihvLm9uY2xpY2s9cj0+e3Iuc3RvcFByb3BhZ2F0aW9uKCksZ2xvYmFsVGhpcy5sb2NhdGlvbi5yZWxvYWQoKX0sby5xdWVyeVNlbGVjdG9yKFwic3BhblwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpLG8uc3R5bGUuY3Vyc29yPVwicG9pbnRlclwiLG8uc3R5bGUucG9pbnRlckV2ZW50cz1cImFsbFwiKX0saGlkZTphc3luYygpPT57YXdhaXQgZTtsZXQgdD1nKCk7dC5zdHlsZS5vcGFjaXR5PVwiMFwifX19O3ZhciBXPWAke0V9JHttb2R1bGUuaWR9X19gLGksQT0hMSxNPWsoKTthc3luYyBmdW5jdGlvbiBoKCl7YyhcIlNjcmlwdCBSdW50aW1lIC0gcmVsb2FkaW5nXCIpLEE/Z2xvYmFsVGhpcy5sb2NhdGlvbj8ucmVsb2FkPy4oKTpNLnNob3coe3JlbG9hZEJ1dHRvbjohMH0pfWZ1bmN0aW9uIFIoKXtpPy5kaXNjb25uZWN0KCksaT1sPy5ydW50aW1lLmNvbm5lY3Qoe25hbWU6V30pLGkub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpPT57aCgpfSksaS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZT0+e2UuX19wbGFzbW9fY3NfcmVsb2FkX18mJmgoKSxlLl9fcGxhc21vX2NzX2FjdGl2ZV90YWJfXyYmKEE9ITApfSl9ZnVuY3Rpb24gaigpe2lmKGw/LnJ1bnRpbWUpdHJ5e1IoKSxzZXRJbnRlcnZhbChSLDI0ZTMpfWNhdGNoe3JldHVybn19aigpO1AoYXN5bmMgZT0+e2MoXCJTY3JpcHQgcnVudGltZSAtIG9uIHVwZGF0ZWQgYXNzZXRzXCIpLGUuZmlsdGVyKG89Pm8uZW52SGFzaD09PW4uZW52SGFzaCkuc29tZShvPT5MKG1vZHVsZS5idW5kbGUsby5pZCkpJiYoTS5zaG93KCksbD8ucnVudGltZT9pLnBvc3RNZXNzYWdlKHtfX3BsYXNtb19jc19jaGFuZ2VkX186ITB9KTpzZXRUaW1lb3V0KCgpPT57aCgpfSw0NzAwKSl9KTtcbiIsIi8vIExpc3RlbiBmb3IgYSBjbGljayBldmVudCB0byBvcGVuIHRoZSBzaWRlIHBhbmVsXG5jb25zdCBvcGVuU2lkZVBhbmVsSGFuZGxlciA9ICgpID0+IHtcbiAgY2hyb21lLnNpZGVQYW5lbC5vcGVuKHsgd2luZG93SWQ6IHdpbmRvd0lkIH0pXG59XG5cbi8vIFlvdSBjYW4gYWRkIHRoZSBldmVudCBsaXN0ZW5lciB0byBhIHNwZWNpZmljIGVsZW1lbnQgbGlrZSBhIGJ1dHRvblxuZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIjb3Blbi1zaWRlLXBhbmVsLWJ0blwiKVxuICA/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuU2lkZVBhbmVsSGFuZGxlcilcbi8vIEluIGNvbnRlbnQuanNcbjsoZnVuY3Rpb24gKCkge1xuICBjb25zdCBvYnNlcnZlQnV0dG9uQW5kQXR0YWNoTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnYnV0dG9uW2RhdGEtZTJlLWxvY2F0b3I9XCJjb25zb2xlLXN1Ym1pdC1idXR0b25cIl0nXG4gICAgICApXG4gICAgICBpZiAoc3VibWl0QnV0dG9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0IGJ1dHRvbiBkZXRlY3RlZFwiKVxuICAgICAgICBhdHRhY2hDbGlja0xpc3RlbmVyKHN1Ym1pdEJ1dHRvbilcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpIC8vIFN0b3Agb2JzZXJ2aW5nIG9uY2UgdGhlIGJ1dHRvbiBpcyBmb3VuZFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pXG4gIH1cblxuICBjb25zdCBhdHRhY2hDbGlja0xpc3RlbmVyID0gKHN1Ym1pdEJ1dHRvbikgPT4ge1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJTdWJtaXQgYnV0dG9uIGNsaWNrZWRcIilcbiAgICAgIHdhaXRGb3JBY2NlcHRlZFRleHQoKSAvLyBUcmlnZ2VyIGNoZWNrIGFmdGVyIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHdhaXRGb3JBY2NlcHRlZFRleHQgPSAoKSA9PiB7XG4gICAgY29uc3QgY2hlY2tBY2NlcHRlZFRleHQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBhY2NlcHRlZFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnc3BhbltkYXRhLWUyZS1sb2NhdG9yPVwic3VibWlzc2lvbi1yZXN1bHRcIl0nXG4gICAgICApXG4gICAgICBpZiAoYWNjZXB0ZWRUZXh0ICYmIGFjY2VwdGVkVGV4dC50ZXh0Q29udGVudC50cmltKCkgPT09IFwiQWNjZXB0ZWRcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFjY2VwdGVkIHRleHQgZGV0ZWN0ZWRcIilcbiAgICAgICAgZmV0Y2hTdWJtaXNzaW9uRGV0YWlscygpXG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKSAvLyBTdG9wIG9ic2VydmluZyBmb3IgY2hhbmdlc1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gY2hlY2tBY2NlcHRlZFRleHQoKSlcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pXG4gIH1cblxuICBjb25zdCBmZXRjaFN1Ym1pc3Npb25EZXRhaWxzID0gKCkgPT4ge1xuICAgIGNvbnN0IHVybFN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgY29uc3QgbWF0Y2ggPSB1cmxTdHJpbmcubWF0Y2goL1xcL3N1Ym1pc3Npb25zXFwvKFxcZCspLylcblxuICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgY29uc3Qgc3VibWlzc2lvbklkID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKVxuICAgICAgY29uc29sZS5sb2coXCJFeHRyYWN0ZWQgc3VibWlzc2lvbklkOlwiLCBzdWJtaXNzaW9uSWQpXG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYFxuICAgICAgICAgIHF1ZXJ5IHN1Ym1pc3Npb25EZXRhaWxzKCRzdWJtaXNzaW9uSWQ6IEludCEpIHtcbiAgICAgICAgICAgIHN1Ym1pc3Npb25EZXRhaWxzKHN1Ym1pc3Npb25JZDogJHN1Ym1pc3Npb25JZCkge1xuICAgICAgICAgICAgICBjb2RlXG4gICAgICAgICAgICAgIGxhbmcge1xuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICB2ZXJib3NlTmFtZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBgXG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IHN1Ym1pc3Npb25JZCB9XG4gICAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8vbGVldGNvZGUuY29tL2dyYXBocWwvXCJcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBBY2NlcHQ6IFwiKi8qXCIsXG4gICAgICAgIFwiVXNlci1BZ2VudFwiOiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgICB9XG4gICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBxdWVyeSxcbiAgICAgICAgdmFyaWFibGVzLFxuICAgICAgICBvcGVyYXRpb25OYW1lOiBcInN1Ym1pc3Npb25EZXRhaWxzXCJcbiAgICAgIH0pXG5cbiAgICAgIGZldGNoKHVybCwgeyBtZXRob2Q6IFwiUE9TVFwiLCBoZWFkZXJzLCBib2R5IH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLmRhdGE/LnN1Ym1pc3Npb25EZXRhaWxzKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvZGUsIGxhbmcgfSA9IGRhdGEuZGF0YS5zdWJtaXNzaW9uRGV0YWlsc1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeHRyYWN0ZWQgQ29kZTpcIiwgY29kZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZ3JhbW1pbmcgTGFuZ3VhZ2U6XCIsIGxhbmcudmVyYm9zZU5hbWUpXG5cbiAgICAgICAgICAgIHBvc3RUb0JpZ09DYWxjRW5kcG9pbnQoY29kZSwgbGFuZy52ZXJib3NlTmFtZSwgc3VibWlzc2lvbklkLCBjb2RlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRGV0YWlscyBub3QgZm91bmQgaW4gcmVzcG9uc2VcIilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiTm8gdmFsaWQgc3VibWlzc2lvbklkIGZvdW5kIGluIHRoZSBVUkxcIilcbiAgICB9XG4gIH1cblxuICBjb25zdCBwb3N0VG9CaWdPQ2FsY0VuZHBvaW50ID0gKFxuICAgIGNvZGUsXG4gICAgbGFuZ3VhZ2UsXG4gICAgc3VibWlzc2lvbklkLFxuICAgIHN1Ym1pc3Npb25Db2RlXG4gICkgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50VXJsID0gXCJodHRwczovL2RhbGVzZW8tYmlnb2NhbGMud2ViLnZhbC5ydW5cIlxuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBjb2RlLCBsYW5nOiBsYW5ndWFnZSB9KVxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH1cblxuICAgIGZldGNoKGVuZHBvaW50VXJsLCB7IG1ldGhvZDogXCJQT1NUXCIsIGhlYWRlcnMsIGJvZHk6IHJlcXVlc3RCb2R5IH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgZnJvbSBCaWdPIENhbGMgRW5kcG9pbnQ6XCIsIGRhdGEpXG5cbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIGFjdGlvbjogXCJ1cGRhdGVQb3B1cFwiLFxuICAgICAgICAgIHN1Ym1pc3Npb25JZDogc3VibWlzc2lvbklkLFxuICAgICAgICAgIHN1Ym1pc3Npb25Db2RlOiBzdWJtaXNzaW9uQ29kZSxcbiAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UsXG4gICAgICAgICAgcmVzdWx0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT5cbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBvc3RpbmcgdG8gQmlnTyBDYWxjIGVuZHBvaW50OlwiLCBlcnJvcilcbiAgICAgIClcbiAgfVxuXG4gIC8vIFN0YXJ0IG9ic2VydmluZyBmb3IgdGhlIHN1Ym1pdCBidXR0b25cbiAgb2JzZXJ2ZUJ1dHRvbkFuZEF0dGFjaExpc3RlbmVyKClcbn0pKClcblxuLy8gY29kZSBmb3Igb2JzZXJ2aW5nIHRoZSBxdWVzdGlvbiBuYW1lIGNoYW5nZWQsIGFzIHNvb24gYXMgdGhlIGRpdiB3aXRoIHNwZWNpZmVkIHRleHQgYXBwZWFycywgaXQgd2lsbCBhbGVydCB0aGUgcXVlc3Rpb24gbmFtZXRoZSBhbGVydCB3aWxsIHByb21wdFxuXG5mdW5jdGlvbiBleHRyYWN0UHJvYmxlbU5hbWUoKSB7XG4gIC8vIEdldCB0aGUgY3VycmVudCBVUkxcbiAgY29uc3QgY3VycmVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgLy8gVXNlIGEgcmVndWxhciBleHByZXNzaW9uIHRvIGV4dHJhY3QgdGhlIHBhcnQgYWZ0ZXIgXCIvcHJvYmxlbXMvXCJcbiAgY29uc3QgcmVnZXggPSAvXFwvcHJvYmxlbXNcXC8oW14vXSspL1xuICBjb25zdCBtYXRjaCA9IGN1cnJlbnRVcmwubWF0Y2gocmVnZXgpXG5cbiAgLy8gSWYgYSBtYXRjaCBpcyBmb3VuZCwgZXh0cmFjdCB0aGUgcHJvYmxlbSBuYW1lXG4gIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgIGxldCBwcm9ibGVtTmFtZSA9IG1hdGNoWzFdLnJlcGxhY2UoLy0vZywgXCIgXCIpIC8vIFJlcGxhY2UgaHlwaGVucyB3aXRoIHNwYWNlc1xuXG4gICAgLy8gVHJpbSBhbnkgbGVhZGluZyBvciB0cmFpbGluZyB3aGl0ZXNwYWNlXG4gICAgcHJvYmxlbU5hbWUgPSBwcm9ibGVtTmFtZS50cmltKClcbiAgICAvLyBhbGVydChwcm9ibGVtTmFtZSlcbiAgICAvLyBJZiBhIHZhbGlkIHByb2JsZW0gbmFtZSBleGlzdHMsIG1ha2UgdGhlIEFQSSBjYWxsXG4gICAgaWYgKHByb2JsZW1OYW1lKSB7XG4gICAgICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9sZWV0LWNvZGUtZXh0ZW5zaW9uLWNvbXBhbnlkYXRhLnZlcmNlbC5hcHAvY29tcGFueUluZm9TdGF0cz90aXRsZT0ke3Byb2JsZW1OYW1lfWBcblxuICAgICAgLy8gTWFrZSB0aGUgQVBJIGNhbGwgdXNpbmcgZmV0Y2hcbiAgICAgIGZldGNoKGFwaVVybClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgLy8gTG9nIHRoZSByZXNwb25zZSBkYXRhIHRvIHRoZSBjb25zb2xlXG4gICAgICAgICAgY29uc29sZS5sb2coXCJBUEkgUmVzcG9uc2U6XCIsIGRhdGEuY29tcGFueSlcbiAgICAgICAgIFxuICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIGFjdGlvbjogXCJzZW5kQ29tcGFueU5hbWVzXCIsXG4gICAgICAgICAgICByZXN1bHQ6IGRhdGEuY29tcGFueVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyb3IpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJvYmxlbSBuYW1lIGlzIGVtcHR5IGFmdGVyIGNsZWFuaW5nLlwiKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIk5vIHByb2JsZW0gaW4gVVJMXCIpXG4gIH1cbn1cblxuLy8gTGlzdGVuIGZvciBjaGFuZ2VzIGluIHRoZSBVUkwgKHdoZW4gdGhlIHBhZ2UgaXMgbmF2aWdhdGVkIHRvIGEgbmV3IHByb2JsZW0pXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGV4dHJhY3RQcm9ibGVtTmFtZSlcblxuLy8gRXh0cmFjdCB0aGUgcHJvYmxlbSBuYW1lIHdoZW4gdGhlIHNjcmlwdCBpcyBmaXJzdCBsb2FkZWRcbmV4dHJhY3RQcm9ibGVtTmFtZSgpXG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC4wNjZjNjhiNi5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);