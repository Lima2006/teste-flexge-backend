const { Router } = require("express");
const LoginController = require("./controllers/login-controller");
const CompanyController = require("./controllers/company-controller");
const authenticateToken = require("./authentication/authenticate-token");

const routes = Router();

// Login
routes.post("/login", LoginController.login);

// Company
routes.post("/companies", authenticateToken, CompanyController.store);
routes.get("/companies", authenticateToken, CompanyController.index);
routes.get("/companies/:id", authenticateToken, CompanyController.show);
routes.get("/companies/:id", authenticateToken, CompanyController.show);
routes.put("/companies/:id", authenticateToken, CompanyController.update);
routes.delete("/companies/:id", authenticateToken, CompanyController.destroy);

module.exports = routes;
