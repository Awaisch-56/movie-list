"use client";
import React, { useState } from "react";
import { Typography, Box, TextField, Checkbox, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { register } from "../../../../lib/redux/slices/authSlice/authThunk";

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [enableButton, setEnableButton] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      setEnableButton(false);
      const sortedData = { ...data };
      const userDetails = {
        name: sortedData.name,
        email: sortedData.email,
        password: sortedData.password,
      };
      await dispatch(register(userDetails))
        .unwrap()
        .then((res) => {
          toast.success("Signed up Successfully");
          router.push("/movies-list");
        })
        .catch(() => {
          setEnableButton(true);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(15, "Password should not exceed 15 characters")
        .matches(
          /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).*$/,
          "Password must contain a number, a letter, and a special character"
        )
        .required("Password is required"),
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
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
        Sign Up
      </Typography>
      <Box sx={{ mt: 5, width: "300px" }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Full Name"
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
            name="name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}>
              *{formik.errors.name}
            </div>
          )}
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Email"
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
            type="email"
            name="email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
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
            name="password"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={(e) => formik.setFieldValue("password", e.target.value)}
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
        type="submit"
        disabled={!enableButton}
        onClick={formik.handleSubmit}
      >
        Signup
      </Button>
    </Box>
  );
};

export default RegisterForm;
