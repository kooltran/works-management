import React, { useEffect, useState, useRef } from "react";
import { TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import { object, string } from "yup";
import Select from "react-select";
import NotificationDialog from "../../components/NotificationDialog/NotificatinoDialog";

import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
} from "../../actions/profileAction";
import { getProfile } from "../../api/profileAPI";
import { isEmpty } from "../../helpers";
import { useAppContext } from "../../AppContext";
import { useStyles, useHelperTextStyles } from "./Login";
import useAuth from "./useAuth";
import classNames from "classnames";

import S3corp from "../../images/logo.svg";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LoginIcon from "@mui/icons-material/Login";
// import "../Auth/Login.scss";
const Schema = object().shape({
  // name: string().required().min(6, 'Name must be at least 6 characters'),
  email: string()
    .matches(
      /^[a-zA-Z0-9!#$%&''*+/=?^_`{}~@."\-\s]*$/,
      "Please enter valid email address"
    )
    .email("Please enter valid email address")
    .max(64, "Maximum of 64 characters are allowed for Email address")
    .required()
    .label("Email"),
  password: string()
    .required()
    .min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const classes = useStyles();
  const helperTextClasses = useHelperTextStyles();
  const [showAlert, setShowAlert] = useState({});
  const formRef = useRef();
  const {
    data: {
      auth,
      profile: {
        get: { data: profileData = {}, loading, fail },
      },
    },
    dispatch,
  } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);

  console.log(auth?.data?.user?.error_message, "failed");
  const profileOptions =
    profileData?.map((item) => ({
      value: item.email,
      label: item.name,
    })) || [];

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const getProfileList = async () => {
    dispatch(getProfileRequest());

    try {
      const res = await getProfile();
      dispatch(getProfileSuccess(res.data));
    } catch (err) {
      dispatch(getProfileFail(err.response.data.message || err.message));

      setShowAlert({
        type: "error",
        message: err.response.data.message,
      });
    }
  };

  const { submitRegister } = useAuth();

  const handleSubmitRegister = (values) => {
    submitRegister(values);
  };

  const handleChangeName = (option) => {
    const { setFieldValue } = formRef.current;
    if (option) {
      setFieldValue("email", option.value);
      setFieldValue("name", option.label);
    }
  };

  useEffect(() => {
    getProfileList();
  }, []);

  return (
    <div className={classes.body}>
      <Formik
        onSubmit={handleSubmitRegister}
        initialValues={{ email: "", password: "" }}
        validationSchema={Schema}
        innerRef={formRef}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          errors,
          values,
        }) => {
          const checkError = (name) => {
            if (touched[name]) {
              return !!errors[name];
            }
          };
          return (
            <div className={classes.formContainer}>
              <form className={classes.formLogin} onSubmit={handleSubmit}>
                <img className={classes.imgLogin} src={S3corp} alt="S3Login" />

                <div>
                  <Box className={classes.boxChild}>
                    <div>
                      <EmailIcon sx={{ fill: "red", mr: 1, my: 0.5 }} />
                    </div>
                    <TextField
                      fullWidth
                      type="email"
                      id="input-with-sx"
                      name="email"
                      label="Email"
                      defaultValue=""
                      helperText={touched.email && errors.email}
                      FormHelperTextProps={{
                        classes: {
                          root: helperTextClasses.root,
                        },
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="dense"
                      variant="standard"
                    ></TextField>
                  </Box>
                </div>
                <div className={classes.marginComponentChid}>
                  <Box className={classes.boxChild}>
                    <div>
                      <LockIcon sx={{ fill: "#ff7000", mr: 1, my: 0.5 }} />
                    </div>
                    <TextField
                      fullWidth
                      type="password"
                      id="input-with-sx"
                      name="password"
                      label="Password"
                      defaultValue=""
                      helperText={touched.password && errors.password}
                      FormHelperTextProps={{
                        classes: {
                          root: helperTextClasses.root,
                        },
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="dense"
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClick} edge="end">
                              {showPassword ? (
                                <Visibility sx={{ fill: "#1da1f287" }} />
                              ) : (
                                <VisibilityOff sx={{ fill: "#1da1f287" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </Box>
                  <Box>
                    {
                      <div className={classes.textDanger}>
                        {/* <ContactlessIcon className={classes.iconMessage} /> */}
                        {auth?.data?.user?.error_message}
                      </div>
                    }
                  </Box>
                </div>
                <Button
                  color="primary"
                  className={classNames(
                    classes.btnSubmit,
                    classes.marginComponentChid
                  )}
                  type="submit"
                  variant="outlined"
                  disabled={
                    !values.email ||
                    !values.password ||
                    auth.loading ||
                    !isEmpty(errors)
                  }
                >
                  Register
                  <LoginIcon sx={{ marginLeft: "0.7rem", width: "1rem" }} />
                </Button>
              </form>
            </div>
          );
        }}
      </Formik>
      {showAlert.type && (
        <NotificationDialog
          {...showAlert}
          handleCloseDialog={() => {
            setShowAlert({});
          }}
        />
      )}
      <h4>{auth.data?.error_message}</h4>
    </div>
  );
};

export default Register;
