// Artist Interface
interface Artist {
    id: number;
    name: string;
    dob: string;
    gender: "Female" | "Male" | "Unspecified";
    artworkType: "Painting" | "Sculpture" | "Photograph" | "Video Art" | "Digital Art" | "Printmaking";
    contactInfo: string;
    exhibitionDate: string;
    specialNotes?: string;
    featured?: boolean;
}

let artists: Artist[] = [];

// Load artists from session storage when the page loads
window.addEventListener('load', () => {
    const storedArtists = sessionStorage.getItem('artists');
    if (storedArtists) {
        artists = JSON.parse(storedArtists);
        displayArtists();
    }
});

/**
 * addArtist Function to store data in session storage
 * @param artist object
 */
function addArtist(artist: Artist): void {
    if (!artists.some(a => a.id === artist.id)) {
        artists.push(artist);
        updateSessionStorage();
    } else {
        console.error("Artist ID must be unique.");
        showErrorAlert("Artist ID must be unique.");
    }
}

/**
 * addFeaturedArtist function to store featured artist data in session storage
 * @param id 
 */
function addFeaturedArtist(id: number): void {
    let index = -1;
    for (let i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        artists[index].featured = true;
        updateSessionStorage();
    } else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}

/**
 * removeFeaturedArtist function to remove the featured artist from session storage
 * @param id 
 */
function removeFeaturedArtist(id: number): void {
    let index = -1;
    for (let i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        delete artists[index].featured;
        updateSessionStorage();
    } else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}

/**
 * editArtist getting requested artist from session storage
 * @param id 
 * @param updatedArtist 
 */
function editArtist(id: any, updatedArtist: any) {
    var index = -1;
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        var originalArtist: any = artists[index];
        for (var key in updatedArtist) {
            if (Object.prototype.hasOwnProperty.call(updatedArtist, key)) {
                originalArtist[key] = updatedArtist[key];
            }
        }
        updateSessionStorage();
    } else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}

/**
 * deleteArtist function to delete an artist from session storage
 * @param id 
 */
function deleteArtist(id: number): void {
    artists = artists.filter(artist => artist.id !== id);
    updateSessionStorage();
    window.location.reload();
}

/**
 * updateSessionStorage function to sync the session storage along with operations UI is manipulating
 */
function updateSessionStorage(): void {
    sessionStorage.setItem('artists', JSON.stringify(artists));
}

/**
 * displayArtists function to render the list of artists in the UI
 */
function displayArtists(): void {
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.innerHTML = `
            <h2>Artists</h2>
            <div class="row">
                ${artists.map(artist => `
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${artist.name}</h5>
                                <p class="card-text">Date of Birth: ${artist.dob}</p>
                                <p class="card-text">Gender: ${artist.gender}</p>
                                <p class="card-text">Artwork Type: ${artist.artworkType}</p>
                                <p class="card-text">Contact Info: ${artist.contactInfo}</p>
                                <p class="card-text">Exhibition Date: ${artist.exhibitionDate}</p>
                                ${artist.specialNotes ? `<p class="card-text">Special Notes: ${artist.specialNotes}</p>` : ''}
                                <button class="btn btn-danger me-2" onclick="deleteArtist(${artist.id})">Delete</button>
                                <button class="btn btn-primary" onclick="editArtistForm(${artist.id})">Edit</button>
                            </div>
                        </div>
                    </div>`).join('')}
            </div>
        `;
    }
}

// Function to handle form submission
document.getElementById('artistForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const idElement = document.getElementById('id') as HTMLInputElement | null;
    const nameElement = document.getElementById('name') as HTMLInputElement | null;
    const dobElement = document.getElementById('dob') as HTMLInputElement | null;
    const genderElement = document.getElementById('gender') as HTMLSelectElement | null;
    const artworkTypeElement = document.getElementById('artworkType') as HTMLSelectElement | null;
    const contactInfoElement = document.getElementById('contactInfo') as HTMLInputElement | null;
    const exhibitionDateElement = document.getElementById('exhibitionDate') as HTMLInputElement | null;
    const specialNotesElement = document.getElementById('specialNotes') as HTMLTextAreaElement | null;
    const featuredElement = document.getElementById('featured') as HTMLInputElement | null;

    if (!idElement || !nameElement || !dobElement || !genderElement || !artworkTypeElement || !contactInfoElement || !exhibitionDateElement || !specialNotesElement || !featuredElement) {
        console.error("One or more form elements not found.");
        showErrorAlert("One or more form elements not found.");
        return;
    }

    const id = Number(idElement.value);
    const name = nameElement.value;
    const dob = dobElement.value;
    const gender = genderElement.value as "Female" | "Male" | "Unspecified";
    const artworkType = artworkTypeElement.value as "Painting" | "Sculpture" | "Photograph" | "Video Art" | "Digital Art" | "Printmaking";
    const contactInfo = contactInfoElement.value;
    const exhibitionDate = exhibitionDateElement.value;
    const specialNotes = specialNotesElement.value;
    const featured = featuredElement.checked;

    const artist = { id, name, dob, gender, artworkType, contactInfo, exhibitionDate, specialNotes, featured };

    // Check if the artist ID already exists in the artists array
    let existingArtistIndex = -1;
    for (let i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            existingArtistIndex = i;
            break;
        }
    }

    if (existingArtistIndex !== -1) {
        // If the artist exists, update the artist
        editArtist(id, artist);
    } else {
        // If the artist does not exist, add a new artist
        addArtist(artist);
    }

    window.location.reload();
});



// Function to populate the form with artist information for editing
function editArtistForm(id: number): void {
    let artist = null;
    for (let i = 0; i < artists.length; i++) {
        if (artists[i].id === id) {
            artist = artists[i];
            break;
        }
    }

    if (artist) {
        const idInput = document.getElementById('id') as HTMLInputElement;
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const dobInput = document.getElementById('dob') as HTMLInputElement;
        const genderSelect = document.getElementById('gender') as HTMLSelectElement;
        const artworkTypeSelect = document.getElementById('artworkType') as HTMLSelectElement;
        const contactInfoInput = document.getElementById('contactInfo') as HTMLInputElement;
        const exhibitionDateInput = document.getElementById('exhibitionDate') as HTMLInputElement;
        const specialNotesInput = document.getElementById('specialNotes') as HTMLTextAreaElement;
        const featuredCheckbox = document.getElementById('featured') as HTMLInputElement;

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
    } else {
        console.error("Artist not found.");
        showErrorAlert("Artist not found.");
    }
}

/**
 * searchArtistById function to search artist using searchbox and consuming editArtistForm method
 */
function searchArtistById() {
    let artistIdFromSearchBox = document.getElementById('searchBox') as HTMLInputElement;
    editArtistForm(Number(artistIdFromSearchBox.value));
}

// Function to show the error alert
function showErrorAlert(message: string) {
    const errorAlert = document.getElementById('errorAlert');
    if (errorAlert) {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';

        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 2000);
    }
}

// Display artists when the page loads
window.addEventListener('load', displayArtists);
