var modal = document.getElementById('myModal');
var newModal = document.getElementById('newModal');
var span = document.getElementsByClassName('close')[0];
var projectForm = document.getElementById('projectForm');
var projectsGallery = document.getElementById('projectsGallery');



function triggerFileInput() {
    const fileInput = document.getElementById('newProjectImage');
    fileInput.click();
}

function displaySelectedImage(event) {
    const input = event.target;
    const image = document.getElementById('selectedImage');
    const addPhotoBtn = document.getElementById('addPhotoBtn');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
            image.style.display = 'block';
            addPhotoBtn.style.display = 'none';
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    } else {
        console.error("Modal with ID " + modalId + " not found.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector("#myModal .close");

    closeButton.addEventListener('click', function () {
        closeModal('myModal');
    });

    // Autre code...
});

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}
// Fonction pour vérifier si tous les champs du formulaire sont remplis
function checkFormFields() {
    const photoFile = document.getElementById("newProjectImage").files[0];
    const photoTitle = document.getElementById("newProjectName").value;
    const photoCategory = document.getElementById("newProjectCategory").value;

    return photoFile && photoTitle && photoCategory;
}

// Fonction pour activer ou désactiver le bouton "Valider"
function toggleValidateButton() {
    const validerButton = document.getElementById('validerButton');

    if (checkFormFields()) {
        validerButton.classList.remove('disabled');
    } else {
        validerButton.classList.add('disabled');
    }
}

// Désactiver initialement le bouton au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    toggleValidateButton(); // Vérifier l'état initial du formulaire
});

// Ajouter des écouteurs d'événements pour chaque champ du formulaire
document.getElementById('newProjectImage').addEventListener('change', toggleValidateButton);
document.getElementById('newProjectName').addEventListener('input', toggleValidateButton);
document.getElementById('newProjectCategory').addEventListener('input', toggleValidateButton);

// Fonction de validation
function validate() {
    if (!checkFormFields()) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Événement pour le bouton "Ajouter une photo" dans le modal
    document.getElementById('openNewProjectModalButton').addEventListener('click', function () {
        // Votre logique ici pour ouvrir le modal
    });
    const openNewProjectModalButton = document.getElementById("openNewProjectModalButton");
    const newModal = document.getElementById("newModal");

    openNewProjectModalButton.addEventListener("click", function () {
        newModal.style.display = "block";
        var button = document.querySelector("#closeModal");
        button.addEventListener("click", (event) => {
            var modals = document.querySelectorAll(".modal");
            modals.forEach(modal => {
                closeModal(modal.id);
            });
            var button = document.querySelector("#closeArrow");
            button.addEventListener("click", (event) => {
                closeModal('newModal');
            });
            var button = document.querySelector("#myModal");
            button.addEventListener("click", (event) => {
                var modals = document.querySelectorAll(".myModal");
            });
        });

        var button = document.querySelector("#addPhotoBtn");
        button.addEventListener("click", (event) => {
            triggerFileInput();
        });

    });
});

function displaySelectedImage(event) {
    var file = event.target.files[0];
    var imageLabel = document.getElementById("imageLabel");
    var maxSizeParagraph = document.getElementById(
        "maxSizeParagraph"); // Assurez-vous que l'id correspond à votre paragraphe

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var image = document.createElement("img");
            image.src = e.target.result;
            image.style.maxWidth = "95%";
            image.style.maxHeight = "200px";
            imageLabel.innerHTML = ""; // Efface le contenu précédent de l'élément label
            image.style.marginTop = "-10px"; // Espacement supplémentaire au-dessus de l'image
            imageLabel.appendChild(image);

            // Masquer le paragraphe "JPG, PNG : 4 Mo maximum"
            if (maxSizeParagraph) {
                maxSizeParagraph.style.display = "none";
            }
        };

        reader.readAsDataURL(file);
    } else {
        imageLabel.innerHTML = '<i class="fas fa-image"></i> Ajouter photo';

        // Afficher le paragraphe "JPG, PNG : 4 Mo maximum"
        if (maxSizeParagraph) {
            maxSizeParagraph.style.display = "none";
        }
    }
}
var storedToken = sessionStorage.getItem('token');



