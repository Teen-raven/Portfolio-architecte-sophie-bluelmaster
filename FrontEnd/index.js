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


document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector("#newModal .close");

    closeButton.addEventListener("click", function () {
        closeModal("newModal");
    });
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
    const openNewProjectModalButton = document.getElementById("openNewProjectModalButton");
    const newModal = document.getElementById("newModal");

    openNewProjectModalButton.addEventListener("click", function () {
        newModal.style.display = "block";
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
    // Code pour ouvrir le newModal

    // Fermer le mymodal si ouvert
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
projects = []
window.addEventListener('load', function () {
    // Récupérer les projets depuis l'API
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            projects = data;

            // Récupérer les catégories depuis l'API
            fetch('http://localhost:5678/api/categories')
                .then(response => response.json())
                .then(categoryData => {
                    // Traiter les catégories récupérées
                    console.log('Catégories récupérées :', categoryData);

                    // Appeler la fonction pour initialiser les filtres avec les catégories
                    initializeFilters(categoryData);

                    // Appeler la fonction pour afficher les projets avec la catégorie par défaut
                    filterProjects('Tous');
                })
                .catch(error => console.error(
                    'Erreur lors de la récupération des catégories :', error));
        })
        .catch(error => console.error('Erreur lors de la récupération des projets :', error));
});

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
    const filteredProjects = (categoryId === 'Tous') ? projects : projects.filter(project => project
        .category.name === categoryId);

    // Appeler la fonction pour afficher les projets filtrés
    displayFilteredProjects(filteredProjects, categoryId);
}

// Récupérer les projets depuis l'API
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        projects = data;
        // Appeler la fonction pour initialiser les filtres ici si nécessaire
    })
    .catch(error => console.error('Erreur lors de la récupération des projets :', error));

// ... (le reste de votre code)

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
    var button = document.querySelector("#Tous");

    button.addEventListener("click", (event) => {
        filterProjects('Tous');
    });
    var button = document.querySelector("#editProjects");

    button.addEventListener("click", (event) => {
        openModal('myModal');
    });
    var button = document.querySelector("#Objets");

    button.addEventListener("click", (event) => {
        filterProjects('Objets');
    });
    var button = document.querySelector("#Appartements");
    button.addEventListener("click", (event) => {
        filterProjects('Appartements');
    });
    document.addEventListener("DOMContentLoaded", function() {
        var button = document.querySelector("#Hotels \\& restaurants");
        if (button) {
            button.addEventListener("click", (event) => {
                filterProjects('Hotels & restaurants');
            });
        } else {
            console.error("Élément avec l'identifiant 'Hotels & restaurants' non trouvé.");
        }
    });
    var button = document.querySelector("#closeModal");
    button.addEventListener("click", (event) => {
        var modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
            closeModal(modal.id);
        });
    });
    var button = document.querySelector("#closeArrow");
    button.addEventListener("click", (event) => {
        closeModal('newModal');
    });
    var button = document.querySelector("#addPhotoBtn");
    button.addEventListener("click", (event) => {
        triggerFileInput();
    });
    var button = document.querySelector("#myModal");
    button.addEventListener("click", (event) => {
        var modals = document.querySelectorAll(".myModal");
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

// Appeler la fonction logIn lors du chargement de la page
window.addEventListener('load', logIn);

// Fonction de déconnexion
// Fonction pour gérer la déconnexion
function logout() {
    // Supprimer l'état de connexion de sessionStorage
    sessionStorage.removeItem('isLoggedIn');
    // Rediriger vers la page de connexion après la déconnexion
    window.location.href = 'login.html';
}

// Vérifier si l'utilisateur est connecté lors du chargement de la page
function checkLoginStatus() {
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        console.log('Utilisateur connecté');
        // Si l'utilisateur est connecté, afficher le bouton de déconnexion
        document.getElementById('logoutButton').style.display = 'block';
    } else {
        console.log('Utilisateur non connecté');
    }
}

// Appeler la fonction de vérification lors du chargement de la page
checkLoginStatus();

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

async function deleteProject(projectId) {
    try {
        // Récupérer le token depuis le sessionStorage
        const token = sessionStorage.getItem('token');

        // Vérifier si le token existe
        if (!token) {
            console.error('Token non disponible. Impossible de supprimer le projet.');
            return;
        }

        // Effectuer une requête DELETE à l'API avec l'ID du projet et le token d'authentification
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Ajouter le token d'authentification
            },
        });

        if (response.ok) {
            // Supprimer le projet de la galerie côté client
            const gallerySection = document.querySelector(".gallery");
            const projectElement = gallerySection.querySelector(`[data-id="${projectId}"]`);
            projectElement.remove();
        } else {
            console.error('La suppression du projet a échoué.');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la suppression du projet:', error);
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


const addPhotoButton = document.getElementById("validerButton");

addPhotoButton.addEventListener("click", async () => {
    const photoFile = document.getElementById("newProjectImage").files[0];
    const photoTitle = document.getElementById("newProjectName").value;
    const photoCategory = document.getElementById("newProjectCategory").value;

    //  verification taille fichier
    if (photoFile && photoTitle && photoCategory) {
        if (photoFile.size > 4 * 1024 * 1024) {
            alert("La taille de l'image dépasse 4 Mo.");
            return;
        }

        //  verification format fichier
        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(photoFile.type)) {
            alert(
                "Le format de fichier n'est pas pris en charge. Veuillez utiliser JPG ou PNG."
            );
            return;
        }

        const formData = new FormData();
        formData.append("image", photoFile);
        formData.append("title", photoTitle);
        formData.append("category", photoCategory);

        try {
            const response = await fetch("http://localhost:5678/api/works/", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            console.log(formData)

            if (response.ok) {
                /// AJOUT
                console.log(sessionStorage.getItem("token"));
                console.log(response)

                // Actualiser la galerie

            } else {
                const errorData = await response.json();
                console.log("Erreur lors de l'ajout du projet :", errorData);
            }
        } catch (error) {
            console.log("Erreur lors de l'ajout du projet :", error);
        }
    } else {
        alert("Veuillez remplir tous les champs.");
    }
});


const urlWorks =
    "http://localhost:5678/api-docs/";