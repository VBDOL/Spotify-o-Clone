const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists`)
    .then((response) => response.json())
    .then((results) => {
      const filteredResults = results.filter(
        (x) => x.name && x.name.toLowerCase().includes(searchTerm)
      );
      console.log(filteredResults.map((x) => x.name));
      displayResults(filteredResults);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayResults(results) {
  hidePlaylists();
  const artistList = document.createElement("div");
  artistList.classList.add("grid-container");

  results.forEach((element) => {
    const artistItem = document.createElement("div");
    artistItem.classList.add("artist-item");

    const artistImage = document.createElement("img");
    artistImage.src = element.urlImg;
    artistImage.classList.add("artist-img");

    const artistName = document.createElement("p");
    artistName.innerText = element.name;
    artistName.classList.add("artist-name");

    artistItem.appendChild(artistImage);
    artistItem.appendChild(artistName);

    artistList.appendChild(artistItem);
  });

  resultArtist.innerHTML = ""; // Limpar resultados anteriores
  resultArtist.appendChild(artistList);
  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
