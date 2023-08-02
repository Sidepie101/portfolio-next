'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTestimony, deleteTestimony } from "@/store/reducers/testimonyReducer";
import Link from "next/link";
import styles from '/styles/Testimony.module.css';




const TestimoniesPage = () => {
  const dispatch = useDispatch();
  const testimonies = useSelector((state) => state.testimony.testimonies);
  const fieldLabels = {
    fullName: "Full Name",
    companyName: "Company Name",
    email: "Email",
    testimonyText: "Testimony",
  };

  const [state, setState] = useState({
    email: "",
    fullName: "",
    companyName: "",
    testimonyText: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    companyName: "",
    testimonyText: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(
        addTestimony({
          ...state,
          id: testimonies.length + 1,
        })
      );

      setState({
        email: "",
        fullName: "",
        companyName: "",
        testimonyText: "",
      });
    }
  }

  function handleDelete(id) {
    dispatch(deleteTestimony(id));
  }

  function fieldHasError(field) {
    return errors[field] && errors[field] !== "";
  }

  function isFormValid() {
    let isValid = true;

    const fullNameRegex = /^[a-zA-Z\s'.,-]*$/;
    const companyNameRegex = /^.+$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const testimonyRegex = /^.+$/;

    let newErrors = {
      fullName: "",
      companyName: "",
      email: "",
      testimonyText: "",
    };

    function validateField(field, regex, minLength) {
      if (state[field].trim() === "") {
        newErrors[field] = `${fieldLabels[field]} is required`; // Fix the error message here
        isValid = false;
      } else if (!regex.test(state[field])) {
        newErrors[field] = `Invalid ${fieldLabels[field]}`; // Fix the error message here
        isValid = false;
      } else if (state[field].trim().length < minLength) {
        newErrors[field] = `${fieldLabels[field]} must be at least ${minLength} characters long`; // Fix the error message here
        isValid = false;
      }
    }

    switch (true) {
      case state.fullName.trim() === "":
      case !fullNameRegex.test(state.fullName):
      case state.fullName.trim().length < 5:
        validateField("fullName", fullNameRegex, 5);
        break;
      default:
        break;
    }

    switch (true) {
      case state.companyName.trim() === "":
      case !companyNameRegex.test(state.companyName):
      case state.companyName.trim().length < 1:
        validateField("companyName", companyNameRegex, 5);
        break;
      default:
        break;
    }

    switch (true) {
      case state.email.trim() === "":
      case !emailRegex.test(state.email):
        validateField("email", emailRegex);
        break;
      default:
        break;
    }

    switch (true) {
      case state.testimonyText.trim() === "":
      case state.testimonyText.trim().length < 10:
        validateField("testimonyText", testimonyRegex, 10);
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  }

  return (
    <div >
      <div className={styles["form-container"]}>
        <h2 className={styles["form-title"]}>Add Testimony</h2>
        <div className={styles["testimonies-form"]}>
        <form onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="email">
                Email
              </label>
              <input
                className={`${styles["form-input"]} ${
                  fieldHasError("email") ? styles["form-input-error"] : ""
                }`}
                value={state.email}
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
              />
              {fieldHasError("email") && (
                <div className={styles["form-error-msg"]}>{errors.email}</div>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="fullName">
                Full Name
              </label>
              <input
                className={`${styles["form-input"]} ${
                  fieldHasError("fullName") ? styles["form-input-error"] : ""
                }`}
                value={state.fullName}
                onChange={handleChange}
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter full name"
              />
              {fieldHasError("fullName") && (
                <div className={styles["form-error-msg"]}>
                        {errors.fullName}
                </div>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="companyName">
                Company Name
              </label>
              <input
                className={`${styles["form-input"]} ${
                  fieldHasError("companyName") ? styles["form-input-error"] : ""
                }`}
                value={state.companyName}
                onChange={handleChange}
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Enter company name"
              />
              {fieldHasError("companyName") && (
                <div className={styles["form-error-msg"]}>{errors.companyName}</div>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="testimonyText">
                Testimony
              </label>
              <textarea
                className={`${styles["form-textarea"]} ${
                  fieldHasError("testimonyText") ? styles["form-input-error"] : ""
                }`}
                value={state.testimonyText}
                onChange={handleChange}
                name="testimonyText"
                id="testimonyText"
                placeholder="Enter testimony"
              />
              {fieldHasError("testimonyText") && (
                <div className={styles["form-error-msg"]}>{errors.testimonyText}</div>
              )}
            </div>
            <button className={styles["form-btn"]} type="submit">Submit</button>
          </form>

          
        </div>

        <h1 className={styles["testimonies-table-title"]}  > List of Testimonies</h1>
        <table className={styles["testimonies-table"]}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Company Name</th>
              <th>Testimony</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonies.map((testimony) => (
              <tr key={testimony.id}>
                <td>{testimony.email}</td>
                <td>{testimony.fullName}</td>
                <td>{testimony.companyName}</td>
                <td>{testimony.testimonyText}</td>
                <td>
                  <Link href={`/edit-testimony/${testimony.id}`}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(testimony.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        
    </div>
  );
};

export default TestimoniesPage;
