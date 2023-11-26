import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
    ]);

    const [selectedMovie, setSelectedMovies] = useState(null);

    useEffect(() => {
        fetch("https://myflix-922o.onrender.com")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: movie.id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: { Name: movie.Genre.Name },
                        Director: { Name: movie.Director.Name }
                        
                    };
                });
                setMovies(moviesFromApi);
        })
    })

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />

        );
    }

    if (movies.lenght === 0) {
        return <div>The list is empthy!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovies(newSelectedMovie);
                    }}
                />
            ))}
            
        </div>
    );
};