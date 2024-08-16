import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    )
    .then(responce => responce.json())
    .then(json => setMovies(json.data.movies));
    setLoading(false);
  }, []);
  console.log(movies); 
  return (
  <div>
    {loading ? <h1>Loading...</h1> : (<div>{movies.map(movie =>
    <div key={movie.id}>
      <h2>{movie.title}</h2>
      <img src={movie.medium_cover_image} />
      <p>{movie.summary}</p>
      <ul>
        {movie.genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      <hr />
    </div>
      )}</div>)}
  </div>
  );
}

export default App;