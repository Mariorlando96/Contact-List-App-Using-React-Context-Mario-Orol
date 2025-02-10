import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const AddContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // If editing, load the existing contact details
  useEffect(() => {
    if (id) {
      const existingContact = store.contacts.find(
        (contact) => contact.id === parseInt(id)
      );
      if (existingContact) {
        setContact({
          name: existingContact.name, // Ensure field names match the form
          phone: existingContact.phone,
          email: existingContact.email,
          address: existingContact.address,
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Edit contact
      const success = await actions.editContact(id, contact);
      if (success) alert("Contact updated successfully!");
    } else {
      // Add new contact
      await actions.addContact(contact);
      alert("Contact added successfully!");
    }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1>{id ? "Edit Contact" : "Add Contact"}</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            className="form-control"
            type="text"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            className="form-control"
            type="text"
            id="address"
            name="address"
            value={contact.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {id ? "Update Contact" : "Add Contact"}
          </button>
          <Link to="/" className="btn btn-secondary">
            Go Back to Contact
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
