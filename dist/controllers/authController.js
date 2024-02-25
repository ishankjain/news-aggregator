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
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const AuthError_1 = __importDefault(require("../constants/AuthError"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const newUser = yield (0, authService_1.registerUser)(username, email, password);
        res
            .status(HttpStatusCode_1.default.CREATED)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        if (error === AuthError_1.default.USER_ALREADY_EXISTS) {
            res
                .status(HttpStatusCode_1.default.CONFLICT)
                .json({ message: "User already exists" });
        }
        else {
            console.error(error);
            res
                .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to register user" });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield (0, authService_1.loginUser)(email, password);
        res.status(HttpStatusCode_1.default.OK).json({ message: "Login successful", token });
    }
    catch (error) {
        switch (error) {
            case AuthError_1.default.USER_NOT_FOUND:
                res.status(HttpStatusCode_1.default.NOT_FOUND).json({ error: "User not found" });
                break;
            case AuthError_1.default.INVALID_CREDENTIALS:
                res
                    .status(HttpStatusCode_1.default.UNAUTHORIZED)
                    .json({ error: "Invalid credentials" });
                break;
            default:
                console.error(error);
                res
                    .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
                    .json({ error: "Failed to login" });
                break;
        }
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map