"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const secretKey = config_1.default.apiKey;
const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    let token = req.header("Authorization");
    // Check if token is present
    if (!token) {
        return res
            .status(HttpStatusCode_1.default.UNAUTHORIZED)
            .json({ error: "No token, authorization denied" });
    }
    // Split the token string by space (" ") to separate "Bearer" and the token
    [, token] = token.split(" ");
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error(error);
        return res
            .status(HttpStatusCode_1.default.UNAUTHORIZED)
            .json({ error: "Invalid token" });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map