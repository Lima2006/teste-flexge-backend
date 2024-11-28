const { Router } = require("express");
const companyController = require("./controllers/company-controller");

const routes = Router();

routes.post("/companies", companyController.store);

routes.get("/companies", companyController.index);

routes.get("/companies/:id", companyController.show);

routes.get("/companies/:id", companyController.show);

routes.put("/companies/:id", companyController.update);

routes.delete("/companies/:id", companyController.destroy);

module.exports = routes;
