"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var _1 = require(".");
var utils_1 = require("./utils");
exports.Field = function (_a) {
    var children = _a.children, name = _a.name, defaultValue = _a.defaultValue;
    return (react_1.default.createElement(_1.FormContext.Consumer, null, function (props) {
        return children(utils_1.mapContextToFieldChildProps(props, {
            name: name,
            defaultValue: defaultValue
        }));
    }));
};
