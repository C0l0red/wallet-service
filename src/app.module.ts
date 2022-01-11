import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './users/user.module';
import { ProfileModule } from './profile/profile.module';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [CommonModule, UserModule, ProfileModule, WalletModule, ConfigModule]
})
export class AppModule {}