function previewImage(event) {
    var imagePreview = document.getElementById("imageLabel");
    imagePreview.innerHTML = ""; // Efface le contenu précédent de l'aperçu de l'image

    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var image = document.createElement("img");
            image.src = e.target.result;
            image.style.maxWidth = "95%";
            image.style.maxHeight = "200px";
            imagePreview.appendChild(image);
        };

        reader.readAsDataURL(file);
    }
}



function openNewModal() {
    var mymodal = document.getElementById("mymodal");
    mymodal.style.display = "none";
}
// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const categories = await response.json();
            console.log('Catégories récupérées :', categories);
            initializeFilters(categories);
        } else {
            console.error('Erreur lors de la récupération des catégories. Statut :', response
                .status);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
    }
}

function filterProjects(categoryId) {
    // Mettre à jour la classe active du bouton sélectionné
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const selectedButton = document.querySelector(`[data-category="${categoryId}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Filtrer les projets en fonction de la catégorie sélectionnée
    const filteredProjects = categoryId === 'Tous' ? projects : projects.filter(project => {
        return project.category && project.category.id === parseInt(categoryId);
    });

    // Appeler la fonction pour afficher les projets filtrés
    displayFilteredProjects(filteredProjects, categoryId);
}

function previewImage(event) {
    var input = event.target;
}

function updateCategoryButtons() {
    // Mettez à jour l'interface utilisateur avec les catégories récupérées
    const categoryButtonsContainer = document.querySelector('.category-buttons');
    categoryButtonsContainer.innerHTML = ''; // Effacer le contenu actuel

    categoryNames.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.dataset.category = category.id;
        button.classList.add('filter-button');
        button.addEventListener('click', () => filterProjects(category.id));

        categoryButtonsContainer.appendChild(button);
    });
}
let projects = []; // Déclarer et initialiser la variable projects
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        projects = data;
        // Appeler filterProjects après que les projets sont récupérés, en filtrant par défaut sur 'Tous'
        filterProjects('Tous');
    })
    .catch(error => console.error('Erreur lors de la récupération des projets :', error));

// Définir la fonction filterProjects
function filterProjects(categoryId) {
    // Assurez-vous que projects est défini et est un tableau
    if (Array.isArray(projects)) {
        // Utiliser la méthode filter() uniquement si projects est un tableau
        const filteredProjects = (categoryId === 'Tous') ? projects : projects.filter(project => project.category.name === categoryId);
        // Continuer le reste de la logique...
    } else {
        console.error('La variable projects n\'est pas un tableau.');
    }
}


// Appeler filterProjects après que les projets sont récupérés
window.addEventListener('load', function () {
    filterProjects('0');
});

// ... (le reste de votre code)

function initializeFilters() {
    // Logique d'initialisation des filtres ici
    console.log('Filtres initialisés');
}

// ...

window.addEventListener('load', function () {
    fetchCategories(); // Appeler la fonction pour récupérer les catégories
    filterProjects('Tous');
    initializeFilters(); // Appeler la fonction d'initialisation des filtres
});

// ...

function displayFilteredProjects(projects, selectedCategoryId) {
    // Effacer le contenu actuel de la section des fiches
    const sectionFiches = document.querySelector(".fiches");
    const gallerySection = document.querySelector(".gallery");
    sectionFiches.innerHTML = '';
    gallerySection.innerHTML = ''; // Effacer le contenu de la galerie

    // Boucler à travers les projets
    projects.forEach(project => {
        const pieceElement = document.createElement("article");
        const imageElement = document.createElement("img");
        const titleElement = document.createElement("h3");

        // Ajoutez une classe à l'article en fonction de la catégorie
        pieceElement.classList.add(`category-${project.categoryId}`);

        // Ajoutez une classe à l'image pour la rendre initialement cachée
        if (project.categoryId !== selectedCategoryId) {
            imageElement.classList.add("hidden-image");
        }

        imageElement.src = project.imageUrl;
        titleElement.textContent = project.title;

        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(titleElement);
        sectionFiches.appendChild(pieceElement);
    });
    var button = document.querySelector("#editProjects");

    button.addEventListener("click", (event) => {
        openModal('myModal');
    });


    // Boucler à travers les projets et ajouter les images avec l'icône "Poubelle" à la galerie
    projects.forEach(project => {
        const pieceElementGallery = document.createElement("article");
        const containerElement = document.createElement(
            "div"); // Conteneur pour l'image et l'icône
        const imageElement = document.createElement("img");
        const trashIcon = document.createElement("i");

        containerElement.classList.add(
            "image-container"); // Ajoutez une classe pour le style CSS

        imageElement.src = project.imageUrl;
        trashIcon.className =
            "fas fa-trash-alt trash-icon"; // Ajoutez la classe de l'icône de poubelle
        trashIcon.addEventListener("click", function () {
            deleteProject(project.id);
        });

        containerElement.appendChild(trashIcon); // Ajoutez l'icône de poubelle au conteneur
        containerElement.appendChild(imageElement);
        pieceElementGallery.appendChild(containerElement);
        gallerySection.appendChild(pieceElementGallery);
    });

    // Mettez à jour la visibilité des images en fonction de la catégorie sélectionnée
    const categoryElements = document.querySelectorAll('.hidden-image');
    categoryElements.forEach(element => element.classList.add("hidden-image"));

    const selectedCategoryElements = document.querySelectorAll(
        `.category-${selectedCategoryId} .hidden-image`);
    selectedCategoryElements.forEach(element => element.classList.remove("hidden-image"));

    console.log(`Catégorie sélectionnée : ${selectedCategoryId}`);
}


function logIn(loggedIn) {
    // Ajoutez ici votre logique pour déterminer si l'utilisateur est connecté
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // Check if the user is logged in, and hide/show elements accordingly
    if (isLoggedIn) {
        document.getElementById('filterContainer').style.display = 'none';
        document.getElementById('editProjects').style.display = 'flex';
        document.getElementById('bandeauConnexion').style.display = 'block';
    } else {
        document.getElementById('editProjects').style.display = 'none';
        document.getElementById('bandeauConnexion').style.display = 'none';
        document.getElementById('filterContainer').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector("#newModal .close");

    closeButton.addEventListener('click', function () {
        closeModal('newModal');
    });
});



// Appeler la fonction logIn lors du chargement de la page
window.addEventListener('load', logIn);

function logout() {
    // Supprimer l'état de connexion de sessionStorage
    sessionStorage.removeItem('isLoggedIn');
    // Rediriger vers la page de connexion après la déconnexion
    window.location.href = 'index.html';
}

// Vérifier si l'utilisateur est connecté lors du chargement de la page
function checkLoginStatus() {
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        console.log('Utilisateur connecté');
        // Si l'utilisateur est connecté, afficher le bouton de déconnexion
        document.getElementById('logoutButton').style.display = 'block';
    }
}


// Ajouter un gestionnaire d'événements au bouton de déconnexion
document.getElementById('logoutButton').addEventListener('click', logout);

// Vérifier si l'utilisateur est connecté lors du chargement de la page
function checkLoginStatus() {
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        console.log('Utilisateur connecté');
    }
}

// Appeler la fonction de vérification lors du chargement de la page
checkLoginStatus();
var storedToken = sessionStorage.getItem('token');

function getTokenFromStorage() {
    return sessionStorage.getItem('token');
}
// Vérifier si le token est présent
if (storedToken) {
    console.log('Token récupéré sur la page http://127.0.0.1:5500/FrontEnd/index.html:', storedToken);
    // Afficher un message ou effectuer d'autres actions si nécessaire
} else {
    console.error(
        'Aucun token trouvé dans le sessionStorage sur la page http://127.0.0.1:5500/FrontEnd/index.html'
    );
}


// Fonction pour supprimer un projet
async function deleteProject(projectId) {
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            // Actualiser la galerie après la suppression réussie
            updateGalleryAfterProjectDeleted();
        } else {
            console.error('La suppression du projet a échoué.');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la suppression du projet:', error);
    }
}

// Fonction pour mettre à jour la galerie après la suppression réussie
async function updateGalleryAfterProjectDeleted() {
    try {
        // Récupérer les projets mis à jour depuis le backend
        const response = await fetch('http://localhost:5678/api/works');
        if (response.ok) {
            const updatedProjects = await response.json();

            // Mettre à jour la galerie avec les nouveaux projets
            displayFilteredProjects(updatedProjects, 'Tous');
        } else {
            console.error('Erreur lors de la récupération des projets mis à jour:', response.status);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la mise à jour de la galerie:', error);
    }
}


// Fonction pour sauvegarder le projet dans le sessionStorage
function saveProjectToSessionStorage(projectData) {
    // Récupérer les projets existants du sessionStorage
    const existingProjects = JSON.parse(sessionStorage.getItem('projects')) || [];

    // Ajouter le nouveau projet à la liste
    existingProjects.push(projectData);

    // Mettre à jour le sessionStorage avec la nouvelle liste de projets
    sessionStorage.setItem('projects', JSON.stringify(existingProjects));
}
window.addEventListener('load', function () {
    // Récupérer les projets depuis le sessionStorage
    const existingProjects = JSON.parse(sessionStorage.getItem('projects')) || [];

    // Afficher les projets existants
    existingProjects.forEach(project => {
        addProjectToSections(project.imageUrl, project.title);
    });

    // Appeler la fonction logIn lors du chargement de la page
    logIn();
});


// Ajoute un écouteur d'événement au bouton de validation du formulaire
document.getElementById('validerButton').addEventListener('click', async function () {
    // Récupérer les données du formulaire
    const photoFile = document.getElementById('newProjectImage').files[0];
    const photoTitle = document.getElementById('newProjectName').value;
    const photoCategory = document.getElementById('newProjectCategory').value;

    // Vérifier si toutes les données sont présentes
    if (photoFile && photoTitle && photoCategory) {
        // Créer un objet FormData pour envoyer les données du formulaire
        const formData = new FormData();
        formData.append('image', photoFile);
        formData.append('title', photoTitle);
        formData.append('category', photoCategory);

        try {
            const response = await fetch('http://localhost:5678/api/works/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                updateGalleryAfterProjectAdded();
            } else {
                console.error('Erreur lors de l\'ajout du projet:', response.status);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'ajout du projet:', error);
        }
    } else {
        console.error('Veuillez remplir tous les champs du formulaire.');
    }
});

// Fonction pour mettre à jour la galerie après l'ajout réussi
async function updateGalleryAfterProjectAdded() {
    try {
        // Récupérer les projets mis à jour depuis le backend
        const response = await fetch('http://localhost:5678/api/works');
        if (response.ok) {
            const updatedProjects = await response.json();

            // Mettre à jour la galerie avec les nouveaux projets
            displayFilteredProjects(updatedProjects, 'Tous');
        } else {
            console.error('Erreur lors de la récupération des projets mis à jour:', response.status);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la mise à jour de la galerie:', error);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('newProjectImage');

    fileInput.addEventListener('change', function (event) {
        displaySelectedImage(event);
    });
});

document.addEventListener('DOMContentLoaded', function () {

    // Événement pour le bouton "Ajouter photo"
    document.getElementById('addPhotoBtn').addEventListener('click', function () {
        triggerFileInput();
    });

    // Événements pour les boutons de filtre
    var filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var category = this.getAttribute('data-category');
            filterProjects(category);
        });
    })
    // Sélection de l'élément input
    var fileInput = document.getElementById('newProjectImage');

    // Ajout de l'événement 'change'
    fileInput.addEventListener('change', function (event) {
        displaySelectedImage(event);
    });

});

const urlWorks =
    "http://localhost:5678/api-docs/";
// Catégories de filtres
const categories = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];

// Fonction pour générer les boutons de filtrage
function generateFilterButtons() {
    const filterContainer = document.getElementById('filterContainer');

    // Créer un bouton pour chaque catégorie
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('filter-button');
        button.setAttribute('data-category', category);
        button.textContent = category;
        filterContainer.appendChild(button);
    });
}

// Fonction pour filtrer les éléments en fonction de la catégorie sélectionnée
function filterProjects(categoryId) {
    // Mettre à jour la classe active du bouton sélectionné
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const selectedButton = document.querySelector(`[data-category="${categoryId}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Filtrer les projets en fonction de la catégorie sélectionnée
    const filteredProjects = (categoryId === 'Tous') ? projects : projects.filter(project => project.category.name === categoryId);

    // Appeler la fonction pour afficher les projets filtrés
    displayFilteredProjects(filteredProjects, categoryId);
}

// Ajouter des écouteurs d'événements après la génération des boutons
document.addEventListener('DOMContentLoaded', function () {
    generateFilterButtons();

    // Ajouter des écouteurs d'événements pour chaque bouton de filtre
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function () {
            const categoryId = this.getAttribute('data-category');
            filterProjects(categoryId);
        });
    });
});