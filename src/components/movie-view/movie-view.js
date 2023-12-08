import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick, token }) => {
  const [selectedMovie, setMovie] = useState([]);

  let url = ` https://myflix-922o.onrender.com/movie`;
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const dataFromMovie = {
          id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          Description: movie.Description,
          Genre: { Name: movie.Genre.Name },
          Director: { Name: movie.Director.Name },
        };

        setMovie(dataFromMovie);
      });
  }, []);

  return (
    <>
      <Row className="justify-content-md-center one-movie--view " flex="1">
        <Col md={6} className="col-12">
          <div>
            <img src={movie.ImagePath} />
          </div>
        </Col>
        <Col md={6} className="col-12">
          <div className="movie-view-text-Title">
            <span className="h1">Title: </span>
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
          <button onClick={onBackClick}>Back</button>
        </Col>
      </Row>
    </>
  );
};
