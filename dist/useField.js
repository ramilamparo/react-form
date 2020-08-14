"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FormProvider_1 = require("./FormProvider");
var utils_1 = require("./utils");
exports.useField = function (name, options) {
    var field = react_1.useContext(FormProvider_1.FormContext);
    var childProps = utils_1.mapContextToFieldChildProps(field, __assign({ name: name }, options));
    return childProps;
};
