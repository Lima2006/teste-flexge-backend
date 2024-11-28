const { Router } = require("express");
const LoginController = require("./controllers/login-controller");
const CompanyController = require("./controllers/company-controller");

const routes = Router();

// Login
routes.post("/login", LoginController.login);

// Company
routes.post("/companies", CompanyController.store);
routes.get("/companies", CompanyController.index);
routes.get("/companies/:id", CompanyController.show);
routes.get("/companies/:id", CompanyController.show);
routes.put("/companies/:id", CompanyController.update);
routes.delete("/companies/:id", CompanyController.destroy);

module.exports = routes;
