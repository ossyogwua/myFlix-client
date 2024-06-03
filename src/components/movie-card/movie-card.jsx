import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export const MovieCard = ({
  movie,
  user,
  addFavoriteMovie,
  removeFavoriteMovie,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      isFavorite(true);
    }
  }, [user]);

  return (
    <Card className="h-100 mt-5 card-shadow">
      <Card.Img variant="top card-img" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
        <div className="btn-container">
          <div>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <button className="back-button" style={{ cursor: "pointer" }}>
                Open
              </button>
            </Link>
          </div>
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
        </div>
      </Card.Body>
    </Card>
  );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    // id: PropTypes.string.isRequired,
    image: PropTypes.string,
    Title: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
