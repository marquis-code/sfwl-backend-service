"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix("/api/v1").useGlobalPipes(new common_1.ValidationPipe());
    const options = new swagger_1.DocumentBuilder()
        .setTitle("API")
        .setDescription("API description")
        .setVersion("1.0")
        .addTag("API")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {
        include: [user_module_1.UserModule, product_module_1.ProductModule],
    });
    swagger_1.SwaggerModule.setup("api", app, document);
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    };
    app.enableCors(corsOptions);
    const PORT = process.env.PORT;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map