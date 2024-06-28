"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
const role_guard_1 = require("../role/role.guard");
const role_decorator_1 = require("../role/role.decorator");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, role_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard));
}
//# sourceMappingURL=auth.decorator.js.map