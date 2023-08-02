'use client'
import styles from '/styles/Testimony.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTestimony } from '@/store/reducers/testimonyReducer';
import { useRouter } from 'next/navigation';

const EditTestimony = ({ params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = params;
  const testimonies = useSelector((state) => state.testimony.testimonies);
  const testimony = testimonies.find((item) => item.id === Number(id));

  const [state, setState] = useState({
    email: '',
    fullName: '',
    companyName: '',
    testimonyText: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    fullName: '',
    companyName: '',
    testimonyText: '',
  });

  useEffect(() => {
    if (testimony) {
      setState(testimony);
    }
  }, [testimony]);

  function handleChange(event) {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(updateTestimony(state, Number(id)));
      router.push('/testimonies');
    }
  }

  function fieldHasError(field) {
    return errors[field] && errors[field] !== '';
  }

  function isFormValid() {
    let isValid = true;

    const fullNameRegex = /^[a-zA-Z\s'.,-]*$/;
    const companyNameRegex = /^.+$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const testimonyRegex = /^.+$/;

    let newErrors = {
      fullName: '',
      companyName: '',
      email: '',
      testimonyText: '',
    };

    function validateField(field, regex, minLength) {
      if (state[field].trim() === '') {
        newErrors[field] = `${fieldLabels[field]} is required`;
        isValid = false;
      } else if (!regex.test(state[field])) {
        newErrors[field] = `Invalid ${fieldLabels[field]}`;
        isValid = false;
      } else if (minLength && state[field].trim().length < minLength) {
        newErrors[field] = `${fieldLabels[field]} must be at least ${minLength} characters long`;
        isValid = false;
      }
    }

    switch (true) {
      case state.fullName.trim() === '':
        validateField('fullName', fullNameRegex, 5);
        break;
      case !fullNameRegex.test(state.fullName):
        validateField('fullName', fullNameRegex, 5);
        break;
      default:
        break;
    }

    switch (true) {
      case state.companyName.trim() === '':
        validateField('companyName', companyNameRegex, 5);
        break;
      case !companyNameRegex.test(state.companyName):
        validateField('companyName', companyNameRegex, 5);
        break;
      default:
        break;
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

  const fieldLabels = {
    fullName: 'Full Name',
    companyName: 'Company Name',
    email: 'Email',
    testimonyText: 'Testimony',
  };

  return (
    <div className={styles['form-container']}>
      <h2 className={styles['form-title']}>Edit Testimony</h2>
      <div className={styles['testimonies-form']}>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="email" className={styles['form-label']}>
              Email
            </label>
            <input
              className={`${styles['form-input']} ${fieldHasError('email') ? styles['form-input-error'] : ''}`}
              value={state.email}
              onChange={handleChange}
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
            />
            {fieldHasError('email') && <div className={styles['form-error-msg']}>{errors.email}</div>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="fullName" className={styles['form-label']}>
              Full Name
            </label>
            <input
              className={`${styles['form-input']} ${fieldHasError('fullName') ? styles['form-input-error'] : ''}`}
              value={state.fullName}
              onChange={handleChange}
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter full name"
            />
            {fieldHasError('fullName') && <div className={styles['form-error-msg']}>{errors.fullName}</div>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="companyName" className={styles['form-label']}>
              Company Name
            </label>
            <input
              className={`${styles['form-input']} ${fieldHasError('companyName') ? styles['form-input-error'] : ''}`}
              value={state.companyName}
              onChange={handleChange}
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Enter company name"
            />
            {fieldHasError('companyName') && <div className={styles['form-error-msg']}>{errors.companyName}</div>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="testimonyText" className={styles['form-label']}>
              Testimony
            </label>
            <textarea
              className={`${styles['form-textarea']} ${fieldHasError('testimonyText') ? styles['form-input-error'] : ''}`}
              value={state.testimonyText}
              onChange={handleChange}
              name="testimonyText"
              id="testimonyText"
              placeholder="Enter testimony"
            />
            {fieldHasError('testimonyText') && <div className={styles['form-error-msg']}>{errors.testimonyText}</div>}
          </div>
          <button className={styles['form-btn']} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditTestimony;
