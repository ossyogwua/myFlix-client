import PropTypes from 'prop-types';
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
         <div className="position-relative .d-inline-block">
                <Card.Img variant="top card-img" src={movie.ImagePath}/>
                <div>
                </div>
                <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                </Card.Body>
                </div>
        </Card>
        );
};
    
             
// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};