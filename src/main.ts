import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { UserModule } from "./user/user.module"
import { ProductModule } from "./product/product.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix("/api/v1").useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	)
	const options = new DocumentBuilder()
		.setTitle("API")
		.setDescription("API description")
		.setVersion("1.0")
		.addTag("API")
		.build()
	const document = SwaggerModule.createDocument(app, options, {
		include: [UserModule, ProductModule],
	})
	SwaggerModule.setup("api", app, document)

	const PORT = process.env.PORT

	await app.listen(PORT)
}

bootstrap()
