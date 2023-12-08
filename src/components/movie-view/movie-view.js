import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie);
  return (
    <>
      <Row className="justify-content-md-center one-movie--view " flex="1">
        <Col md={6} className="col-12">
          <img
            src={movie.ImagePath}
            alt="movie cover"
            className="mx-auto w-100"
          />
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
