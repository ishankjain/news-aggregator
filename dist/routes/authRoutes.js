"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
// POST /register: Register a new user
router.post("/register", validationMiddleware_1.validateRegistration, authController_1.register);
// POST /login: Log in a user
router.post("/login", validationMiddleware_1.validateLogin, authController_1.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map