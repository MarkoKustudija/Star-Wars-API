package com.example.StarWarsAPI.shared;

import com.example.StarWarsAPI.model.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {

    private  Long id;
    private String title;
    private LocalDate releaseDate;
    private String openingText;

    public MovieDto(Movie m) {
        this.id = m.getId();
        this.title = m.getTitle();
        this.releaseDate = m.getReleaseDate();
        this.openingText = m.getOpeningText();

    }
}
