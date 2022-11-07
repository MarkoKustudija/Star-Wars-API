package com.example.StarWarsAPI.service;

import com.example.StarWarsAPI.model.Movie;
import com.example.StarWarsAPI.repository.MovieRepository;
import com.example.StarWarsAPI.shared.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    MovieRepository movieRepository;


    public Movie save(Movie m) {
        return movieRepository.save(m);
    }

    public Movie findOne(Long id) {
        return movieRepository.findById(id).get();
    }

    public Page<Movie> findAll(Pageable page) {
        return movieRepository.findAll(page);
    }

    public void remove(Long id) {
        movieRepository.deleteById(id);
    }

    public void removeAll(List<MovieDto> retValue) {
        movieRepository.deleteAll();
    }
}
