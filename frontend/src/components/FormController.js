import React, { useState, useEffect } from "react";

function FormController({ form, editId, handleChange, handleSubmit, handleReset }) {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Function to validate individual fields
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        else if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return "Name can only contain letters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        return "";
      case "password":
        if (!editId && !value.trim()) return "Password is required";
        return "";
      case "dob":
        return value.trim() ? "" : "Date of Birth is required";
      default:
        return "";
    }
  };

  // Function to validate all fields
  const validateAll = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle blur event for each field (when the field loses focus)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      handleSubmit(e);
    }
  };

  // Function to handle form reset
  const onResetClick = () => {
    setErrors({});
    handleReset(); // Reset the form values and editId
  };

  // Reset errors when form or editId changes
  useEffect(() => {
    setErrors({});
  }, [form, editId]);

  return (
    <>
      <h2 className="text-center">User Manager</h2>
      <form onSubmit={onSubmit} className="row mx-0">
        {/* Name Field */}
        <div className="formbox">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control col-12 mb-3 ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="formbox">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control col-12 mb-3 ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password Field */}
        {!editId && (
          <div className="formbox position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control col-12 mb-3 ${errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="input-group-text mb-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <iconify-icon
                  icon={showPassword ? "garden:eye-hide-fill-12" : "mdi:eye"}
                  width="20"
                  height="20"
                ></iconify-icon>
              </span>
            </div>
            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>
        )}

        {/* Date of Birth Field */}
        <div className="formbox">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className={`form-control col-12 mb-3 ${errors.dob ? "is-invalid" : ""}`}
            id="dob"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>

        {/* Submit and Reset Buttons */}
        <div style={{ marginTop: "10px" }} className="p-0 text-center">
          <button type="submit" className="btn btn-primary">
            {editId ? "Update" : "Add"} User
          </button>
          <button
            type="button"
            onClick={onResetClick}
            className="btn btn-secondary"
            style={{ marginLeft: "10px" }}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}

export default FormController;
