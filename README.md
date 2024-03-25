# Artist App 

## Run app locally
npx tsc src/app.ts --outDir dist

## Objective: Create a TypeScript app for an art gallery to manage a simple database of artists
and their artworks. The app should function while the browser is open, with no need for data
persistence after closing the browser.

## Data Fields: Include artist ID, name, DOB, gender (“Female”, “Male”, “Unspecified”), artwork
type (“painting”, “sculpture”, “photograph”, “video art”, “digital art”, “printmaking”), contact
info, exhibition date, and special notes. All fields, except 'Special notes,' require values. The
‘Gender’ and ‘Artwork type’ field values must be one of the options shown. An artist ID can
only be entered and saved once (it must be unique for each artist). An artist can be a featured
artist or a regular artist, so find a way to specify an artist as a featured artist.

## Features:
- Add, edit, and update artist data.
- Delete artists with confirmation prompts.
- Search functionality based on artist ID.
- Display all artists in the database.
- Display all featured artists in the database.
