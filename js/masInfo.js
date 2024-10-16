// https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies,languages,population,
// area,region,latlng,googleMaps,subregion
let countriesData = [];

fetch('all.json')
    .then(response => response.json())
    .then(data => {
        countriesData = data;
        const urlParams = new URLSearchParams(window.location.search);
        const countryName = urlParams.get('country');

        if (countryName) {
            mostrarInfo(countryName);
        }
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

function mostrarInfo(countryName) {
    const country = countriesData.find(c => c.name.common === countryName);

    if (country) {
        const countryTitle = document.getElementById('country-title');
        const countryDetails = document.getElementById('country-details');

        countryTitle.textContent = country.name.common;

        countryDetails.innerHTML = `
            <div id="country-details" class="row">
                <div id="img" class="col-md-6">
                    <img src="${country.flags.png}" alt="${country.name.common}" class="img-fluid">
                </div>
                <div id="details" class="col-md-6">
                    <p><strong>Idioma:</strong> ${Object.values(country.languages).join(', ')}</p>
                    <p><strong>Moneda:</strong> ${Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
                    <p><strong>Subregión:</strong> ${country.subregion ? country.subregion : 'No disponible'}</p>
                    <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
                    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Latitud y Longitud:</strong> ${country.latlng ? country.latlng : 'No disponible'}</p>
                    <p><strong>Google Maps:</strong> 
                        <a href="${country.maps.googleMaps ? country.maps.googleMaps : '#'}" target="_blank">
                            ${country.maps.googleMaps ? country.maps.googleMaps : 'No disponible'}</a>
                    </p>
                </div>
            </div>`;
    }
}

