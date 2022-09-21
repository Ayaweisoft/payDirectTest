const env = process.env.NODE_ENV;

const environments = {
  development: require("./env/dev.env.json"),
  production: {
    APP_NAME: "alicat",
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: "alicat_jwt_secret",
    BCRYPT_SALT: process.env.BCRYPT_SALT || 10,
    "INTERSWITCH_CLIENT_ID": "IKIAE3A9C4B0B922DE4397187E78541AF54C1B744381",
    "INTERSWITCH_SECRET_KEY": "dDdZgbSx/CxLE9Vcwgcem2vsgIp3udH36uFF8xGrU5w=",
    "INTERSWITCH_AT_BASE_URL": "passport.interswitchng.com",
    "INTERSWITCH_PV_BASE_URL": "webpay.interswitchng.com",
    
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
