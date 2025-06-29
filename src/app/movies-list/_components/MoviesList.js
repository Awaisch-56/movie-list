"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
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

const staticMovies = [
  {
    id: 1,
    name: "The Dark Knight",
    year: 2008,
    image: "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
  },
  {
    id: 2,
    name: "Interstellar",
    year: 2014,
    image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  {
    id: 3,
    name: "Avengers: Endgame",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
  },
  {
    id: 4,
    name: "The Matrix",
    year: 1999,
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 5,
    name: "Parasite",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    id: 6,
    name: "Joker",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 7,
    name: "Ford v Ferrari",
    year: 2019,
    image: "https://image.tmdb.org/t/p/w500/6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg",
  },
  {
    id: 8,
    name: "Tenet",
    year: 2020,
    image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
  },
  {
    id: 9,
    name: "The Shawshank Redemption",
    year: 1994,
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
];

function MoviesList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await dispatch(getMovies());
        const data = response?.payload;
        if (data && data.length > 0) {
          setMovieData(data);
        } else {
          setMovieData(staticMovies);
        }
      } catch (error) {
        console.error("Failed to fetch movies, using static data.", error);
        setMovieData(staticMovies);
      }
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
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {movieData?.length > 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Box sx={{ display: "flex", gap: 2, margin: { lg: 10, md: 8, sm: 5, xs: 1 } }}>
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
            <Box sx={{ display: "flex", gap: 2, margin: { lg: 10, md: 8, sm: 5, xs: 1 } }}>
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
                  alt={movie.name}
                  height={450}
                  src={movie.image}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500, color: "white" }}>
                    {movie.name}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "white" }}>
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
