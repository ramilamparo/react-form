"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var lodash_1 = __importDefault(require("lodash"));
var _1 = require(".");
exports.Field = function (_a) {
    var children = _a.children, name = _a.name, defaultValue = _a.defaultValue;
    return (react_1.default.createElement(_1.FormContext.Consumer, null, function (_a) {
        var values = _a.values, setFieldValue = _a.setFieldValue, setTouchedField = _a.setTouchedField, errors = _a.errors, touchedFields = _a.touched, disabledFields = _a.disabled;
        var value = lodash_1.default.get(values, name);
        var error = lodash_1.default.get(errors, name);
        var touched = lodash_1.default.get(touchedFields, name);
        var disabled = lodash_1.default.get(disabledFields, name);
        var childProps = {
            value: value === undefined ? defaultValue : value,
            setFieldValue: function (value) { return setFieldValue(name, value); },
            onBlur: function () { return setTouchedField(name); },
            error: error,
            values: values,
            errors: errors,
            touched: touched,
            touchedFields: touchedFields,
            disabled: disabled,
            disabledFields: disabledFields
        };
        return children(childProps);
    }));
};
