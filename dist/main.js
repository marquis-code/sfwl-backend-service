"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("/api/v1").useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle("API")
        .setDescription("API description")
        .setVersion("1.0")
        .addTag("API")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {
        include: [UserModule, ArticleModule],
    });
    swagger_1.SwaggerModule.setup("api", app, document);
    const PORT = process.env.PORT;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map