import { useState, useEffect } from "react";
import { Row } from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap/Col';
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
            
    

    return 
    !user ? (
            <Row className="margin-top-custom justify-content-center mb-5">
                <div className="login--view">
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                </div>
                    
                    
                <div className="signup--view hide--signup-or-login">
                    <SignupView />
                </div>
            </Row>
        ) :
            selectedMovie ? (
                <>
                    
                    <button
                        variant="outline-primary"
                        onClick={() => {
                            setUser(null); setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </button>

                    <Row className="justify-content-md-center">
                        <MovieView
                            movie={selectedMovie} onBackClick={() => setSelectedMovies(null)}
                            token={token}
                        />
        
                
                        {movies.map((movie) => (
                            <Col md={3}>
                                <MovieCard
                                    key={movies.id}
                                    movie={movies}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovies(newSelectedMovie);
                                    }} />
                            </Col>
                        ))}
                    </Row>
                </>
            ) : movies.length === 0 ? (
                <div>No results Found!</div>
            ) : (
                <>
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </Button>
                    <Row className="justify-content-md-center home-page--main">
                        {movies.map((movie) => {
                            return (
                                <Col className="mb-5" key={movie.id} md={3}>
                                    <MovieCard
                                        movie={movie}
                                        onMovieClick={(newSelectedMovie) => {
                                            setSelectedMovie(newSelectedMovie);
    
                                        }}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </>
            );
        
            
                        
    };
