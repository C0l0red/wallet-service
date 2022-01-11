import { Injectable } from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm'
import { ApplicationMode } from 'src/common/types/application-mode.enum';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
    constructor (private readonly env: Object = process.env) {}

    getValue(key: string, throwIfMissing: boolean = true) {
        const value = this.env[key];

        if (!value && throwIfMissing) {
            throw new Error(`${key} missing from environment variables`);
        }

        return value;
    }
    
    isProduction(): boolean {
        const mode: ApplicationMode = this.getValue("MODE");

        if (mode == ApplicationMode.PRODUCTION) return true;
        else if (mode == ApplicationMode.DEVELOPMENT) return false;
        else throw new Error("Wrong application mode"); 
    }

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: this.getValue("DB_TYPE"),

            host: this.getValue("DB_HOST"),
            port: parseInt(this.getValue("DB_PORT")),
            username: this.getValue("DB_USER"),
            password: this.getValue("DB_PASSWORD"),
            database: this.getValue("DB_ADDRESS"),

            entities: ["dist/**/*.entity.{ts,js}"],

            migrationsTableName: "migration",
            migrations: ["dist/migration/*.{ts,js}"],

            cli: {
                migrationsDir: "src/migration",
            },

            ssl: this.isProduction(),
        }
    }

}
