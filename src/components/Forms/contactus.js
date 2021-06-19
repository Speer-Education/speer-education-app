import React, { useState } from "react";
import emailjs from 'emailjs-com';

export const ContactUsForm = () => {
  const [form, setForm] = useState({
    name: "",
    school: "",
    year: "",
    email: "",
  });

  const submitStayInTouch = async (e) => {
    e.preventDefault();
    console.log(form);

    //Add proper form validation next
    emailjs.send('service_28lmjk8', 'template_4gjnunu', form, 'user_S25sGxPzB9WUatre16GNf')
    .then((result) => {
      console.log(result.text);
      setForm({
        name: "",
        school: "",
        year: "",
        email: "",
      })
    }, (error) => {
      console.log(error.text);
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
    <form className="home-launch__form">
      <div className="home-launch__form-row">
        <input
          type="text"
          placeholder="Name (Optional)"
          name="name"
          value={form.name}
          onChange={handleFormInput}
        />
      </div>
      <div className="home-launch__form-row">
        <input
          type="text"
          placeholder="School (Optional)"
          name="school"
          value={form.school}
          onChange={handleFormInput}
        />
      </div>
      <div className="home-launch__form-row">
        <select name="year" onChange={handleFormInput} value={form.year}>
          <option value defaultValue>
            Year (Optional)
          </option>
          <option value="<9">Younger</option>
          <option value="9">Grade 9/Grade 10</option>
          <option value="10">Grade 10/Year 11</option>
          <option value="11">Grade 11/Year 12</option>
          <option value="12">Grade 12/Year 13</option>
        </select>
      </div>
      <div className="home-launch__form-row">
        <input
          type="email"
          placeholder="Email Address (Required)"
          name="email"
          value={form.email}
          onChange={handleFormInput}
        />
      </div>
      <button
        className="home-launch__form-button"
        type="submit"
        onClick={submitStayInTouch}
      >
        STAY IN TOUCH!
      </button>
    </form>
  );
};
