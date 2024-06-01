"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let NotificationGateway = class NotificationGateway {
    constructor() {
        this.connectedClients = new Map();
    }
    afterInit(server) {
        console.log('WebSocket Gateway Initialized');
    }
    handleConnection(client, ...args) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.connectedClients.set(userId, client);
        }
    }
    handleDisconnect(client) {
        var _a;
        const userId = (_a = [...this.connectedClients.entries()].find(([_, socket]) => socket.id === client.id)) === null || _a === void 0 ? void 0 : _a[0];
        if (userId) {
            this.connectedClients.delete(userId);
        }
    }
    sendNotification(userId, title, message, data) {
        const client = this.connectedClients.get(userId);
        if (client) {
            client.emit('notification', { title, message, data });
        }
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map