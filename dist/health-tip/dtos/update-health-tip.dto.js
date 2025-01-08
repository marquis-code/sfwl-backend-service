"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHealthTipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_health_tip_dto_1 = require("./create-health-tip.dto");
class UpdateHealthTipDto extends (0, mapped_types_1.PartialType)(create_health_tip_dto_1.CreateHealthTipDto) {
}
exports.UpdateHealthTipDto = UpdateHealthTipDto;
//# sourceMappingURL=update-health-tip.dto.js.map