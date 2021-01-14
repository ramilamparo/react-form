"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
var react_1 = require("react");
exports.usePrevious = function (value) {
    var ref = react_1.useRef();
    react_1.useEffect(function () {
        ref.current = value;
    });
    return ref.current;
};
