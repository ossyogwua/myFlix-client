import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
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
          <button
            onClick={onBackClick}
            className="back-button"
            style={{ cursor: "pointer" }}
          >
            Back
          </button>
        </Col>
      </Row>
    </>
  );
};
