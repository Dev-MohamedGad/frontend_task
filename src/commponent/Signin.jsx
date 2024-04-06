import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignIn = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignIn = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        values
      );
      console.log(response.data);
      alert("Sign in successful!");
      resetForm();
    } catch (error) {
      if (error.response) {
        alert("Login failed. Please check your credentials.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert("An error occurred. Please try again later.");
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="form-container sign-in">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1>Sign In</h1>
              <span>or use your email password</span>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error"
              />
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignIn;
