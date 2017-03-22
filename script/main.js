
const modulePattern = (function(){

//showAllMovies: (moviesArray) => 
return {

getAlcoholFree: function(){

var data = [];
$.get('https://api.punkapi.com/v2/beers?abv_lt=1', (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned


    console.log(data);
    modulePattern.putInDom(data);

}).catch(function(error){
	console.log("Error");
});
},

// getMoviesFromDatabase();
// document.getElementById('alcoholFree-btn').addEventListener('click', getAlcoholFree);

getUserInput: function (e) {
	e.preventDefault();
	console.log("claaack")

	if(spicy = document.getElementById("spicy").checked){
		console.log("checked spicy");
        modulePattern.getFood(spicy);
    }

    else{
        console.log("Nohting spicy thanks");
    }
    if(chocolate = document.getElementById("chocolate").checked){
    			console.log("checked chocolate");
         modulePattern.getFood(chocolate);
    }

    else{
        console.log("No chocolate thanks");
    }
    if(citrus = document.getElementById("citrus").checked){
    			console.log("checked citrus");
         modulePattern.getFood(citrus);
    }

    else{
        console.log("Nothing citrusy");
    }
   
},

addEvent: function(){
document.getElementById('foodBeer-btn').addEventListener('click', modulePattern.getUserInput);
document.getElementById('alcoholFree-btn').addEventListener('click', modulePattern.getAlcoholFree);
},


getFood: function(spicy, chocolate, citrus){

	// e.preventDefault();
	console.log("Click")
	console.log(spicy)
		console.log(chocolate)
			console.log(citrus)

    // var spicy =document.getElementById("spicy").value;
    // var chocolate =document.getElementById("chocolate").value;
    // var citrus =document.getElementById("citrus").value;


if(spicy === true){
	console.log(spicy)
var addSpicy =document.getElementById("spicy").value;
var dataSpicy = [];

$.get('https://api.punkapi.com/v2/beers?food='+addSpicy, (response) => { 
    dataSpicy = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned


    console.log(dataSpicy);
    modulePattern.putInDom(dataSpicy);

}).catch(function(error){
	console.log("Error");
});
}
else{
	console.log("No Spicy")
}
if(chocolate === true){
		console.log(chocolate)
var addChocolate =document.getElementById("chocolate").value;
var dataChocolate = [];
$.get('https://api.punkapi.com/v2/beers?food='+addChocolate, (response) => { 
    dataChocolate = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned


    console.log(dataChocolate);
    modulePattern.putInDom(dataChocolate);

}).catch(function(error){
	console.log("Error");
});
}
else{
	console.log("No Chocolate")
}

if(citrus === true){
		console.log(citrus)
	var addCitrus =document.getElementById("citrus").value;
var dataCitrus = [];
$.get('https://api.punkapi.com/v2/beers?food='+addCitrus, (response) => { 
    dataCitrus = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned


    console.log(dataCitrus);
    modulePattern.putInDom(dataCitrus);

}).catch(function(error){
	console.log("Error");
});
}
else{
	console.log("No Citrus")
}

},






putInDom: (dataSpicy) => {
	
	if(dataSpicy == ''){
		 console.log("Errorssss")
		let error = document.getElementById("errorMsg");

            var showError = `<li>Unfortunately we did not find any match. Change your search and try again.</li>`;
            errorMsg.innerHTML = showError;   	
	}
	else{
		let beer = document.getElementById("beerList");
        let showHTML = "";
            for (var i = 0; i < dataSpicy.length ;i++){
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataSpicy[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataSpicy[i].name}</h4>
	                Alcohol: ${dataSpicy[i].abv}%<br>
	                Food pairing: ${dataSpicy[i].food_pairing.join(", ")} <br>
	                Description: ${dataSpicy[i].description}
                </div>
                </div>`;
            beerList.innerHTML = showHTML;
        	}
 		
 
		}
	}

};
})(); 
 
modulePattern.addEvent();

// deleteAlbumAPI();