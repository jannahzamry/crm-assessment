const prisma = require("../config/prisma");

const createNote = async (req, res) => {
  try {
    const { content } = req.body;

    const customer = await prisma.customer.findFirst({
      where: {
        id: Number(req.params.customerId),
        user_id: req.user.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const note = await prisma.note.create({
      data: {
        content,
        customer_id: customer.id,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getCustomerNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        customer_id: Number(req.params.customerId),
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createNote,
  getCustomerNotes,
};
