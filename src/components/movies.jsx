import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    handleDelete = movie => {
        console.log(movie);
        const movieList = this.state.movies.filter(m=>m._id !== movie._id);
        this.setState({movies:movieList});
    };

    handleLike = (movie)=>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    render() {
        const { length: count } = this.state.movies;

        if (count === 0) return <p>There are no movies in the database.</p>;

        return (
            <div>
                <p className="m-5">Showing {count} movies in the database.</p>
                <table className="table m-5">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th></th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie=>(
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onClick={()=>{this.handleLike(movie)}}
                                    />
                                </td>
                                <td>
                                    <button onClick={()=>{this.handleDelete(movie)}} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        );

    }

}

export default Movies;