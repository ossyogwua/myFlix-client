import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([
    ]);

    const [selectedMovie, setSelectedMovies] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token)
            return;
        
        fetch("https://myflix-922o.onrender.com/movies",
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => response.json())
            .then((movies) => {
                console.log(movies);
            });
    
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
}, [token]);
            };
    

    if (!user) {
        return (
            <>
            <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
        }} />
            or
            <SignupView />
                </>
        );
    }

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
            <button onClick={() => {
                setUser(null); setToken(null);
                localStorage.clear();
            }}>Logout</button>
 
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
