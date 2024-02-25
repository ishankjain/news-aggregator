"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthError;
(function (AuthError) {
    AuthError[AuthError["USER_ALREADY_EXISTS"] = 0] = "USER_ALREADY_EXISTS";
    AuthError[AuthError["USER_NOT_FOUND"] = 1] = "USER_NOT_FOUND";
    AuthError[AuthError["INVALID_CREDENTIALS"] = 2] = "INVALID_CREDENTIALS";
})(AuthError || (AuthError = {}));
exports.default = AuthError;
//# sourceMappingURL=AuthError.js.map