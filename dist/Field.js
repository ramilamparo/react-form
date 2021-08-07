"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = exports.useContextToFieldChildProps = void 0;
var react_1 = require("react");
var lodash_get_1 = __importDefault(require("lodash.get"));
var FormProvider_1 = require("./FormProvider");
exports.useContextToFieldChildProps = function (context, options) {
    var values = context.values, setFieldValue = context.setFieldValue, setTouchedField = context.setTouchedField, errors = context.errors, touchedFields = context.touched, disabledFields = context.disabled;
    var name = options.name, defaultValue = options.defaultValue;
    var value = react_1.useMemo(function () {
        return lodash_get_1.default(values, name);
    }, [values, name]);
    var error = react_1.useMemo(function () {
        return lodash_get_1.default(errors, name);
    }, [errors, name]);
    var touched = react_1.useMemo(function () {
        return lodash_get_1.default(touchedFields, name) || false;
    }, [touchedFields, name]);
    var disabled = react_1.useMemo(function () {
        return lodash_get_1.default(disabledFields, name) || false;
    }, [disabledFields, name]);
    var onBlur = react_1.useCallback(function () {
        setTouchedField(name);
    }, [setTouchedField, name]);
    var setFieldValueChildProp = react_1.useCallback(function (newValue) { return setFieldValue(name, newValue); }, [setFieldValue, name]);
    var childProps = react_1.useMemo(function () {
        return {
            value: value === undefined ? defaultValue : value,
            setFieldValue: setFieldValueChildProp,
            onBlur: onBlur,
            error: error,
            values: values,
            errors: errors,
            touched: touched,
            touchedFields: touchedFields,
            disabled: disabled,
            disabledFields: disabledFields
        };
    }, [
        defaultValue,
        disabled,
        onBlur,
        error,
        values,
        errors,
        touched,
        disabledFields,
        touchedFields,
        setFieldValueChildProp,
        value
    ]);
    return childProps;
};
exports.Field = function (_a) {
    var children = _a.children, name = _a.name, defaultValue = _a.defaultValue;
    var context = react_1.useContext(FormProvider_1.FormContext);
    var childProps = exports.useContextToFieldChildProps(context, {
        name: name,
        defaultValue: defaultValue
    });
    return children(childProps);
};
