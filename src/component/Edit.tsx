import { useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/userSlice";

interface Row {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

interface State {
  store: {
    rows: Row[];
    searchQuery: string;
    filterStatus: string;
  };
}

// const Edit = ({ rows, setRows }) => {
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues: Row = {
    id: "",
    name: "",
    description: "",
    type: "",
    status: "",
  };

  const rows = useSelector((state: State) => state?.store?.rows);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      type: "",
      status: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      type: Yup.string().required("Type is required"),
      status: Yup.string().required("Status is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      dispatch(update(values));
      enqueueSnackbar("Update successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 1000,
      });
      navigate("/");
    },
  });

  useEffect(() => {
    if (id) {
      const data = rows.find((row) => row.id === id);
      formik.setValues(data || defaultValues);
    }
  }, [id]);

  const typeValue = [
    { value: "Task", label: "Task" },
    { value: "SubTask", label: "SubTask" },
  ];

  const statusType = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{id ? "Update" : "Create"}</h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{ margin: "auto", width: "60%" }}
      >
        <div>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formik?.values?.name}
            onChange={formik.handleChange}
            error={formik?.touched?.name && Boolean(formik?.errors?.name)}
            helperText={formik?.touched?.name && formik?.errors?.name}
          />
        </div>
        <div>
          <FormControl sx={{ mt: 1, width: 1100 }}>
            <InputLabel id="demo-multiple-name-label">Type</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="type"
              value={formik?.values?.type}
              onChange={formik.handleChange}
              error={formik?.touched?.type && Boolean(formik?.errors?.type)}
              onBlur={formik.handleBlur}
              input={<OutlinedInput label="Type" />}
            >
              {typeValue.map((option) => (
                <MenuItem key={option?.value} value={option?.value}>
                  {option?.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched?.type && formik?.errors?.type && (
              <FormHelperText className="textColor">
                {formik?.errors?.type}
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ mt: 1, mb: 1, width: 1100 }}>
            <InputLabel id="demo-multiple-name-label">Status</InputLabel>
            <Select
              name="status"
              value={formik?.values?.status}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              onChange={formik.handleChange}
              error={formik?.touched?.status && Boolean(formik?.errors?.status)}
              onBlur={formik.handleBlur}
              input={<OutlinedInput label="Status" />}
            >
              {statusType.map((opt) => (
                <MenuItem key={opt?.value} value={opt?.value}>
                  {opt?.label}
                </MenuItem>
              ))}
            </Select>
            {formik?.touched?.status && formik?.errors?.status && (
              <FormHelperText className="textColor">
                {formik?.errors?.status}
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div>
          <div>
            <ReactQuill
              theme="snow"
              value={formik?.values?.description}
              onChange={(value) => {
                formik.setFieldValue("description", value); // Update formik field value
              }}
              className={
                formik?.errors?.description ? "quill-editor-error" : ""
              }
            />
            {formik?.touched?.description && formik?.errors?.description && (
              <div className="error-message">{formik?.errors?.description}</div>
            )}
          </div>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
