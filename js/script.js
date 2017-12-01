const searchInput =  document.querySelector('.search-form__input'),
      searchBtn   =  document.querySelector('.search-form__btn');
const popularBtn  =  document.querySelector('.category__popular'),
      latestBtn   =  document.querySelector('.category__latest'),
      topBtn      =  document.querySelector('.category__top'),
      darkBtn     =  document.querySelector('.theme-style__dark'),
      lightBtn    =  document.querySelector('.theme-style__ligth'),
      gallery     =  document.querySelector('.output-gallery'),
      scriptCart  =  document.querySelector('#template').textContent.trim(),
      err         =  document.querySelector('#err');
const apiKey  = 'api_key=f24a0fd18f52218851075901c5a108a0',
      page    = '&page=1';
const searchByNameUrl   = `https://api.themoviedb.org/3/search/movie?${apiKey}`,
      searchPopularUrl  = `https://api.themoviedb.org/3/movie/popular?${apiKey}`,
      searchLatestUrl   = `https://api.themoviedb.org/3/movie/latest?${apiKey}`,
      searchTopUrl      = `https://api.themoviedb.org/3/movie/top_rated?${apiKey}`;

const clearGallery = () => {
    document.querySelectorAll('.movie-elem').forEach((elem) => {
        elem.remove();
    });
}

const templates = _.template(scriptCart);

const searchByName = (urlValue, page = '', query = 'movie') => {
  let url = `${urlValue}${page}${query}`;
  clearGallery();
  err.innerHTML = '';
    if (searchInput.value == ''){
      alert('Please, fill the search input');
    }
  return fetch(url)
     .then(response => {
    if (response.ok) {
      return response.json();
         }   
     throw new Error(response.statusText);
    })
    .then(data => {
       if (data.results.length > 0) {
        const videos = data.results;
        let htmlString = '';
           videos.forEach(elem => {
            htmlString += templates(elem);
          })
          gallery.innerHTML += htmlString;
        }else{
          alert(`No result for your search ${searchInput.value}`);
        }
    })
    .catch(error => {err.innerHTML = `Have no result of search: ${searchInput.value}`;
    });
    searchInput.value = ''; 
};

const themeOption = (theme = 'light') => {
    let linkTag = document.querySelector('link');
    linkTag.setAttribute('href', `css/style_${theme}.css`);
    if (theme == 'light') {
        localStorage.setItem('theme', 'light');
        lightBtn.classList.add('chosen-style');
        darkBtn.classList.remove('chosen-style');
    } else {
        localStorage.setItem('theme', 'dark');
        lightBtn.classList.remove('chosen-style');
        darkBtn.classList.add('chosen-style');
    }
}

window.addEventListener('load',(e) => {
    themeOption(localStorage.getItem('theme' || 'light'));
});
searchBtn.addEventListener("click", (e) => {
    searchByName(searchByNameUrl, '' , `&query=${searchInput.value}`);
    });
popularBtn.addEventListener("click", (e) => {
    searchByName(searchPopularUrl, page, ``);
    });
latestBtn.addEventListener("click", (e) => {
    searchByName(searchLatestUrl, page, ``);
    });
topBtn.addEventListener("click", (e) => {
    searchByName(searchTopUrl, page, ``);
    });
lightBtn.addEventListener('click',(e) => {
    themeOption('light');
});
darkBtn.addEventListener('click',(e) => {
    themeOption('dark');
});