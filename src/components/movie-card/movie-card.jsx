import React from "react";
import PropTypes from 'prop-types';
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
                <Card.Img variant="top card-img" src={movie.ImagePath} />
                <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodedURIComponent(movie.id)}`}>
                <Button varient="link">Open</Button>
                    
                     </Link>
                </Card.Body>
                
        </Card>
        );
};
    
             
// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string,
        Title: PropTypes.string,        
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};