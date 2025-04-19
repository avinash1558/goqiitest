import React, { useState, useEffect } from "react";
import "./App.css";
import FormController from "./components/FormController";
import UserTable from "./components/UserTable";
import Swal from "sweetalert2";

function App() {
  // State to store all users fetched from backend
  const [users, setUsers] = useState([]);

  // Form state to bind input fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  // Track whether we are editing a user (null means we're adding a new user)
  const [editId, setEditId] = useState(null);

  // Backend API endpoint
  const API_URL = "http://localhost:8000/backend/api/users.php";

  // Fetch users from the backend when component mounts
  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  // Load users on initial render
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input field changes and update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission: Add or Edit user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use PUT if editing, POST if adding new
    const method = editId ? "PUT" : "POST";

    const res = await fetch(API_URL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    });

    const data = await res.json();

    // Show error alert if API returns an error (e.g., duplicate email)
    if (data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error,
      });
    } else {
      // Clear form and reset edit state
      setForm({ name: "", email: "", password: "", dob: "" });
      setEditId(null);
      fetchUsers(); // Refresh user list

      // Show success alert
      Swal.fire({
        icon: "success",
        title: editId ? "User Updated!" : "User Added!",
        text: editId
          ? "The user has been updated successfully."
          : "The user has been added successfully.",
      });
    }
  };

  // Handle reset button - show confirmation before clearing form
  const handleReset = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reset the form. All entered data will be cleared.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset form state and edit ID
        setForm({ name: "", email: "", password: "", dob: "" });
        setEditId(null);

        Swal.fire("Reset!", "The form has been reset.", "success");
      }
    });
  };

  // Handle edit button - populate form fields with selected user data
  const handleEdit = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to edit this user. Do you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setForm(user); // Load selected user into form
        setEditId(user.id); // Set editing state
      }
    });
  };

  // Handle delete button - show confirmation and delete user
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user. Do you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Call DELETE API
        await fetch(API_URL, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        fetchUsers(); // Refresh user list after deletion

        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  return (
    <div className="App">
      {/* Form Section */}
      <div className="py-3 row">
        <div className="col-lg-6 col-12 mx-auto formdiv">
          <FormController
            form={form}
            editId={editId}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        </div>
      </div>

      {/* User Table Section */}
      <div className="py-3 row">
        <div className="col-12 col-lg-11 mx-auto">
          <UserTable
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
