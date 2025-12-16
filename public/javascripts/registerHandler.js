async function registrerBruker(event) {
    event.preventDefault();

    const fornavn = document.querySelector("#fornavn").value;
    const etternavn = document.querySelector("#etternavn").value;
    const epost = document.querySelector("#epost").value;
    const passord = document.querySelector("#passord").value;
    const passordBekreft = document.querySelector("#passordBekreft").value;

    // Validate that passwords match
    if (passord !== passordBekreft) {
        alert("Passordene samsvarer ikke");
        return;
    }

    // Validate password length
    if (passord.length < 6) {
        alert("Passord må være minst 6 tegn");
        return;
    }

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fornavn, etternavn, epost, passord })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            window.location.href = "/login";
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("En feil oppstod: " + error.message);
    }
}
