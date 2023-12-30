import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Card } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const MovieView = ({
  movies,
  addFavoriteMovie,
  removeFavoriteMovie,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const selectedMovie = movies.find((movie) => movie._id === movieId);
  const similarMovies = movies.filter((movie) => {
    return (
      movie._id !== movieId && movie.Genre.Name === selectedMovie.Genre.Name
    );
  });
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user, movie);

  return (
    <Row className="justify-content-md-center one-movie--view " flex="1">
      <Col md={6} className="col-12">
        <img
          src={movie.ImagePath}
          alt="movie cover"
          className="movie-view-img"
        />
      </Col>
      <Col md={6} className="col-12">
        <div className="movie-view-text-Title">
          <span className="h6">Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div className="movie-view-text-Director">
          <span className="h6">Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div className="movie-view-text-Genre">
          <span className="h6">Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div className="movie-view-text-Description">
          <span className="h6">Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div className="btn-container">
          <div>
            {user.FavoriteMovies.includes(movie._id) ? (
              <Button
                className="fav-button"
                on
                onClick={() => removeFavoriteMovie(movie._id)}
              >
                <FaHeart />
              </Button>
            ) : (
              <Button
                className="fav-button"
                onClick={() => addFavoriteMovie(movie._id)}
              >
                <FaRegHeart />
              </Button>
            )}
          </div>
          <div>
            <Link to={`/`}>
              <button className="back-button" style={{ cursor: "pointer" }}>
                Back
              </button>
            </Link>
          </div>
          <div>
            <h2>Similar Movies</h2>
            <Row className="justify-content-center">
              {similarMovies.length !== 0 ? (
                similarMovies
                  .slice(0, 5)
                  .map((movie) => (
                    <Col
                      sm={5}
                      md={4}
                      lg={3}
                      xl={2}
                      className="mx-2 my-3 col-6 similar-movies-img"
                      key={movie._id}
                    ></Col>
                  ))
              ) : (
                <Col>
                  <p>There are no similar Movies</p>
                </Col>
              )}
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MovieView;
