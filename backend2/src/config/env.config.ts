import 'dotenv/config';
import * as joi from 'joi';

export enum Environment {
  local = 'local',
  development = 'development',
  production = 'production',
  test = 'test',
}

export interface IEnvConfig {
  NODE_ENV: Environment;
  NODE_PORT: string;

  DB_URL: string;

  THROTTLER_TTL: number;
  THROTTLER_LIMIT: number;

  JWT_SECRET: string;
  JWT_EXPIRES: string;
}

const validationSchemaConfig = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid(...Object.values(Environment))
      .required(),
    NODE_PORT: joi.string().required(),

    DB_URL: joi.string().required(),

    THROTTLER_TTL: joi.number().required(),
    THROTTLER_LIMIT: joi.number().required(),

    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES: joi.string().required(),
  })
  .unknown(true);

const { error, value } = validationSchemaConfig.validate({
  ...process.env,
});

if (error) throw new Error(`Config validation error: ${error.message}`);

export const envConfig: IEnvConfig = value;
