const prisma = require("../config/prisma");

const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        company,
        user_id: req.user.id,
      },
    });

    if (!name) {
      return res.status(400).json({
        message: "Customer name is required",
      });
    }

    res.status(201).json(customer);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createCustomer,
};

const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        user_id: req.user.id,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id: Number(req.params.id),
        user_id: req.user.id,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const customer = await prisma.customer.findFirst({
      where: {
        id: Number(req.params.id),
        user_id: req.user.id,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const updatedCustomer = await prisma.customer.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        email,
        phone,
        company,
      },
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id: Number(req.params.id),
        user_id: req.user.id,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await prisma.customer.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
