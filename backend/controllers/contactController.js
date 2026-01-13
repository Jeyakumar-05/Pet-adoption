import Contact from "../models/contactModel.js";

export const submitContactForm = async (req, res) => {
  const { name, email, phone, petId, petName, message } = req.body;

  console.log(req.body);

  try {
    const userContact = new Contact({
      name,
      email,
      phone,
      petId,
      petName,
      message,
    });

    const savedContact = await userContact.save();

    res
      .status(201)
      .json({ message: "Form submitted successfully", data: savedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting the form" });
  }
};

// Admin only: list all contact requests
export const getContactRequests = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ data: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching contact requests" });
  }
};
