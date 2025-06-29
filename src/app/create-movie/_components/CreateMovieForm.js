"use client";
import React from "react";
import { useState } from "react";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createMovie } from "../../../../lib/redux/slices/movieSlice/movieThunk";

const CreateMovieForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [enableButton, setEnableButton] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

 const handleSubmitButton = async (data) => {
  setEnableButton(false);

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("year", data.year);
  formData.append("image", data.image);

  try {
    const result = await dispatch(createMovie(formData));

    if (createMovie.fulfilled.match(result)) {
      toast.success("Movie Created Successfully");
    } else {
      toast.warn("Server not responding, displaying static movies.");
    }

    router.push("/movies-list");
  } catch (error) {
    toast.error("Server error. Showing static movie list.");
    router.push("/movies-list");
  } finally {
    setEnableButton(true);
  }
};


  const formik = useFormik({
    initialValues: {
      name: "",
      year: "",
      image: null,
    },
    onSubmit: async (data) => {
      setEnableButton(false);
      handleSubmitButton(data);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Title is required"),
      year: Yup.number().required("Year is required"),
      image: Yup.mixed().required("Image is required"),
    }),
  });

  return (
    <Box>
      <Typography
        sx={{
          fontSize: { lg: "48px", md: "48px", sm: "40px", xs: "32px" },
          fontWeight: 600,
          color: "#FFFFFF",
          padding: { lg: 12, md: 8, sm: 5, xs: 3 },
        }}
      >
        Create a new movie
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 10,
          flexDirection: { lg: "row", md: "row", sm: "coloumn", xs: "column" },
          textAlign: { sm: "center", xs: "center" },
        }}
      >
        <Box sx={{ position: "relative", marginLeft: { lg: 10 } }}>
          {selectedImage ? (
            <>
              <Image src={selectedImage} width={350} height={450} />
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#FFFFFF",
                  backgroundColor: "#2BD17E",
                  "&:hover": {
                    backgroundColor: "#2BD17E",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <label htmlFor="image-upload">
              <Image src="/Group35.png" width={350} height={450} />
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  handleImageChange(event);
                  formik.setFieldValue("image", event.target.files[0]);
                }}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.image && formik.errors.image && (
                <div
                  style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}
                >
                  *{formik.errors.image}
                </div>
              )}
            </label>
          )}
        </Box>
        <Box sx={{ marginRight: { lg: 90 } }}>
          <Box
            sx={{ mb: 2, mt: { lg: "0px", md: "0px", sm: "50px", xs: "50px" } }}
          >
            <TextField
              placeholder="Title"
              sx={{
                width: { lg: "100%", md: "100%", sm: "50%", xs: "80%" },
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
              onChange={(event) =>
                formik.setFieldValue("name", event.target.value)
              }
              onBlur={formik.handleBlur}
              value={formik.values.name}
              required
            />
            {formik.touched.name && formik.errors.name && (
              <div
                style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}
              >
                *{formik.errors.name}
              </div>
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              placeholder="Publishing year"
              sx={{
                width: { lg: "100%", md: "100%", sm: "50%", xs: "80%" },
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
              onChange={(event) =>
                formik.setFieldValue("year", event.target.value)
              }
              onBlur={formik.handleBlur}
              value={formik.values.year}
              required
            />
            {formik.touched.year && formik.errors.year && (
              <div
                style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}
              >
                *{formik.errors.year}
              </div>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: { sm: "center", xs: "center" },
              alignItems: { sm: "center", xs: "center" },
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column-reverse",
              },
            }}
          >
            <Button
              sx={{
                width: { lg: "170px", md: "170px", sm: "25%", xs: "80%" },
                border: "1px solid #FFFFFF",
                borderRadius: "10px",
                backgroundColor: "#2BD17E",
                color: "white",
                mt: 2,
                height: "54px",
                fontSize: "18px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#2BD17E",
                  border: "none",
                },
                "&:active": {
                  backgroundColor: "#2BD17E8",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              sx={{
                width: { lg: "170px", md: "170px", sm: "25%", xs: "80%" },
                border: "1px solid #FFFFFF",
                borderRadius: "10px",
                backgroundColor: "#2BD17E",
                color: "white",
                mt: 2,
                height: "54px",
                fontSize: "18px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#2BD17E",
                  border: "none",
                },
                "&:active": {
                  backgroundColor: "#2BD17E8",
                },
              }}
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateMovieForm;
