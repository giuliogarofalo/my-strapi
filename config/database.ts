import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    mysql: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool(
            'DATABASE_SSL_REJECT_UNAUTHORIZED',
            true
          ),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    mysql2: {
      connection: {
        host: env('MY2_DATABASE_HOST', 'localhost'),
        port: env.int('MY2_DATABASE_PORT', 3306),
        database: env('MY2_DATABASE_NAME', 'strapi'),
        user: env('MY2_DATABASE_USERNAME', 'strapi'),
        password: env('MY2_DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('MY2_DATABASE_SSL', false) && {
          key: env('MY2_DATABASE_SSL_KEY', undefined),
          cert: env('MY2_DATABASE_SSL_CERT', undefined),
          ca: env('MY2_DATABASE_SSL_CA', undefined),
          capath: env('MY2_DATABASE_SSL_CAPATH', undefined),
          cipher: env('MY2_DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool(
            'DATABASE_SSL_REJECT_UNAUTHORIZED',
            true
          ),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env('PG_DATABASE_URL'),
        host: env('PG_DATABASE_HOST', 'localhost'),
        port: env.int('PG_DATABASE_PORT', 5432),
        database: env('PG_DATABASE_NAME', 'strapi'),
        user: env('PG_DATABASE_USERNAME', 'strapi'),
        password: env('PG_DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('PG_DATABASE_SSL', false) && {
          key: env('PG_DATABASE_SSL_KEY', undefined),
          cert: env('PG_DATABASE_SSL_CERT', undefined),
          ca: env('PG_DATABASE_SSL_CA', undefined),
          capath: env('PG_DATABASE_SSL_CAPATH', undefined),
          cipher: env('PG_DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool(
            'PG_DATABASE_SSL_REJECT_UNAUTHORIZED',
            true
          ),
        },
        schema: env('PG_DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('PG_DATABASE_POOL_MIN', 2), max: env.int('PG_DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          '..',
          env('DATABASE_FILENAME', 'data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
