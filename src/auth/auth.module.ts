import { Module } from "@nestjs/common"

import { UserModule } from "../user/user.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.sevice"
import { WalletModule } from "../wallet/wallet.module"

@Module({
	imports: [UserModule, WalletModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthMoudle {}
