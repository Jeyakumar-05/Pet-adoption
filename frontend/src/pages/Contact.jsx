import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { submitContactForm } from "../services/api";
import { Toaster, toast } from "sonner";
import butt from "../assests/img/buttthanks.jpg";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [petId, setPetId] = useState("");
  const [petName, setPetName] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (location.state) {
      setPetId(location.state.petId || " ");
      setPetName(location.state.petName || " ");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = { name, email, phone, petId, petName, message };
    console.log(contactData);

    try {
      const result = await submitContactForm(contactData);

      if (result) {
        console.log("Form submitted:", result);
        setMessage(
          "Thank you for your inquiry. We will get back to you shortly."
        );
        setShowConfirmation(true);
        setName("");
        setEmail("");
        setPhone("");
        setPetId("");
        setPetName("");
        setMessage("");
      } else {
        console.error("Error submitting the form");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
            Contact Us
          </h1>

          {/* {showConfirmation && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md"
              role="alert"
            >
              <p>{message}</p>
            </div>
          )} */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-8 transition-shadow hover:shadow-2xl"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Adopt, love, change lives.
              </h2>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition duration-300"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition duration-300"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  className="w-full border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition duration-300"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="petId"
                >
                  Pet ID
                </label>
                <input
                  type="text"
                  id="petId"
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                  required
                  className="w-full border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition duration-300"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="petName"
                >
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  required
                  className="w-full border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition duration-300"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition duration-300"
                />
              </div>
              <Toaster richColors position="top-center" expand={true} />
              <button
                onClick={() => toast.success("Successfully Submitted")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                Submit
              </button>
            </form>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-shadow hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Our Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions or need assistance, feel free to reach
                out to us via the contact form or using the information below:
              </p>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700">Email:</h3>
                <p className="text-gray-600">pawNest@petadoption.com</p>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700">Phone:</h3>
                <p className="text-gray-600">+91 1234567890</p>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700">Address:</h3>
                <p className="text-gray-600">
                  123 Pet Lane, Animal City, PA 12345
                </p>
              </div>
              <h3 className="font-semibold text-gray-700 mb-4">Follow Us:</h3>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  Instagram
                </a>
              </div>

              <div className="flex items-center justify-center mt-6">
                <img src={butt} className=" h-[40%]" alt="thankyou" />
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Visit Us
            </h2>
            <div className="flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5946.644414420531!2d77.06658145027512!3d11.036945940017459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85851693f4a5d%3A0x929165d4884224ee!2sSRI%20SHAKTHI%20INSTITUTE%20OF%20ENGINEERING%20AND%20TECHNOLOGY!5e0!3m2!1sen!2sin!4v1729483939002!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="border rounded-lg shadow-lg"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
