var _a;
var artists = [];
// Load artists from session storage when the page loads
window.addEventListener('load', function () {
    var storedArtists = sessionStorage.getItem('artists');
    if (storedArtists) {
        artists = JSON.parse(storedArtists);
        displayArtists();
    }
});
/**
 * addArtist Function to store data in session storage
 * @param artist object
 */
function addArtist(artist) {
    if (!artists.some(function (a) { return a.id === artist.id; })) {
        artists.push(artist);
        updateSessionStorage();
    }
    else {
        console.error("Artist ID must be unique.");
        showErrorAlert("Artist ID must be unique.");
    }
}
/**
 * addFeaturedArtist function to store featured artist data in session storage
 * @param id
 */
function addFeaturedArtist(id) {
    var index = -1;
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        artists[index].featured = true;
        updateSessionStorage();
    }
    else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}
/**
 * removeFeaturedArtist function to remove the featured artist from session storage
 * @param id
 */
function removeFeaturedArtist(id) {
    var index = -1;
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        delete artists[index].featured;
        updateSessionStorage();
    }
    else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}
/**
 * editArtist getting requested artist from session storage
 * @param id
 * @param updatedArtist
 */
function editArtist(id, updatedArtist) {
    var index = -1;
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        var originalArtist = artists[index];
        for (var key in updatedArtist) {
            if (Object.prototype.hasOwnProperty.call(updatedArtist, key)) {
                originalArtist[key] = updatedArtist[key];
            }
        }
        updateSessionStorage();
    }
    else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}
/**
 * deleteArtist function to delete an artist from session storage
 * @param id
 */
function deleteArtist(id) {
    artists = artists.filter(function (artist) { return artist.id !== id; });
    updateSessionStorage();
    window.location.reload();
}
/**
 * updateSessionStorage function to sync the session storage along with operations UI is manipulating
 */
function updateSessionStorage() {
    sessionStorage.setItem('artists', JSON.stringify(artists));
}
/**
 * displayArtists function to render the list of artists in the UI
 */
function displayArtists() {
    var appElement = document.getElementById('app');
    if (appElement) {
        appElement.innerHTML = "\n            <h2>Artists</h2>\n            <div class=\"row\">\n                ".concat(artists.map(function (artist) { return "\n                    <div class=\"col-md-3 mb-4\">\n                        <div class=\"card\">\n                            <div class=\"card-body\">\n                                <h5 class=\"card-title\">".concat(artist.name, "</h5>\n                                <p class=\"card-text\">Date of Birth: ").concat(artist.dob, "</p>\n                                <p class=\"card-text\">Gender: ").concat(artist.gender, "</p>\n                                <p class=\"card-text\">Artwork Type: ").concat(artist.artworkType, "</p>\n                                <p class=\"card-text\">Contact Info: ").concat(artist.contactInfo, "</p>\n                                <p class=\"card-text\">Exhibition Date: ").concat(artist.exhibitionDate, "</p>\n                                ").concat(artist.specialNotes ? "<p class=\"card-text\">Special Notes: ".concat(artist.specialNotes, "</p>") : '', "\n                                <button class=\"btn btn-danger me-2\" onclick=\"deleteArtist(").concat(artist.id, ")\">Delete</button>\n                                <button class=\"btn btn-primary\" onclick=\"editArtistForm(").concat(artist.id, ")\">Edit</button>\n                            </div>\n                        </div>\n                    </div>"); }).join(''), "\n            </div>\n        ");
    }
}
// Function to handle form submission
(_a = document.getElementById('artistForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    var idElement = document.getElementById('id');
    var nameElement = document.getElementById('name');
    var dobElement = document.getElementById('dob');
    var genderElement = document.getElementById('gender');
    var artworkTypeElement = document.getElementById('artworkType');
    var contactInfoElement = document.getElementById('contactInfo');
    var exhibitionDateElement = document.getElementById('exhibitionDate');
    var specialNotesElement = document.getElementById('specialNotes');
    var featuredElement = document.getElementById('featured');
    if (!idElement || !nameElement || !dobElement || !genderElement || !artworkTypeElement || !contactInfoElement || !exhibitionDateElement || !specialNotesElement || !featuredElement) {
        console.error("One or more form elements not found.");
        showErrorAlert("One or more form elements not found.");
        return;
    }
    var id = Number(idElement.value);
    var name = nameElement.value;
    var dob = dobElement.value;
    var gender = genderElement.value;
    var artworkType = artworkTypeElement.value;
    var contactInfo = contactInfoElement.value;
    var exhibitionDate = exhibitionDateElement.value;
    var specialNotes = specialNotesElement.value;
    var featured = featuredElement.checked;
    var artist = { id: id, name: name, dob: dob, gender: gender, artworkType: artworkType, contactInfo: contactInfo, exhibitionDate: exhibitionDate, specialNotes: specialNotes, featured: featured };
    // Check if the artist ID already exists in the artists array
    var existingArtistIndex = -1;
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            existingArtistIndex = i;
            break;
        }
    }
    if (existingArtistIndex !== -1) {
        // If the artist exists, update the artist
        editArtist(id, artist);
    }
    else {
        // If the artist does not exist, add a new artist
        addArtist(artist);
    }
    window.location.reload();
});
// Function to populate the form with artist information for editing
function editArtistForm(id) {
    var artist = null;
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            artist = artists[i];
            break;
        }
    }
    if (artist) {
        var idInput = document.getElementById('id');
        var nameInput = document.getElementById('name');
        var dobInput = document.getElementById('dob');
        var genderSelect = document.getElementById('gender');
        var artworkTypeSelect = document.getElementById('artworkType');
        var contactInfoInput = document.getElementById('contactInfo');
        var exhibitionDateInput = document.getElementById('exhibitionDate');
        var specialNotesInput = document.getElementById('specialNotes');
        var featuredCheckbox = document.getElementById('featured');
        if (!idInput || !nameInput || !dobInput || !genderSelect || !artworkTypeSelect || !contactInfoInput || !exhibitionDateInput || !specialNotesInput || !featuredCheckbox) {
            console.error("One or more form elements not found.");
            showErrorAlert("One or more form elements not found.");
            return;
        }
        idInput.value = String(artist.id);
        nameInput.value = artist.name;
        dobInput.value = artist.dob;
        genderSelect.value = artist.gender;
        artworkTypeSelect.value = artist.artworkType;
        contactInfoInput.value = artist.contactInfo;
        exhibitionDateInput.value = artist.exhibitionDate;
        specialNotesInput.value = artist.specialNotes || '';
        featuredCheckbox.checked = !!artist.featured;
    }
    else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}
/**
 * searchArtistById function to search artist using searchbox and consuming editArtistForm method
 */
function searchArtistById() {
    var artistIdFromSearchBox = document.getElementById('searchBox');
    editArtistForm(Number(artistIdFromSearchBox.value));
}
// Function to show the error alert
function showErrorAlert(message) {
    var errorAlert = document.getElementById('errorAlert');
    if (errorAlert) {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        setTimeout(function () {
            errorAlert.style.display = 'none';
        }, 2000);
    }
}
// Display artists when the page loads
window.addEventListener('load', displayArtists);
