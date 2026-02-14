import Contact from "../models/contactModel.js";
import Pet from "../models/petModel.js";
import { sendAcceptanceEmail, sendRejectionEmail } from "../utils/sendEmail.js";

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

// Admin only: accept adoption request
export const acceptContactRequest = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact request not found" });
    }

    // Send acceptance email
    await sendAcceptanceEmail(
      contact.email,
      contact.petName || "your requested pet",
      contact.name
    );

    // Update pet status to adopted
    if (contact.petId) {
      await Pet.findOneAndUpdate(
        { id: contact.petId },
        { status: "adopted" }
      );
    }

    // Delete the contact from database after sending email
    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({
      message: "Acceptance email sent successfully and request deleted",
      data: contact,
    });
  } catch (error) {
    console.error("Error accepting contact request:", error);
    res.status(500).json({
      message: "Error sending acceptance email",
      error: error.message,
    });
  }
};

// Admin only: reject adoption request
export const rejectContactRequest = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact request not found" });
    }

    // Send rejection email
    await sendRejectionEmail(
      contact.email,
      contact.petName || "the requested pet",
      contact.name
    );

    // Delete the contact from database after sending email
    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({
      message: "Rejection email sent successfully and request deleted",
      data: contact,
    });
  } catch (error) {
    console.error("Error rejecting contact request:", error);
    res.status(500).json({
      message: "Error sending rejection email",
      error: error.message,
    });
  }
};
