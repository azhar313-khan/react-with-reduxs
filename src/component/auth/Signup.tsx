import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import "../Add.css";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required").min(3),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required").min(6),
      confirmPassword: Yup.string()
        .required("Confirm Password is required.")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
    }),
    onSubmit: (values) => {
      console.log("value", values);
      values.id = String(Date.now());
      dispatch(signup(values));
      enqueueSnackbar("Create successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 1000,
      });
      navigate("/login");
    },
  });

  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ textAlign: "center" }}>Signup Page</h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{ margin: "auto", width: "40%" }}
      >
        <div>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>

        <div>
          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "20px" }}
            className="loginBtn"
          >
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
}
