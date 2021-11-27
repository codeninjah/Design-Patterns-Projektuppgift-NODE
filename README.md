seed.js användes för att seeda databasen eftersom den slumpar Id för produkter och namn har vi skapat reSeed.js och en kopia av databasen (databaseCopy) för återställa databasen inför tester

Vi har skapat tester för hur anropet till enpoints skickar rätt värden och då kontrollerat:
statuskod, vad som skickas tillbaka

Sedan har vi skapat tester för hur olika felvärden eller när resurser inte finns eller redan finns skapar statuskod 404 genom att det kastas error.


# Design-Patterns-Projektuppgift-NODE

## Projektuppgift: Node
Er uppgift är att skriva ett REST API för en webbshop, med hjälp av TDD. **Det betyder att ni så att säga ska koda baklänges:**

* Utgå från kravspecifikationen (denna instruktion)
* Diskutera kraven tills alla i gruppen förstår dem
* Hoppa över user stories
* Formulera acceptanskriterier för kraven, om det behövs
* Hitta på lämpliga testfall
* Skriv ett testfall i taget → skriv sedan kod som gör testfallet grönt → refaktorera sedan tills koden är clean

*Obs! I ett riktigt projekt hade vi börjat från andra hållet:\
Ta reda på vad användarna ska kunna göra genom att konstruera user stories\
Ta fram de endpoints som behövs för att lösa våra user stories*


Bestäm vilken sorts produkter webbshopen ska sälja.\
Backend-koden ska använda Express, Jest och SuperTest. [Lästips](https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf) \
Ni ska inte ha någon riktig databas. Använd en "in memory" array och lägg alla databas-funktioner i en separat fil. Vi använder ***separation of concerns*** och ***decoupling*** för att möjliggöra lätt byte till annan databas.

API:et ska vara **RESTful** och ha följande endpoints. ":id" betyder att det ska finnas en URL-parameter, som används för att identifiera en produkt unikt. Interface är ett sätt att beskriva vilka egenskaper ett objekt ska ha, och vilken datatyp de ska vara. Interface används i TypeScript.

| Metod | Resurs |
| ------ | ------ |
| GET | /api/products/ |
| GET | /api/products/:id |
| POST | /api/products/ |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |


Ett produkt-objekt ska se ut så här:
```javascript
interface Product {
    id: string; 	// unikt värde för varje produkt
    name: string;   // produktens namn
    price: number;  // produktens pris i SEK
}
```

| Metod | Resurs |
| ------ | ------ |
| GET | /api/users/ |
| GET | /api/users/:id |
| POST | /api/users/ |
| DELETE | /api/users/:id |


Ett user-objekt ska se ut så här:
```javascript
interface User {
    name: string;   // användarens namn
    login: string;  // unikt värde, används vid inloggning
}
```

| Metod | Resurs |
| ------ | ------ |
| GET | /api/carts/:userLogin |
| POST | /api/carts/:userLogin/ |
| PUT | /api/carts/:userLogin/:itemId |
| DELETE | /api/carts/:userLogin/:itemId |


En cart (kundvagn) ska vara en array med produkter:
```javascript
interface CartItem {
    productId: string;  // id för den produkt som refereras till
    amount: number; 	// antal produkter av den sorten
}
```
Varje endpoint ska testas med minst ett testfall!



# Sätt igång:

1. Clona denna repo
2. `npm install`
