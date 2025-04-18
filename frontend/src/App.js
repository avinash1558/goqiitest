import React, { useEffect, useState } from "react";
import "./App.css";
import DataTable from "react-data-table-component";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", dob: "" });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:8000/backend/api/users.php"; // Change if needed

  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";

    await fetch(API_URL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    });

    setForm({ name: "", email: "", password: "", dob: "" });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,  // Display serial number as the index + 1
      sortable: false,  // No sorting on serial number column
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => row.dob,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className="App">
      <h2>User Manager</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        {!editId && (
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
        )}
        <input name="dob" value={form.dob} onChange={handleChange} placeholder="DOB" type="date" required />
        <button type="submit">{editId ? "Update" : "Add"} User</button>
      </form>

      {/* DataTable for displaying users */}
      <DataTable
        title="User List"
        columns={columns}
        data={users}
        pagination
        highlightOnHover
      />
    </div>
  );
}

export default App;
