<template>
  <!-- Container della barra di ricerca -->
    <div class="search-container"> 
      <div class="input-group mb-3">
        <!-- Input di testo per barra di ricerca -->
        <input
          type="text"
          v-model="store.state.query"
          class="form-control"
          placeholder="Search for movies or TV shows..."
          aria-label="Search"
          aria-describedby="button-search"
        />
        <!-- Bottone per avviare la ricerca -->
        <button
          class="btn btn-primary"
          type="button"
          id="button-search"
          @click="onSearch"
        >
          Search
        </button>
      </div>
  
      <div class="results row" v-if="store.state.movieResults.length">
        <!-- Visualizzazione dei risultati di ricerca nei FILM -->
        <h2 class="text-light">Risultati FILM</h2>
        <div
          v-for="result in store.state.movieResults"
          :key="result.id"
          class="col-md-4 mb-4"
        >
          <div class="card border border-2 border-danger h-100 hover-card">
            <!-- Visualizzazione della copertina del FILM o di un placehold personalizzato con il titolo se la copertina non e' presente -->
            <img
              v-if="result.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`"
              :alt="result.title || result.name"
              class="card-img-top"
            />
            <img
                v-else
                :src="`https://placehold.co/300x400?text=${result.title || result.name}`"
                :alt="result.title || result.name"
                class="card-img-top"
            >
            <div class="card-body hover-info">
              <!-- Visualizzazione del titolo del film -->
              <h5 class="card-title">{{ result.title || result.name }}</h5>
              <!-- Visualizzazione della valutazione in base alle stelle -->
              <div class="rating">
                <span v-for="n in 5" :key="n">
                  <i :class="getStarClass(result.vote_average, n)"></i>
                </span>
              </div>
              <!-- Visualizzazione della data di uscita -->
              <small class="text-light">
                {{ result.release_date || result.first_air_date }}
              </small>
              <!-- Visualizzazione della bandiera della nazione in base alla lingua -->
              <div class="language">
                <span
                  :class="`fi fi-${getFlagClass(result.original_language)}`"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="results row" v-if="store.state.seriesResults.length">
        <!-- Visualizzazione dei risultati di ricerca nelle SERIE TV -->
        <h2 class="text-light">Risultati SERIE TV</h2>
        <div
          v-for="result in store.state.seriesResults"
          :key="result.id"
          class="col-md-4 mb-4"
        >
          <div class="card border border-2 border-danger h-100 hover-card">
            <!-- Visualizzazione della copertina della SERIE TV o di un placehold personalizzato con il titolo se la copertina non e' presente -->
            <img
              v-if="result.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`"
              :alt="result.title || result.name"
              class="card-img-top"
            >
            <img
                v-else
                :src="`https://placehold.co/300x400?text=${result.title || result.name}`"
                :alt="result.title || result.name"
                class="card-img-top"
            >
            <div class="card-body hover-info">
              <!-- Visualizzazione del titolo della serie TV -->
              <h5 class="card-title">{{ result.title || result.name }}</h5>
              <div class="rating">
                <!-- Visualizzazione della valutazione in base alle stelle -->
                <span v-for="n in 5" :key="n">
                  <i :class="getStarClass(result.vote_average, n)"></i>
                </span>
              </div>
              <!-- Visualizzazione della data di uscita -->
              <small class="text-muted">
                {{ result.release_date || result.first_air_date }}
              </small>
              <!-- Visualizzazione della bandiera della nazione in base alla lingua -->
              <div class="language">
                <span
                  :class="`fi fi-${getFlagClass(result.original_language)}`"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import store from '../store';
  
  export default {
    setup() {
      const onSearch = () => {
        store.searchMovies();
        store.searchSeries();
      };
      // Creazione di oggetti per le ligue ed il loro corrispettivo per le bandiere
      const getFlagClass = (languageCode) => {
        const languageToCountryMap = {
          en: 'us',
          it: 'it',
          es: 'es',
          fr: 'fr',
          de: 'de',
          ja: 'jp',
          ko: 'kr',
          zh: 'cn',
          pt: 'pt',
          ru: 'ru',
          hi: 'in',
          ar: 'sa',
        };
        return languageToCountryMap[languageCode] || languageCode;
      };
      // Calcolo della quantita' di stelle piene, mezze e vuote con la votazione a 5
      const getStarClass = (voteAverage, starIndex) => {
        const ratingOutOfFive = (voteAverage / 10) * 5;
        const fullStars = Math.floor(ratingOutOfFive);
        const hasHalfStar = ratingOutOfFive - fullStars >= 0.5;
  
        if (starIndex <= fullStars) {
          return 'bi bi-star-fill text-warning'; // Stella piena
        } else if (starIndex === fullStars + 1 && hasHalfStar) {
          return 'bi bi-star-half text-warning'; // Mezza stella
        } else {
          return 'bi bi-star'; // Stella vuota
        }
      };
  
      return {
        store,
        onSearch,
        getFlagClass,
        getStarClass,
      };
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .card-img-top {
    object-fit: cover;
    height: 300px;
  }
  
  .card-body {
    padding: 15px;
    text-align: center;
  }
  
  .fi {
    font-size: 24px; /* Dimensione della bandiera */
  }
  
  .rating {
    display: flex;
    justify-content: center;
  }
  
  .bi {
    font-size: 20px; /* Dimensione delle stelle */
    margin-right: 2px;
  }
  

  .hover-card {
    position: relative;
    overflow: hidden;
  }
  
  .hover-img {
    transition: opacity 0.3s ease;
  }
  
  .hover-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 10px;
  }
  
  .hover-card:hover .hover-img {
    opacity: 0;
  }
  
  .hover-card:hover .hover-info {
    opacity: 1;
  }
  </style>
  