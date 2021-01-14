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
exports.useField = void 0;
var react_1 = require("react");
var Field_1 = require("./Field");
var FormProvider_1 = require("./FormProvider");
exports.useField = function (name, options) {
    var field = react_1.useContext(FormProvider_1.getFormContext());
    var childProps = Field_1.mapContextToFieldChildProps(field, __assign({ name: name }, options));
    return childProps;
};
