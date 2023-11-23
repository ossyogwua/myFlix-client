import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Love at First Sight",
                image: "https://filmmusicreporter.com/wp-content/uploads/2023/07/va-15-768x585.png",
            director: "Venessa Caswill",
                genre: "Comedy",
            description: "After missing her flight from New York to London, Hadley (Haley Lu Richardson) meets Oliver (Ben Hardy) in a chance encounter at the airport that sparks an instant connection. A long night on the plane together passes in the blink of an eye but upon landing at Heathrow, the pair are separated and finding each other in the chaos seems impossible. Will fate intervene to transform these seat mates into soul mates"
            
        },
        {
            id: 2,
            title: "Woody Woodpecker",
                image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/6tsJ7nIcB5OdoyRS1hOJLwGjpBe.jpg",
            director: "Alex Zamm",
                genre: "Comedy",
            description: "The hyperactive red-headed bird enters a turf war with a big city lawyer wanting to tear down his home in an effort to build a house to flip" 
            
        },
        {
            id: 3,
            title: "Monkey King",
                image: "https://i1.netflixmovies.com/dibsl9ebc/image/upload/w_600,h_891,c_lfill,g_north/p7cj2uzjt8xrkrqmcr6p.jpg",
            director: "Anthony Stacchi",
                genre: "Comedy",
            description: "THE MONKEY KING is an action-packed family comedy that follows a charismatic Monkey and his magical fighting Stick on an epic quest for victory over 100 demons, an eccentric Dragon King, and Monkey's greatest foe of all -his own ego. Along the way, a young village girl challenges his self-centered attitude and shows him that even the smallest pebble can have a big effect on the world." 
            
        }
    ]);

    const [selectedMovie, setSelectedMovies] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedBook(null)} />

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