import React from "react";
import DataTable from "react-data-table-component";

function UserTable({ users, handleEdit, handleDelete }) {
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "80px",
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
        <div className="action-buttons">
          <button onClick={() => handleEdit(row)} className="icon-button">
            <iconify-icon icon="bx:edit" width="24" height="24"></iconify-icon>
          </button>
          <button onClick={() => handleDelete(row.id)} className="icon-button delete">
            <iconify-icon icon="material-symbols:delete" width="24" height="24"></iconify-icon>
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    table:{
      border: '1px solid #ddd',
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        backgroundColor: '#f0f0f0',
        padding: '12px',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        padding: '10px',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #ddd',
        padding: '12px',
      },
    },
  };

  return (
    <DataTable
      title="User List"
      columns={columns}
      data={users}
      pagination
      highlightOnHover
      customStyles={customStyles}
    />
  );
}

export default UserTable;
