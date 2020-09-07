const app = require("./app");

// //get correct environmental variables
// env = require("./utils/env");
// env.setEnv();

//connect to database and register schemas
require('./models');



//listen on port
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
    console.log(`IT-Project test backend running on port: ${PORT}`);
});
