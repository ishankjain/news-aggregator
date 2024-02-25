"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArticleExists = exports.validateUpdatePreferences = exports.validateFetchNewsParams = exports.validateLogin = exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const News_1 = __importDefault(require("../models/News"));
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCode_1.default.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    next();
};
// Middleware function to validate user registration inputs
exports.validateRegistration = [
    (0, express_validator_1.body)("username", "Username is required").notEmpty(),
    (0, express_validator_1.body)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.body)("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    (req, res, next) => {
        validate(req, res, next);
    },
];
// Middleware function to validate user login inputs
exports.validateLogin = [
    (0, express_validator_1.body)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.body)("password", "Password is required").exists(),
    (req, res, next) => {
        validate(req, res, next);
    },
];
// Middleware function to validate query and path parameters for fetching the news
exports.validateFetchNewsParams = [
    (0, express_validator_1.query)("page")
        .optional()
        .toInt()
        .isInt({ min: 1 })
        .withMessage("page must be an integer"),
    (0, express_validator_1.query)("pageSize")
        .optional()
        .toInt()
        .isInt({ min: 1, max: 100 })
        .withMessage("page size must be an integer"),
    (0, express_validator_1.param)("keyword")
        .optional()
        .isString()
        .trim()
        .withMessage("keyword must be a string"),
    (req, res, next) => {
        validate(req, res, next);
    },
];
// Middleware function to validate update preferences request body
exports.validateUpdatePreferences = [
    (0, express_validator_1.body)("categories")
        .optional()
        .isArray()
        .withMessage("Categories must be an array"),
    (0, express_validator_1.body)("categories.*")
        .optional()
        .isString()
        .withMessage("Each category must be a string"),
    (0, express_validator_1.body)("sources").optional().isArray().withMessage("Sources must be an array"),
    (0, express_validator_1.body)("sources.*")
        .optional()
        .isString()
        .withMessage("Each source must be a string"),
    (req, res, next) => {
        validate(req, res, next);
    },
];
// Middleware function to validate the article with the specified id exists
const validateArticleExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.id;
        const article = yield News_1.default.findById(articleId);
        if (!article) {
            return res
                .status(HttpStatusCode_1.default.NOT_FOUND)
                .json({ error: "Article not found" });
        }
        next();
    }
    catch (error) {
        console.error("Error validating article:", error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
});
exports.validateArticleExists = validateArticleExists;
//# sourceMappingURL=validationMiddleware.js.map