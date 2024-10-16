/* TP2: Creación de un Buscador de Elementos
Deberán desarrollar un buscador de elementos. Podrán usar: -Una API.
Pueden utilizar Bootstrap para mejorar los estilos, así como añadir interacciones y elementos visuales 
adicionales que mejoren la experiencia del usuario.
Asegúrense de subir el proyecto a Netlify o GitHubPages. */

let countriesData = [];

fetch('all.json')
    .then(response => response.json())
    .then(data => {
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        countriesData = sortedCountries;
        ocultarCargando();
        crearCard(countriesData);
    })
    .catch(error => {
        console.error('Error:', error);
        ocultarCargando();
    });

function mostrarCargando() {
    const container = document.getElementById('country-container');
    container.innerHTML = '<p class="loading">Cargando...</p>';
}

function ocultarCargando() {
    const loadingMessage = document.querySelector('.loading');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

function crearCard(data) {
    const container = document.getElementById('country-container');
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        container.innerHTML += `
            <div class="country-card">
                <div class="country-flag">
                    <img class="img" src="${data[i].flags.png}" alt="${data[i].name.common}">
                </div>
                <div class="country-details">
                    <p id="country-name">${data[i].name.common}</p>
                    <p><strong>Capital:</strong> ${data[i].capital ? data[i].capital : 'No disponible'}</p>
                    <p><strong>Región:</strong> ${data[i].region}</p>
                    <div class="button">
                        <div class="button-layer"></div>
                        <a class="button" href="masInfo.html?country=${encodeURIComponent(data[i].name.common)}">Más Info</a>             
                    </div>
                </div>
            </div>`;
    }
}

mostrarCargando();

document.getElementById('search').addEventListener('input', function (event) {
    const busqueda = event.target.value.toLowerCase();

    const resultados = countriesData.filter(country => {
        const countryName = country.name.common.toLowerCase();
        const capital = Array.isArray(country.capital) ? country.capital.join(', ').toLowerCase() : (country.capital ? country.capital.toLowerCase() : '');
        const region = country.region ? country.region.toLowerCase() : '';

        return countryName.includes(busqueda) || capital.includes(busqueda) || region.includes(busqueda);
    });

    crearCard(resultados);
});

