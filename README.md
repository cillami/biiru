Namn: Cecilia Minami  
Kurs: JavaScript2  
Utbildning: Frontend 16

[Länk till projektet](https://cillami.github.io/biiru/index.html)

## BrewDog beer, food and recipes

Ger användaren förslag på maträtter, med receptlänkar, som passar bra till olika sorters öl från BrewDog. 
Det går att sortera efter smakförslag och efter alkoholhalt för att få fram passande öl och maträtter. Användaren kan även sortera ut öl baserat på alkoholhalt eller färg och får även då förslag på passande maträtter. Det går också att se vilka av BrewDogs öl som finns på Systembolaget och vad de kostar. 

## Verktyg och program
* JavaScript
* jQuery 
* Ajax
* HTML/CSS 
* Sass
* Bootstrap
* Photoshop
* XD

## API:er

BrewDogs, API med information om BrewDogs olika ölsorter: https://punkapi.com/documentation/v2  
Systembolaget, API med information om Systembolagets alla alkoholhaltiga drycker: https://market.mashape.com/karlroos/systemet

## Arbetsprocess

Det tog lång tid att komma underfund med vad för sorts API som jag ville använda. Tillslut hittade jag BrewDogs API om öl som jag tänkte att jag skulle kunna göra något roligt med. Jag har skrivit min kod i ett module pattern objekt och försökt strukturera och separerat den på ett logiskt sätt. Med Bootstrap och egen css har sidan blivit responsiv. Jag har använt jQuery get-metod för att hämta data asynkront och lagt in en loading indikator som meddelar användaren att data hämtas genom en gif + ett meddelande. 

## To do-lista
* Vissa properties från APIt är null, den datan vill jag inte visa i min HTML
* Vid ett tillfälle rensas inte sidan på data när ett nytt anrop görs
* Korta ner delar av koden
* 

