

async function authenticate(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Utiliser la vraie URL de votre API login
  const apiUrl = 'http://localhost:5678/api/users/login';

  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "email": username,
              "password": password
          }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erreur HTTP ${response.status}: ${errorData.message}`);
      }

      const data = await response.json();
      displaySuccessMessage(data.userId, data.token);
      window.location.href = 'index.html'; // Rediriger vers la page index.html
  } catch (error) {
      console.error("Erreur lors de la requête :", error);
      displayErrorMessage("Erreur lors de l'authentification");
  }
}

function checkLoginStatus() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
      const token = sessionStorage.getItem('token');
      console.log('Utilisateur connecté avec le token:', token);
      // Vous pouvez ajouter d'autres actions pour les utilisateurs connectés ici
  } else {
      console.log('Utilisateur non connecté');
      // Vous pouvez ajouter d'autres actions pour les utilisateurs non connectés ici
  }
}

// Fonction pour afficher un message de succès
function displaySuccessMessage(userId, token) {
  var successMessage = document.createElement('div');
  successMessage.textContent = `Authentification réussie pour l'utilisateur ${userId}!`;
  successMessage.style.color = 'green';
  document.getElementById('errorMessage').appendChild(successMessage);

  // Stocker l'état de connexion et le token dans sessionStorage
  sessionStorage.setItem('isLoggedIn', true);
  sessionStorage.setItem('token', token);
}



// Fonction pour afficher un message d'erreur
function displayErrorMessage(message) {
  var errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.style.color = 'red';
  document.getElementById('errorMessage').appendChild(errorMessage);
}

// Ajouter un écouteur d'événement sur le bouton de connexion
document.getElementById('loginButton').addEventListener('click', authenticate);

// Vérifier le statut de connexion lors du chargement de la page
checkLoginStatus();
async function authenticate(event) {
event.preventDefault();

var username = document.getElementById('username').value;
var password = document.getElementById('password').value;

const apiUrl = 'http://localhost:5678/api/users/login';

try {
const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({ "email": username, "password": password }),
});

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(`Erreur HTTP ${response.status}: ${errorData.message}`);
}

const data = await response.json();

// Stocker le token dans le sessionStorage
sessionStorage.setItem('token', data.token);
sessionStorage.setItem('isLoggedIn', true);

displaySuccessMessage(data.userId, data.token);
window.location.href = 'index.html';
} catch (error) {
console.error("Erreur lors de la requête :", error);
displayErrorMessage("Erreur lors de l'authentification");
}
function checkLoginStatus() {
var isLoggedIn = sessionStorage.getItem('isLoggedIn');

if (isLoggedIn) {
console.log('Utilisateur connecté');

// Vérifier si le token est présent dans le sessionStorage
var storedToken = sessionStorage.getItem('token');
if (storedToken) {
  console.log('Token stocké dans le sessionStorage:', storedToken);
} else {
  console.error('Aucun token trouvé dans le sessionStorage');
}

// Si l'utilisateur est connecté, afficher le bouton de déconnexion
document.getElementById('logoutButton').style.display = 'block';
} else {
console.log('Utilisateur non connecté');
}
}

}