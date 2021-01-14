"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormState = void 0;
var react_1 = require("react");
var usePrevious_1 = require("./usePrevious");
exports.useFormState = function (_a) {
    var initialValues = _a.values, _b = _a.errors, initialErrors = _b === void 0 ? {} : _b, _c = _a.touched, initialTouched = _c === void 0 ? {} : _c, _d = _a.formErrors, initialFormErrors = _d === void 0 ? [] : _d;
    var _e = react_1.useState(initialValues), values = _e[0], setValues = _e[1];
    var previousValues = usePrevious_1.usePrevious(values);
    var _f = react_1.useState(initialErrors), errors = _f[0], setErrors = _f[1];
    var previousErrors = usePrevious_1.usePrevious(errors);
    var _g = react_1.useState(initialTouched), touched = _g[0], setTouched = _g[1];
    var previousTouched = usePrevious_1.usePrevious(touched);
    var _h = react_1.useState(initialFormErrors), formErrors = _h[0], setFormErrors = _h[1];
    var previousFormErrors = usePrevious_1.usePrevious(formErrors);
    var hasErrors = Object.keys(errors).length > 0;
    return {
        values: values,
        setValues: setValues,
        errors: errors,
        setErrors: setErrors,
        touched: touched,
        setTouched: setTouched,
        formErrors: formErrors,
        setFormErrors: setFormErrors,
        hasErrors: hasErrors,
        previousValues: previousValues,
        previousErrors: previousErrors,
        previousTouched: previousTouched,
        previousFormErrors: previousFormErrors
    };
};
