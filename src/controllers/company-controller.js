const CompanyModel = require("../models/company-model");

class CompanyController {
  async store(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const companyAlreadyExists = await CompanyModel.findOne({ name });
      if (companyAlreadyExists) {
        return res.status(400).json({ message: "This name already exists" });
      }

      const createdCompany = await CompanyModel.create(req.body);

      return res.status(200).json(createdCompany);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create company", error });
    }
  }

  async index(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "asc",
      } = req.query;

      const companies = await CompanyModel.find()
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await CompanyModel.countDocuments();

      return res.status(200).json({ companies, total });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to list companies", error });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const company = await CompanyModel.findById(id);

      if (!company) {
        return res.status(404).json({ message: "Company doesn't exists" });
      }

      return res.status(200).json(company);
    } catch (error) {
      return res.status(404).json({ message: "Failed to list company", error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const companyAlreadyExists = await CompanyModel.findOne({ name });
      if (companyAlreadyExists) {
        return res.status(400).json({ message: "This name already exists" });
      }

      await CompanyModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: "Company updated" });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Failed to update company", error });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const deletedCompany = await CompanyModel.findByIdAndDelete(id);

      if (!deletedCompany) {
        return res.status(404).json({ message: "Company doesn't exists" });
      }

      return res.status(200).json({ message: "Company deleted" });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Failed to delete company", error });
    }
  }
}

module.exports = new CompanyController();
