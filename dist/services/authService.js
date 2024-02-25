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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const AuthError_1 = __importDefault(require("../constants/AuthError"));
const config_1 = __importDefault(require("../config"));
const saltRounds = 10;
const secretKey = config_1.default.apiKey;
const generateHashedPassword = (password) => {
    return bcrypt_1.default.hash(password, saltRounds);
};
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });
};
const registerUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify user does not already exist
    const existingUser = yield User_1.default.findOne({
        $or: [{ username }, { email }],
    });
    if (existingUser) {
        throw AuthError_1.default.USER_ALREADY_EXISTS;
    }
    const hashedPassword = yield generateHashedPassword(password);
    const newUser = new User_1.default({ username, email, password: hashedPassword });
    return yield newUser.save();
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify user is present
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw AuthError_1.default.USER_NOT_FOUND;
    }
    // Verify password is correct 
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw AuthError_1.default.INVALID_CREDENTIALS;
    }
    return generateToken(user);
});
exports.loginUser = loginUser;
//# sourceMappingURL=authService.js.map