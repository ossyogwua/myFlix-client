import PropTypes from 'prop-types';
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
                <Card.Img variant="top card-img" src={movie.ImagePath}/>
                <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                    </Button>
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