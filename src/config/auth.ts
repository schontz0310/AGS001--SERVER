export default {
  jwt: {
    secret: process.env.APP_JWT_SECRET || 'default',
    expiresIn: process.env.APP_JWT_EXPIRES_IN || '1d',
  },

  masterSecret: {
    secret: process.env.MASTER_JWT_SECRET || 'MasterSecret',
    expiresIn: process.env.APP_JWT_EXPIRES_IN || '1d',
  },
};
