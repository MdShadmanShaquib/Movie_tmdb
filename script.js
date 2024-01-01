const searchbtn = document.querySelector(".search-btn");
const searchinput = document.querySelector(".search-input");
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTNiZGQyMWE5MGQ1ZWI2ZjFkNTkzMzhiZDVmMWRmOSIsInN1YiI6IjY1OTE3M2VjNmFhOGUwNjE1M2ViNWJmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H6anA9xQv0NL99xGm7r4Y_JUxkWuBcUL1l9eiD-3WxI";


searchbtn.onclick = function () {
  const value = searchinput.value;
  const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
  console.log(value);

  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(json => {
      render(json.results);
    })
    .catch(err => console.error('error:' + err));
};

function render(movielist) {
  const movieListContainer = document.querySelector(".movie-list");
  movieListContainer.innerHTML = "";
  movielist.forEach(movie => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const h1 = document.createElement('h1');
    const releaseDate = document.createElement('strong');
    h1.innerHTML = movie.title;
    div.append(h1);
    releaseDate.innerHTML = movie.release_date;
    div.append(releaseDate);
    p.innerHTML = movie.overview;
    div.append(p);
    if (movie.poster_path) {
      const img = document.createElement('img');
      const imageUrl = `https://image.tmdb.org/t/p/w500//${movie.poster_path}`;
      img.setAttribute('src', imageUrl);
      img.setAttribute("width", 200);
      div.append(img);
    }
    movieListContainer.append(div);
  });
}