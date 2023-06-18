const Server = require("./classes/Express");
const Routes = require("./routes");
const { PORT } = require("./config");

Server.router(Routes).then(async () => {
  Server.listen(PORT);
});
