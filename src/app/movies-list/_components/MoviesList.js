"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../../../../lib/redux/slices/authSlice/authSlice";
import { getMovies } from "../../../../lib/redux/slices/movieSlice/movieThunk";

function MoviesList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await dispatch(getMovies());
      console.log("response is ", response);
      setMovieData(response?.payload);
    };

    fetchMovies();
  }, []);

  const handleIconClick = () => {
    router.push("/create-movie");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = "/login";
    // router.push("/login");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {movieData?.length === 0 && (
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
          <Typography
            sx={{ fontSize: "48px", color: "white", fontWeight: 600 }}
          >
            Your movie list is empty
          </Typography>

          <Button
            sx={{
              width: "202px",
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
            onClick={handleIconClick}
          >
            Add a new movie
          </Button>
        </Box>
      )}
      {movieData?.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                margin: { lg: 10, md: 8, sm: 5, xs: 1 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { lg: "48px", md: "40px", sm: "34px", xs: "26px" },
                  color: "#FFFFFF",
                }}
              >
                My movies
              </Typography>
              <AddCircleOutlineIcon
                sx={{
                  color: "#FFFFFF",
                  mt: { lg: 3, md: 2.1, sm: 1.9, xs: 1 },
                  fontSize: "28px",
                  cursor: "pointer",
                }}
                onClick={handleIconClick}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                margin: { lg: 10, md: 8, sm: 5, xs: 1 },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  mt: { lg: 3, md: 2.1, sm: 1.9, xs: 1 },
                }}
              >
                Logout
              </Typography>
              <LogoutIcon
                sx={{
                  color: "#FFFFFF",
                  mt: { lg: 3, md: 2.1, sm: 1.9, xs: 1 },
                  fontSize: "28px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
              maxWidth: "1400px",
              marginBottom: "120px",
            }}
          >
            {movieData?.map((movie) => (
              <Card
                key={movie.id}
                sx={{
                  maxWidth: 300,
                  backgroundColor: "#092C39",
                  borderRadius: "12px",
                  margin: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  alt={movie.title}
                  height={450}
                  width="100%"
                  src={movie.image}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 500, color: "white" }}
                  >
                    {movie.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 400, color: "white" }}
                  >
                    {movie.year}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default MoviesList;
