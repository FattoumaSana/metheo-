// Fonction pour récupérer les données météorologiques via l'API OpenWeatherMap
function fetchWeatherData(city) {
    const apiKey = '489b95a37c6b7e3146640ea7d0a939d3'; // Ta clé API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    // Envoi de la requête fetch pour récupérer les données de l'API
    fetch(apiUrl)
        .then(response => {
            // Vérification si la requête a été bien réussie
            if (!response.ok) {
                throw new Error('Impossible de récupérer les données météorologiques');
            }
            return response.json();
        })
        .then(data => {
            // Traitement de la réponse JSON
            const location = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;

            // Mise à jour dynamique des éléments HTML pour afficher les résultats
            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = `Température : ${temperature} °C`;
            document.getElementById('description').textContent = `Description : ${description}`;

            // Optionnel : ajouter une icône météo
            const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            document.getElementById('weatherIcon').setAttribute('src', weatherIconUrl);

            // Affichage de la section des résultats météo
            document.getElementById('weatherResult').style.display = 'block';
            document.getElementById('errorMessage').textContent = ''; // Effacer les messages d'erreur
        })
        .catch(error => {
            // Gestion des erreurs (ex : ville non trouvée)
            document.getElementById('weatherResult').style.display = 'none'; // Masque le résultat
            document.getElementById('errorMessage').textContent = 'Erreur lors de la récupération des données : ' + error.message;
        });
}

// Commenting out the Axios code
/*
document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '489b95a37c6b7e3146640ea7d0a939d3'; // Ta clé API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=fr`;

    axios.get(apiUrl)
        .then(response => {
            const data = response.data;
            const location = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;

            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = `Température : ${temperature} °C`;
            document.getElementById('description').textContent = `Description : ${description}`;

            const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            const weatherIconElement = document.getElementById('weatherIcon');
            weatherIconElement.setAttribute('src', weatherIconUrl);
            weatherIconElement.style.display = 'block';

            document.getElementById('weatherResult').style.display = 'block';
            document.getElementById('errorMessage').textContent = ''; // Effacer les messages d'erreur
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
            document.getElementById('weatherResult').style.display = 'none';
            document.getElementById('errorMessage').textContent = 'Erreur lors de la récupération des données : ' + error.message;
        });
});
*/

// Gestionnaire d'événements pour le bouton "Obtenir la météo"
document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value.trim();
    if (location === "") {
        alert('Veuillez entrer un lieu');
        return;
    }
    
    // Appel de la fonction pour récupérer les données
    fetchWeatherData(location);
});
