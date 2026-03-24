module.exports = {
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    admin: process.env.ADMIN_EMAIL,
  },
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT,
};
