"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
exports.mapContextToFieldChildProps = function (context, options) {
    var values = context.values, setFieldValue = context.setFieldValue, setTouchedField = context.setTouchedField, errors = context.errors, touchedFields = context.touched, disabledFields = context.disabled;
    var name = options.name, defaultValue = options.defaultValue;
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
    return childProps;
};
