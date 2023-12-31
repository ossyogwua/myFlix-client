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
        </div>
      </Col>
    </Row>
  );
};

export default MovieView;
