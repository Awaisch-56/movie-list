"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const buttonStyle = {
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
  };

  const handleOnCreateAccount = () => {
    router.push("/Register");
  };

  const handleOnLogin = () => {
    router.push("/login");
  };

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
      <Button sx={buttonStyle} onClick={handleOnCreateAccount}>
        Create Account
      </Button>

      <Button sx={buttonStyle} onClick={handleOnLogin}>
        Login
      </Button>
    </Box>
  );
};

export default HomePage;
