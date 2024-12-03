const ContractModel = require("../models/contract-model");
const CompanyModel = require("../models/company-model");

class ContractController {
  async store(req, res) {
    const { company } = req.body;
    try {
      const companyExists = await CompanyModel.findById(company);
      if (!companyExists) {
        return res.status(404).json({ message: "Company not found" });
      }

      const createdContract = await ContractModel.create(req.body);

      res.status(200).json(createdContract);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async index(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "asc",
        documentNumber,
        socialReason,
        company,
      } = req.query;

      // Search filters
      const search = {};
      if (documentNumber) {
        search.documentNumber = { $regex: documentNumber, $options: "i" };
      }
      if (socialReason) {
        search.socialReason = { $regex: socialReason, $options: "i" };
      }
      if (company) {
        search.company = company;
      }

      const contracts = await ContractModel.find(search)
        .populate("company", "name")
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await ContractModel.countDocuments();

      res.status(200).json({ contracts, total });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const contract = await ContractModel.findById(id);

      if (!contract) {
        return res.status(404).json({ message: "Contract doesn't exists" });
      }

      res.status(200).json(contract);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const contract = await ContractModel.findById(id);
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }

      Object.assign(contract, req.body);

      await contract.save();
      res
        .status(200)
        .json({ message: "Successfully updated contract", contract });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const contract = await ContractModel.findByIdAndDelete(id);
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      res.status(200).json({ message: "Sucessfully deleted contract" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

module.exports = new ContractController();
