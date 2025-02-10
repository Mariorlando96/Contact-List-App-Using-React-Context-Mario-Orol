const API_URL = "https://playground.4geeks.com/contact/";
const AGENDA_SLUG = "marioorol"; // Unique agenda name

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      // Check if agenda exists, if not, create it
      checkOrCreateAgenda: async () => {
        try {
          const response = await fetch(`${API_URL}agendas/${AGENDA_SLUG}`);
          if (response.status === 404) {
            // Agenda does not exist, create it
            console.log("Agenda does not exist, creating it...");
            const createResponse = await fetch(
              `${API_URL}agendas/${AGENDA_SLUG}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug: AGENDA_SLUG }),
              }
            );
            if (createResponse.ok) {
              console.log("Agenda successfully created!");
            } else {
              console.error(
                "Error creating agenda:",
                await createResponse.text()
              );
            }
          } else if (response.ok) {
            console.log("Agenda already exists.");
          } else {
            console.error("Error checking agenda:", response.statusText);
          }
          getActions().loadContacts();
        } catch (error) {
          console.error("Error checking/creating agenda:", error);
        }
      },

      // Fetch contacts from the agenda
      loadContacts: async () => {
        try {
          const response = await fetch(`${API_URL}agendas/${AGENDA_SLUG}`);
          const data = await response.json();
          setStore({ contacts: data.contacts });
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      },

      // Add a new contact to the agenda
      addContact: async (contact) => {
        try {
          const response = await fetch(
            `${API_URL}agendas/${AGENDA_SLUG}/contacts`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                address: contact.address,
              }),
            }
          );
          if (response.ok) {
            getActions().loadContacts();
          }
        } catch (error) {
          console.error("Error adding contact:", error);
        }
      },

      // Edit an existing contact
      editContact: async (id, contact) => {
        try {
          const response = await fetch(
            `${API_URL}agendas/${AGENDA_SLUG}/contacts/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                address: contact.address,
              }),
            }
          );
          if (response.ok) {
            getActions().loadContacts(); // Reload the contact list
            return true;
          } else {
            console.error("Error editing contact:", await response.text());
            return false;
          }
        } catch (error) {
          console.error("Error editing contact:", error);
          return false;
        }
      },

      // Delete a contact
      deleteContact: async (id) => {
        try {
          const response = await fetch(
            `${API_URL}agendas/${AGENDA_SLUG}/contacts/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            getActions().loadContacts();
            return true;
          } else {
            console.error("Failed to delete contact:", await response.text());
            return false; // Return failure if the response is not ok
          }
        } catch (error) {
          console.error("Error deleting contact:", error);
          return false;
        }
      },
    },
  };
};

export default getState;
