"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var lodash_1 = __importDefault(require("lodash"));
exports.FormContext = react_1.createContext({
    values: {},
    setFieldValue: function () { },
    setTouchedField: function () { },
    errors: {},
    touched: {},
    disabled: {}
});
var FormProvider = /** @class */ (function (_super) {
    __extends(FormProvider, _super);
    function FormProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setFieldValue = function (name, value) {
            var newValues = lodash_1.default.set(__assign({}, _this.props.values), name, value);
            var errors = _this.validateForm(newValues);
            _this.props.onChange(newValues, errors, name);
        };
        _this.setTouchedField = function (name) {
            var _a;
            _this.props.onFieldTouch &&
                _this.props.onFieldTouch(__assign(__assign({}, _this.props.touched), (_a = {}, _a[name] = true, _a)), name);
        };
        _this.validateForm = function (values) {
            var _a = _this.props, validation = _a.validation, context = _a.context;
            var errorMessages = {};
            if (validation) {
                errorMessages = validation(values, context);
            }
            return errorMessages;
        };
        return _this;
    }
    FormProvider.prototype.componentDidMount = function () {
        var _a = this.props, validateOnMount = _a.validateOnMount, values = _a.values, onChange = _a.onChange;
        if (validateOnMount) {
            var errors = this.validateForm(values);
            onChange(values, errors);
        }
    };
    FormProvider.prototype.render = function () {
        var _a = this.props, values = _a.values, children = _a.children;
        return (react_1.default.createElement(exports.FormContext.Provider, { value: {
                values: values,
                setFieldValue: this.setFieldValue,
                setTouchedField: this.setTouchedField,
                errors: this.props.errors || {},
                touched: this.props.touched || {},
                disabled: this.props.disabledFields || {}
            } }, children));
    };
    return FormProvider;
}(react_1.Component));
exports.FormProvider = FormProvider;
