import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([
    ]);

    const [selectedMovie, setSelectedMovies] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }
        
        fetch("https://myflix-922o.onrender.com/movies",
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => response.json())
            .then((movies) => {
                console.log(movies);
                const moviesFromApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: { Name: movie.Genre.Name },
                        Director: { Name: movie.Director.Name }
                            
                                
                    };
                });
                setMovies(moviesFromApi);
            });
    

    }, [token]);
            
    

    return (
        <Row className="margin-top-custom justify-content-center">
            !user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                or
                <SignupView />
                </Col>
                    
            
        ) :
            selectedMovie ? (
                <Col md={8}>
                    
                    <button
                        onClick={() => {
                            setUser(null); setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </button>

                    <MovieView
                        style={{ border: "1px solid blue" }}
                            movie={selectedMovie} onBackClick={() => setSelectedMovies(null)}
                            token={token}
                />
            </Col>
            
            ) : movies.length === 0 ? (
                <div>No results Found!</div>
            ) : (
        
                
                        {movies.map((movie) => (
                            <Col className="mb-4"key={movies.id}md={3}>
                                <MovieCard
                                    movie={movies}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovies(newSelectedMovie);
                                    }} />
                            </Col>
                        ))}
        
         )
                    </Row >
                    );
                };
