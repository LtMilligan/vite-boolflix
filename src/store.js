import { reactive } from 'vue';
import axios from 'axios';
// Appoggio per query di ricerca da parte dell'utente e arrey per FILM e SERIE TV trovati tramite chiamate API
const state = reactive({
  query: '',
  movieResults: [],
  seriesResults: [],
});
// Funzione con chiamata axios per la ricerca di FILM con possibile risposta di errore
const searchMovies = async () => {
  if (state.query.length > 2) {
    try {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: '3b0056b0519ca1d0f291f18586b02656',
            query: state.query,
          },
        }
      );
      state.movieResults = movieResponse.data.results;
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
    }
  } else {
    state.movieResults = [];
  }
};
// Funzione con chiamata axios per la ricerca di SERIE TV con possibile risposta di errore
const searchSeries = async () => {
    if (state.query.length > 2) {
      try {
        const seriesResponse = await axios.get(
          `https://api.themoviedb.org/3/search/tv`,
          {
            params: {
              api_key: '3b0056b0519ca1d0f291f18586b02656',
              query: state.query,
            },
          }
        );
        state.seriesResults = seriesResponse.data.results;
      } catch (error) {
        console.error("Errore nella chiamata API:", error);
      }
    } else {
      state.seriesResults = [];
    }
  };

const updateQuery = (query) => {
  state.query = query;
};

export default {
  state,
  updateQuery,
  searchMovies,
  searchSeries,
};
