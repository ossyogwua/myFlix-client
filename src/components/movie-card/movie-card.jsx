//import React from "react";
import PropTypes from 'prop-types';
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie, token, setUser, user }) => {
      

    useEffect(() => {
        if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
          setIsFavorite(true);
        }
      }, [user]);
    
      const addFavoriteMovie = () => {
        fetch(
          `https://myflix-922o.onrender.com/users/${user.name}/movies/${movie._id}`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` } }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log("Failed to add fav movie");
            }
          })
          .then((user) => {
            if (user) {
              alert("successfully added to favorites");
              localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
              setIsFavorite(true);
            }
          })
          .catch((error) => {
            alert(error);
          });
      };
    
      const removeFavoriteMovie = () => {
        fetch(
          `https://myflix-922o.onrender.com/users/${user.name}/movies/${movie._id}`,
          { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert("Failed");
            }
          })
          .then((user) => {
            if (user) {
              alert("successfully deleted from favorites");
              localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
              setIsFavorite(false);
            }
          })
          .catch((error) => {
            alert(error);
          });
      };
    
    return (
        <Card className="h-100 mt-5 card-shadow">
                <Card.Img variant="top card-img" src={movie.ImagePath} />
                <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button varient="link">Open</Button>
                    
                     </Link>
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
    onMovieClick: PropTypes.func.isRequired
};