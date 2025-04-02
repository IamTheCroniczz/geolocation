window.addEventListener('load', () => {
    console.log('evento: load');

    const btEstado = document.getElementById('btEstado');
    const Status = document.getElementById('cpStatus');
    const spLatitude = document.getElementById('spLatitude');
    const spLongitude = document.getElementById('spLongitude');
    const estado = document.getElementById('spEstado');
    const cidade = document.getElementById('spCidade');

    btEstado.addEventListener('click', () => {
        console.log('botão foi pressionado');
        encontreEstado();
    });

    function encontreEstado() {
        console.log('encontre estado');
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                console.log(posicao);
                let longitude = posicao.coords.longitude;
                let latitude = posicao.coords.latitude;
                spLatitude.innerText = latitude;
                spLongitude.innerText = longitude;

                let geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-BR`;

                console.log(geoApiUrl);

                fetch(geoApiUrl)
                    .then(response => response.json())
                    .then(dados => {
                        console.log(dados);
                        console.log(dados.principalSubdivision);
                        spEstado.innerText = dados.principalSubdivision;
                        spCidade.innerText = dados.city;
                        mostraMapa(latitude, longitude);
                    });
            },
            (erro) => {
                console.log(erro);
            }
        );
    }

    function mostraMapa(latitude, longitude) {
        console.log('mostrarMapa', latitude, longitude);

        var map = L.map('map').setView([latitude, longitude], 13);

        // Correção: "tileLayer" e URL correta
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([latitude, longitude]).addTo(map)
            .bindPopup("<b>São Paulo </b> <br> Esta é a localização do marcador.")
            .openPopup();
    }
});
