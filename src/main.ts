import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { AppModule } from "./app.module";
import { ActivityModule } from "./activity/activity.module";
import { HealthTipsModule } from "./health-tips/health-tips.module";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

const allowedOrigins = configService.get('ALLOWED_ORIGINS') || 
  'http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:5173';

// Enable CORS
app.enableCors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    
    const origins = allowedOrigins.split(',');
    
    // Check if the origin is allowed
    if (origins.indexOf(origin) !== -1 || origins.includes('*')) {
      return callback(null, true);
    } else {
      console.log(`Blocked request from: ${origin}`);
      return callback(null, true); // Still allow for now, but log it
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Disposition'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
})

  app.setGlobalPrefix("/api/v1").useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("API")
    .setDescription("API description")
    .setVersion("1.0")
    .addTag("API")
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [UserModule, ActivityModule, HealthTipsModule],
  });

  SwaggerModule.setup("api", app, document);

  // // Define CORS options
  // const corsOptions: CorsOptions = {
  //   origin: (origin, callback) => {
  //     const whitelist = ['https://www.sfwl.org', 'http://localhost:3000'];
  //     if (!origin || whitelist.includes(origin)) {
  //       // Allow requests with no origin (e.g., mobile apps, Postman) and whitelisted origins
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   allowedHeaders: "Content-Type, Accept, Authorization",
  //   credentials: true, // Allow cookies/auth headers
  // };

  // app.enableCors(corsOptions);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}

bootstrap();
