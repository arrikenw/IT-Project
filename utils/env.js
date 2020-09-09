const setEnv = () => {
  if (process.env.NODE_ENV === "development") {
    require("dotenv").config({ path: `${__dirname}/./../.env.development` });
  } else if (process.env.NODE_ENV === "test") {
    require("dotenv").config({ path: `${__dirname}/./../.env.test` });
  }
};

module.exports.setEnv = setEnv;
