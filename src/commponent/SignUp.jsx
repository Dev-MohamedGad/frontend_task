import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    skills: Yup.array()
      .of(Yup.string())
      .required("At least one skill is required"),
    phoneNumbers: Yup.array()
      .of(Yup.string())
      .required("At least one phone number is required"),
  });

  const handleSignUp = async (values, { setSubmitting ,resetForm  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signUp",
        values
      );
      console.log(response.data);
      alert("Sign up successful!");
      resetForm(); 
    } catch (error) {
      if (error.response) {
        alert(`${error.response.data.message} `);
      } else {
        console.error("Error setting up the request:", error.message);
        alert("An error occurred. Please try again later.");
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="form-container sign-up">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            skills: [""],
            phoneNumbers: [""],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error" />
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
              <FieldArray name="skills">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.skills.map((_, index) => (
                      <div key={index}>
                        <Field name={`skills[${index}]`} />
                        <button type="button" onClick={() => remove(index)}>
                          Remove Skill
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")}>
                      Add Skill
                    </button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="phoneNumbers">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.phoneNumbers.map((_, index) => (
                      <div key={index}>
                        <Field name={`phoneNumbers[${index}]`} />
                        <button type="button" onClick={() => remove(index)}>
                          Remove Phone Number
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")}>
                      Add Phone Number
                    </button>
                  </div>
                )}
              </FieldArray>
              <button type="submit" disabled={isSubmitting}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUp;
