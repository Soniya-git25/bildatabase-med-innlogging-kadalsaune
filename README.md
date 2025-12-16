[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ilpUk_wl)
# Bildatabase med innlogging

Dette skal bli en bildatabase der man må logge inn for å se informasjon fra databasen.

I malen er det satt opp En grunnleggende express-mal med routes og SQLite-database.
Lag en egen HTML-side med et skjema der brukeren kan skrive inn informasjon for å opprette ny bruker.
Lag JavaScript som sender registreringsdataene til serveren ved hjelp av `fetch`.
Lag en ny rute i Express som tar imot dataene, krypterer passordet og lagrer brukeren i databasen.
Send en bekreftelse tilbake til frontend når brukeren er opprettet.
Test at brukeren kan logge inn etter registrering.

**For å kjøre Express-appen, stå i rotmappen i terminalen og kjør følgende kommandoer:**

```shell
npm install
npm start
```

For å se innholdet i databasen kan du åpne `localhost:3000/personer` og `localhost:3000/biler`
