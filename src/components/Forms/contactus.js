import React, { useState } from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import emailjs from 'emailjs-com';

//Yup Schema
const contactUsSchema = yup.object().shape({
  name: yup.string(),
  school: yup.string(),
  year: yup.string(),
  email: yup.string().email().required('A valid Email is required'),
})

export const ContactUsForm = ({ mainClassName }) => {

  const [form, setForm] = useState({
    name: "",
    school: "",
    year: "",
    email: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(contactUsSchema)
  });

  const submitStayInTouch = async (data) => {
    console.log(data);

    setLoading(true);

    //Add proper form validation next
    emailjs.send('service_28lmjk8', 'template_4gjnunu', data, 'user_S25sGxPzB9WUatre16GNf')
      .then((result) => {
        console.log(result.text);
        setEmailSent(true);
        setForm({
          name: "",
          school: "",
          year: "",
          email: "",
        })
        setLoading(false);
      }, (error) => {
        console.log(error.text);
        setLoading(false);
      });

    //Comment out backend mail service for now
    // fetch("https://speer-education-dev.web.app/stayintouch", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // }).then(function (response) {
    //   console.log(response);
    //   return response.json();
    // });
  };

  const handleFormInput = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className={`${mainClassName}__form`} onSubmit={handleSubmit(submitStayInTouch)}>
      <div className={`${mainClassName}__form-row`}>
        <input
          type="text"
          {...register('name')}
          placeholder="Name (Optional)"
          name="name"
          value={form.name}
          onChange={handleFormInput}
        />
        <p className={`${mainClassName}__form-error`}>{errors.name?.message}</p>
      </div>
      <div className={`${mainClassName}__form-row`}>
        <input
          type="text"
          {...register('school')}
          placeholder="School (Optional)"
          name="school"
          value={form.school}
          onChange={handleFormInput}
        />
        <p className={`${mainClassName}__form-error`}>{errors.school?.message}</p>
      </div>
      <div className={`${mainClassName}__form-row`}>
        <select {...register('year')} name="year" onChange={handleFormInput} value={form.year} >
          <option value defaultValue>
            Year (Optional)
          </option>
          <option value="<9">Younger</option>
          <option value="9">Grade 9/Grade 10</option>
          <option value="10">Grade 10/Year 11</option>
          <option value="11">Grade 11/Year 12</option>
          <option value="12">Grade 12/Year 13</option>
        </select>
        <p className={`${mainClassName}__form-error`}>{errors.year?.message}</p>
      </div>
      <div className={`${mainClassName}__form-row`}>
        <input
          type="email"
          {...register('email')}
          placeholder="Email Address (Required)"
          name="email"
          value={form.email}
          onChange={handleFormInput}
        />
        <p className={`${mainClassName}__form-error`}>{errors.email?.message}</p>
      </div>
      {emailSent? <p className={`${mainClassName}__form-sent`}>Email was successful. We'll reach out to you soon!</p> : null}
      <button
        className={`${mainClassName}__form-button`}
        type="submit"
        disabled={loading}
      >
        STAY IN TOUCH!
      </button>
    </form>
  );
};
