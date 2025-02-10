import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoBaby from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const success = await actions.deleteContact(contact.id);
    setShowModal(false);
  };

  return (
    <>
      {/* Contact Card */}
      <div className="card shadow-sm">
        <div className="row">
          {/* Image Section */}
          <div className="col-md-2 d-flex justify-content-center align-items-center">
            <img
              src={rigoBaby}
              alt={contact.name}
              className="img-fluid rounded-circle p-2"
            />
          </div>

          {/* Contact Details Section */}
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{contact.name}</h5>
              <p className="card-text">
                <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                {contact.address}
              </p>
              <p className="card-text">
                <i className="fas fa-phone me-2 text-secondary"></i>
                {contact.phone}
              </p>
              <p className="card-text">
                <i className="fas fa-envelope me-2 text-secondary"></i>
                {contact.email}
              </p>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="col-md-2 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate(`/add/${contact.id}`)} // Pass the contact ID in the URL
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {contact.name}?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;
