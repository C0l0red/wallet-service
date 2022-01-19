import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ApplicationMode } from '../common/enums/application-mode.enum';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  private readonly env: Record<string, string | undefined> = process.env;

  getValue(key: string, throwIfMissing = true) {
    const value = this.env[key];

    if (!value && throwIfMissing) {
      throw new Error(`${key} missing from environment variables`);
    }

    return value;
  }

  isProduction(): boolean {
    const mode: ApplicationMode = this.getValue('MODE') as ApplicationMode;

    if (mode == ApplicationMode.PRODUCTION) return true;
    else if (mode == ApplicationMode.DEVELOPMENT) return false;
    else throw new Error('Wrong application mode');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),

      entities: ['dist/**/*.entity.{ts,js}'],

      migrationsTableName: 'migration',
      migrations: ['dist/migration/*.{ts,js}'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: false,
    };
  }
}
