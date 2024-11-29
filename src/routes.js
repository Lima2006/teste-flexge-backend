const { Router } = require("express");
const LoginController = require("./controllers/login-controller");
const CompanyController = require("./controllers/company-controller");
const ContractController = require("./controllers/contract-controller");
const authenticateToken = require("./authentication/authenticate-token");

const routes = Router();

// Login
routes.post("/login", LoginController.login);

// Company
routes.post("/companies", authenticateToken, CompanyController.store);
routes.get("/companies", authenticateToken, CompanyController.index);
routes.get("/companies/:id", authenticateToken, CompanyController.show);
routes.put("/companies/:id", authenticateToken, CompanyController.update);
routes.delete("/companies/:id", authenticateToken, CompanyController.destroy);

// Contract
routes.post("/contracts", authenticateToken, ContractController.store);
routes.get("/contracts", authenticateToken, ContractController.index);
routes.get("/contracts/:id", authenticateToken, ContractController.show);
routes.put("/contracts/:id", authenticateToken, ContractController.update);
routes.delete("/contracts/:id", authenticateToken, ContractController.destroy);

module.exports = routes;
