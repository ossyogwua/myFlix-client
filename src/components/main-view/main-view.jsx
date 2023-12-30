import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view.jsx";
import Row from "react-bootstrap/Row";
import { Col, Form, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovies] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`https://myflix-922o.onrender.com/movies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  //Add Favorite Movie
  const addFavoriteMovie = (id) => {
    fetch(
      `https://myflix-922o.onrender.com/users/${user.Username}/movies/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to add");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  //Remove Favorite Movie
  const removeFavoriteMovie = (id) => {
    fetch(
      `https://myflix-922o.onrender.com/users/${user.Username}/movies/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            elements={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      removeFavoriteMovie={removeFavoriteMovie}
                      addFavoriteMovie={addFavoriteMovie}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <>
                    <Form className="form-inline mt-5 d-flex justify-content-center">
                      <Form.Control
                        className="ms-5 mx-md-0"
                        type="search"
                        id="searchForm"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for ..."
                        aria-label="Search"
                      />
                      <Form.Select
                        className="ms-1 ms-md-3 w-25"
                        aria-label="Default select genre"
                        onChange={(e) => setSelectedGenre(e.target.value)}
                      >
                        <option value="" selected>
                          Search by genre
                        </option>
                        <option value="Comedy Horror">Comedy Horror</option>
                        <option value="Horror">Horror</option>
                        <option value="Musical">Musical</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Thriller">Thriller</option>
                      </Form.Select>
                    </Form>
                    {movies
                      .filter((movie) => {
                        return selectedGenre === ""
                          ? movie
                          : movie.Genre.Name === selectedGenre;
                      })
                      .filter((movie) => {
                        return search === ""
                          ? movie
                          : movie.Title.toLowerCase().includes(
                              search.toLowerCase()
                            );
                      })}
                    ;
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          removeFavoriteMovie={removeFavoriteMovie}
                          addFavoriteMovie={addFavoriteMovie}
                          isFavorite={user.FavoriteMovies.includes(movie._id)}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        removeFavoriteMovie={removeFavoriteMovie}
                        addFavoriteMovie={addFavoriteMovie}
                        setUser={setUser}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
