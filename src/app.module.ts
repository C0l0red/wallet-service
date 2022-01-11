import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './users/user.module';
import { ProfileModule } from './profile/profile.module';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    CommonModule, 
    UserModule, 
    ProfileModule, 
    WalletModule, 
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService
    })
  ]
})
export class AppModule {}
