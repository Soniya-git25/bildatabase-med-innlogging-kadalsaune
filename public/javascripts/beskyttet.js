// Logg ut funksjon
async function loggUt() {
    try {
        const response = await fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alert("Du er nå logget ut");
            window.location.href = "/login";
        } else {
            alert("En feil oppstod ved utlogging");
        }
    } catch (error) {
        alert("En feil oppstod: " + error.message);
    }
}

// Hent og vis data fra databasen når siden lastes
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Hent brukerinformasjon
        const brukerResponse = await fetch('/beskyttet/bruker');
        if (!brukerResponse.ok) {
            if (brukerResponse.status === 401) {
                window.location.href = '/login';
                return;
            }
            throw new Error('Kunne ikke hente brukerinformasjon');
        }
        const bruker = await brukerResponse.json();
        const welcomeDiv = document.getElementById('welcome');
        welcomeDiv.innerHTML = `<p>Velkommen, ${bruker.fornavn}! Du er logget inn og kan se informasjon fra databasen.</p>`;

        // Hent biler
        const bilerResponse = await fetch('/biler');
        if (!bilerResponse.ok) {
            throw new Error('Kunne ikke hente biler');
        }
        const biler = await bilerResponse.json();
        const bilerList = document.getElementById('biler-list');
        if (Array.isArray(biler) && biler.length > 0) {
            bilerList.innerHTML = '<ul>' + biler.map(bil => 
                `<li>${bil.merke} ${bil.modell} (${bil.aar})</li>`
            ).join('') + '</ul>';
        } else {
            bilerList.innerHTML = '<p>Ingen biler i databasen</p>';
        }

        // Hent personer
        const personerResponse = await fetch('/personer');
        if (!personerResponse.ok) {
            throw new Error('Kunne ikke hente personer');
        }
        const personer = await personerResponse.json();
        const personerList = document.getElementById('personer-list');
        if (Array.isArray(personer) && personer.length > 0) {
            personerList.innerHTML = '<ul>' + personer.map(person => 
                `<li>${person.fornavn} ${person.etternavn} (${person.epost})</li>`
            ).join('') + '</ul>';
        } else {
            personerList.innerHTML = '<p>Ingen personer i databasen</p>';
        }
    } catch (error) {
        console.error('Feil ved henting av data:', error);
        // Hvis det er en autentiseringsfeil, redirect til login
        if (error.message.includes('401') || error.message.includes('Kunne ikke hente brukerinformasjon')) {
            window.location.href = '/login';
        } else {
            alert('En feil oppstod ved lasting av siden: ' + error.message);
        }
    }
});
