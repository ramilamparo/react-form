"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = exports.mapContextToFieldChildProps = void 0;
var react_1 = __importDefault(require("react"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var FormProvider_1 = require("./FormProvider");
exports.mapContextToFieldChildProps = function (context, options) {
    var values = context.values, setFieldValue = context.setFieldValue, setTouchedField = context.setTouchedField, errors = context.errors, touchedFields = context.touched, disabledFields = context.disabled;
    var name = options.name, defaultValue = options.defaultValue;
    var value = lodash_get_1.default(values, name);
    var error = lodash_get_1.default(errors, name);
    var touched = lodash_get_1.default(touchedFields, name);
    var disabled = lodash_get_1.default(disabledFields, name);
    var childProps = {
        value: value === undefined ? defaultValue : value,
        setFieldValue: function (newValue) { return setFieldValue(name, newValue); },
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
exports.Field = function (_a) {
    var children = _a.children, name = _a.name, defaultValue = _a.defaultValue;
    return (react_1.default.createElement(FormProvider_1.FormContext.Consumer, null, function (props) {
        return children(exports.mapContextToFieldChildProps(props, {
            name: name,
            defaultValue: defaultValue
        }));
    }));
};
