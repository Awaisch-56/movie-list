"use client";
import React from "react";
import { Typography, Box, TextField, Checkbox, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { login } from "../../../../lib/redux/slices/authSlice/authThunk";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.loading);

  const handleLogin = async (data) => {
    await dispatch(login(data));
    let token = localStorage.getItem("token");
    if (token !== null) {
      router.push("/movies-list");
      toast.success("Login Successful");
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      handleLogin(data);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#093545",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: "64px", color: "white", fontWeight: 600 }}>
        Sign in
      </Typography>
      <Box sx={{ mt: 5, width: "300px" }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Email"
            type="email"
            onChange={(event) =>
              formik.setFieldValue("email", event.target.value)
            }
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
            sx={{
              width: "100%",
              border: "1px solid rgba(38, 39, 41, 0.1)",
              backgroundColor: "#224957",
              borderRadius: "10px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "unset",
              },
              "& input": {
                color: "#FFFFFF",
              },
              "& input::placeholder": {
                color: "#FFFFFF",
              },
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}>
              *{formik.errors.email}
            </div>
          )}
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Password"
            sx={{
              width: "100%",
              border: "1px solid rgba(38, 39, 41, 0.1)",
              backgroundColor: "#224957",
              borderRadius: "10px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "unset",
              },
              "& input": {
                color: "#FFFFFF",
              },
              "& input::placeholder": {
                color: "#FFFFFF",
              },
            }}
            type="password"
            onChange={(event) =>
              formik.setFieldValue("password", event.target.value)
            }
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}>
              *{formik.errors.password}
            </div>
          )}
        </Box>
      </Box>
      {/* <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Checkbox
          sx={{
            "& .MuiCheckbox-root": {
              borderRadius: "10px",
              border: "none",
            },
          }}
        />
        <Typography sx={{ color: "#FFFFFF" }}>Remember me</Typography>
      </Box> */}
      <Button
        onClick={formik.handleSubmit}
        disabled={isLoading}
        sx={{
          width: "303px",
          borderRadius: "10px",
          backgroundColor: "#2BD17E",
          color: "white",
          mt: 2,
          height: "54px",
          fontSize: "18px",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#2BD17E",
          },
          "&:active": {
            backgroundColor: "#2BD17E8",
          },
        }}
      >
        Login
        {/* {isLoading ? (
          <Image
            src="/loading.svg"
            alt="Loading ..."
            style={{ height: "35px" }}
          />
        ) : (
          "Login"
        )} */}
      </Button>
    </Box>
  );
};

export default LoginForm;
