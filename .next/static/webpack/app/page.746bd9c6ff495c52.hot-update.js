"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./Components/CommonFunc.jsx":
/*!***********************************!*\
  !*** ./Components/CommonFunc.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatData: function() { return /* binding */ formatData; }\n/* harmony export */ });\nconst formatData = (data)=>{\n    var _data_Subform;\n    const newData = JSON.parse(JSON.stringify(data));\n    delete newData.Added_Date;\n    delete newData.Added_Time;\n    delete newData.Batch_ID;\n    delete newData.Blend_Approved;\n    delete newData.ID;\n    delete newData.Total;\n    delete newData.Total_Qty_of_P_Sacks_in_Pcs1;\n    const Subform = data === null || data === void 0 ? void 0 : (_data_Subform = data.Subform) === null || _data_Subform === void 0 ? void 0 : _data_Subform.map((item)=>{\n        delete item.ID;\n        delete item.zc_display_value;\n        return item;\n    });\n    newData.Subform = Subform;\n    return newData;\n};\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL0NvbXBvbmVudHMvQ29tbW9uRnVuYy5qc3giLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLGFBQWEsQ0FBQ0M7UUFTQUE7SUFSaEIsTUFBTUMsVUFBVUMsS0FBS0MsS0FBSyxDQUFDRCxLQUFLRSxTQUFTLENBQUNKO0lBQzFDLE9BQU9DLFFBQVFJLFVBQVU7SUFDekIsT0FBT0osUUFBUUssVUFBVTtJQUN6QixPQUFPTCxRQUFRTSxRQUFRO0lBQ3ZCLE9BQU9OLFFBQVFPLGNBQWM7SUFDN0IsT0FBT1AsUUFBUVEsRUFBRTtJQUNqQixPQUFPUixRQUFRUyxLQUFLO0lBQ3BCLE9BQU9ULFFBQVFVLDRCQUE0QjtJQUMzQyxNQUFNQyxVQUFVWixpQkFBQUEsNEJBQUFBLGdCQUFBQSxLQUFNWSxPQUFPLGNBQWJaLG9DQUFBQSxjQUFlYSxHQUFHLENBQUNDLENBQUFBO1FBQ2hDLE9BQU9BLEtBQUtMLEVBQUU7UUFDZCxPQUFPSyxLQUFLQyxnQkFBZ0I7UUFDNUIsT0FBT0Q7SUFDVjtJQUNBYixRQUFRVyxPQUFPLEdBQUdBO0lBQ2xCLE9BQU9YO0FBRVg7QUFLQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9Db21wb25lbnRzL0NvbW1vbkZ1bmMuanN4PzEwNWYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZm9ybWF0RGF0YSA9IChkYXRhKT0+e1xyXG4gICAgY29uc3QgbmV3RGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICBkZWxldGUgbmV3RGF0YS5BZGRlZF9EYXRlXHJcbiAgICBkZWxldGUgbmV3RGF0YS5BZGRlZF9UaW1lXHJcbiAgICBkZWxldGUgbmV3RGF0YS5CYXRjaF9JRFxyXG4gICAgZGVsZXRlIG5ld0RhdGEuQmxlbmRfQXBwcm92ZWRcclxuICAgIGRlbGV0ZSBuZXdEYXRhLklEXHJcbiAgICBkZWxldGUgbmV3RGF0YS5Ub3RhbFxyXG4gICAgZGVsZXRlIG5ld0RhdGEuVG90YWxfUXR5X29mX1BfU2Fja3NfaW5fUGNzMVxyXG4gICAgY29uc3QgU3ViZm9ybSA9IGRhdGE/LlN1YmZvcm0/Lm1hcChpdGVtPT57XHJcbiAgICAgICBkZWxldGUgaXRlbS5JRFxyXG4gICAgICAgZGVsZXRlIGl0ZW0uemNfZGlzcGxheV92YWx1ZVxyXG4gICAgICAgcmV0dXJuIGl0ZW1cclxuICAgIH0pXHJcbiAgICBuZXdEYXRhLlN1YmZvcm0gPSBTdWJmb3JtXHJcbiAgICByZXR1cm4gbmV3RGF0YVxyXG4gICAgXHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgZm9ybWF0RGF0YVxyXG59Il0sIm5hbWVzIjpbImZvcm1hdERhdGEiLCJkYXRhIiwibmV3RGF0YSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIkFkZGVkX0RhdGUiLCJBZGRlZF9UaW1lIiwiQmF0Y2hfSUQiLCJCbGVuZF9BcHByb3ZlZCIsIklEIiwiVG90YWwiLCJUb3RhbF9RdHlfb2ZfUF9TYWNrc19pbl9QY3MxIiwiU3ViZm9ybSIsIm1hcCIsIml0ZW0iLCJ6Y19kaXNwbGF5X3ZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./Components/CommonFunc.jsx\n"));

/***/ })

});