const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);
    app.get("/api/user/:id", authenticate, UserController.getuser)
    app.get("/api/users", authenticate, UserController.getusers);
};
