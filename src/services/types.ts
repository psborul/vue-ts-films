export interface Movie {
  imdbID: string;
  Year: string;
  Title: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Production: string;
  Plot: string;
}
