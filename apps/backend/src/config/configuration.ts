export const configuration = () => ({
  app: {
    name: process.env.APP_NAME,
    port: process.env.PORT,
  },
  basicAuth: {
    password: process.env.BASIC_AUTH_PASSWORD,
    username: process.env.BASIC_AUTH_USERNAME,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mail: {
    from: process.env.MAIL_FROM,
    host: process.env.MAIL_HOST,
    password: process.env.MAIL_PASSWORD,
    user: process.env.MAIL_USER,
  },
  overtime: {
    mails: process.env.OVERTIME_MAILS,
    standard_hour: process.env.OVERTIME_STANDARD_HOUR,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});
