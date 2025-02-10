import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"; // Ensure the path is correct
import ContactCard from "../component/contactCard"; // Ensure the file name matches exactly
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.selectedAgenda) {
      actions.fetchContacts(); // Fetch contacts for the selected agenda
    }
  }, [actions, store.selectedAgenda]); // Trigger only when selectedAgenda changes

  const handleSubmit = (e) => {
    navigate("/add");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact List</h1>
      <button
        className="btn btn-success btn-lg mb-3 d-flex ms-auto"
        onClick={handleSubmit}
      >
        Add Contact
      </button>
      <div className="row">
        {store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <div className="col-md-12 " key={contact.id}>
              <ContactCard contact={contact} />
            </div>
          ))
        ) : (
          <p className="text-center">No contacts available.</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
