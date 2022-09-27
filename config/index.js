const env = process.env.NODE_ENV;

const environments = {
  development: require("./env/dev.env.json"),
  production: {
    APP_NAME: "alicat",
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: "alicat_jwt_secret",
    BCRYPT_SALT: process.env.BCRYPT_SALT || 10,
    
    role: {
      ADMIN: ["admin"],
      USER: ["user", "admin"],
    },

    url: {
      CLIENT_URL: "",
      BASE_URL: "",
    },
    mailer: {
      HOST: "",
      USER: "",
      PASSWORD: "",
      PORT: "",
      SECURE: "",
      DOMAIN: "",
    },
  },
};

// export config for the current environment
module.exports = environments[env] || environments["production"];
