import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
config(); // Load environment variables from a .env file

/* 
  TO CREATE A MIGRATION:
  
  $ npm run migration:run     // Run existing migrations
  $ npm run migration:generate // Generate a new migration
*/

// Function to generate TypeORM configuration using values from the ConfigService
export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres', // Database type
  host: configService.get('DB_HOST'), // Database host
  port: +configService.get('DB_PORT'), // Database port
  username: configService.get('DB_USER'), // Database username
  password: configService.get('DB_PASSWORD'), // Database password
  database: configService.get('DB_NAME'), // Database name
  synchronize: false, // Disable auto synchronization
  logging: configService.get("NODE_ENV") !== 'production', // Enable logging in non-production environments
  migrationsTableName: 'migration', // Name of the migrations table
  autoLoadEntities: true, // Automatically load entities
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Path to entities
  migrations: [__dirname + '/../migrations/*.{js,ts}'], // Path to migrations
});

// Export a new DataSource instance configured with the above settings
export default new DataSource(
  typeOrmConfig(new ConfigService()) as DataSourceOptions
);
