export default () => ({
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  encryption: {
    jwt_secret: process.env.JWT_SECRET,
  },
  rmq: {
    url: process.env.RMQ_URL,
    queue: 'mails',
  },
  mail: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: process.env.REFRESH_TOKEN,
    email: process.env.EMAIL,
  },
});
