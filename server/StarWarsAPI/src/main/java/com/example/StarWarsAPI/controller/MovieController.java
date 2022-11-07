package com.example.StarWarsAPI.controller;

import com.example.StarWarsAPI.model.Movie;
import com.example.StarWarsAPI.service.MovieService;
import com.example.StarWarsAPI.shared.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/movies")
@CrossOrigin(origins = {"http://localhost:3000"})
public class MovieController {

    @Autowired
    MovieService movieService;

    @PostMapping()
    public ResponseEntity<MovieDto> create(@RequestBody MovieDto movieDto){

        Movie m = new Movie();
        m.setTitle(movieDto.getTitle());
        m.setReleaseDate(movieDto.getReleaseDate());
        m.setOpeningText(movieDto.getOpeningText());

        m = movieService.save(m);
        return new ResponseEntity<>(new MovieDto(m), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<MovieDto> getMovie(@PathVariable Long id){

        Movie m = movieService.findOne(id);
        if(m == null){
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return  new ResponseEntity<>(new MovieDto(m), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<MovieDto>> getAllMovies (Pageable page){
        Page<Movie> movies = movieService.findAll(page);
        List<MovieDto> retValue = new ArrayList<>();

        for (Movie movie : movies) {
            retValue.add(new MovieDto(movie));
        }
        return new ResponseEntity<>(retValue, HttpStatus.OK);

    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<MovieDto> update(@RequestBody MovieDto movieDto,@PathVariable Long id){
        Movie m = movieService.findOne(id);
        if(m != null){
            m.setTitle(movieDto.getTitle());
            m.setReleaseDate(movieDto.getReleaseDate());
            m.setOpeningText(movieDto.getOpeningText());
        }

        Movie updatedMovie = movieService.save(m);

        return new ResponseEntity<>(new MovieDto(updatedMovie), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete (@PathVariable Long id) {
        Movie m = movieService.findOne(id);
        if (m != null) {
            movieService.remove(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping
    public  ResponseEntity<List<MovieDto>> deleteAllMovies(Pageable page) {

        Page<Movie> movies = movieService.findAll(page);
        List<MovieDto> retValue = new ArrayList<>();

        for (Movie m : movies ) {
            MovieDto movieDto = new MovieDto(m);
            retValue.add(movieDto);
        }

        movieService.removeAll(retValue);

        return  new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }


}
