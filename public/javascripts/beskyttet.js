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
        // Hent brukernavn (vil være satt av serveren når siden ble vist)
        const welcomeDiv = document.getElementById('welcome');
        welcomeDiv.innerHTML = '<p>Du er logget inn. Hent databasedata nedenfor.</p>';

        // Hent biler
        const bilerResponse = await fetch('/biler');
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
    }
});
