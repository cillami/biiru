



const modulePattern = (function(){

return {

getLightBeers: function(){

var data = [];
$.get('https://api.punkapi.com/v2/beers?ebc_lt=15', (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned
    console.log(data);
    modulePattern.putBeersInDom(data);

}).catch(function(error){
	console.log("Error");
});
},

getDarkBeers: function(){

var data = [];
$.get('https://api.punkapi.com/v2/beers?ebc_gt=50', (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned
    console.log(data);
    modulePattern.putBeersInDom(data);

}).catch(function(error){
	console.log("Error");
});
},

getAllBeers: function(){

var data = [];
$.get('https://api.punkapi.com/v2/beers?page=2&per_page=80', (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned


    console.log(data);
    modulePattern.putBeersInDom(data);

}).catch(function(error){
	console.log("Error");
});
},


optionSelectBeers: function (choice) {
            console.log("click")
            var getBeers = modulePattern.getUserBeers(choice.target.value);
            
         },


getUserBeers: function(getBeers){
	console.log("Hihi")

var data = [];
$.get('https://api.punkapi.com/v2/beers?' + getBeers, (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned   
    modulePattern.putBeersInDom(data);

}).catch(function(error){
	console.log("Error");
});
},

// getBeers4Sort: function(data){

// var checked = document.getElementsByClassName("checkIt");
// var checkedResult = [];
 
// console.log(checked)

// 	for(var i = 0; i < 3; i++){

// 	if(checked[i].checked == true){

// 			checkedResult.push(checked[i].value)		
// 			console.log(checkedResult);
	 
// 	}
// }

// var hohohehe =[];
// for (var i = 0; i < data.length; i++) {
	
// 	hohohehe.push(data[i]);

// 	console.log(hohohehe[i].food_pairing)

// 	if(hohohehe[i].food_pairing === "spicy"){
// 		console.log("vaffaan")
	
// }

// }

// console.log(hohohehe)
// console.log(checkedResult)

// },


addEvent: function(){
document.getElementById('foodBeer-btn').addEventListener('click', modulePattern.getUserInput);
document.getElementById('lightBeers-btn').addEventListener('click', modulePattern.getLightBeers);
document.getElementById('darkBeers-btn').addEventListener('click', modulePattern.getDarkBeers);
document.getElementById('beers-btn').addEventListener('click', modulePattern.getAllBeers);
document.getElementById('getAlcBeer').addEventListener('change', modulePattern.optionSelectBeers);

},


getUserInput: function (e) {
	e.preventDefault();
	console.log("claaack")

var checked = document.getElementsByClassName("checkIt");
var checkedResult = [];
 
console.log(checked)

	for(var i = 0; i < 3; i++){

	if(checked[i].checked == true){

			checkedResult.push(checked[i].value)		
			console.log(checkedResult);
	 
	}
}
 
modulePattern.getFood(checkedResult);
 
   
},


getFood: function(checkedResult){

	// e.preventDefault();
	console.log("Click")
console.log(checkedResult)



checkedResult.forEach(function(element) {
    console.log(element)
    
 

if(element === "spicy"){

// var dataSpicy = [];

$.get('https://api.punkapi.com/v2/beers?food='+"spicy", (response) => { 
    var dataSpicy = [];
    dataSpicy = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned

    console.log(dataSpicy);
     modulePattern.putSpicyInDom(dataSpicy);

}).catch(function(error){
	console.log("Error");
});
}

if(element === "chocolate") {
//  console.log("sallad")
// var dataChocolate = [];
$.get('https://api.punkapi.com/v2/beers?food='+"chocolate", (response) => { 
    var dataChocolate = [];
    dataChocolate = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned
    console.log(dataChocolate);
     modulePattern.putChocolateInDom(dataChocolate);
}).catch(function(error){
	console.log("Error");
});

}
if(element === "citrus"){
// var dataCitrus = [];
$.get('https://api.punkapi.com/v2/beers?food='+"citrus", (response) => { 
    var dataCitrus = [];
    dataCitrus = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned
    console.log(dataCitrus);
    modulePattern.putCitrusInDom(dataCitrus);



}).catch(function(error){
	console.log("Error");
});
}


 

  //if
 


//} for-loopen

}); //forEach

},

putBeersInDom: (data) => {
	

	console.log("baaaah")
	if(data == ''){
		 console.log("Errorssss")
		let error = document.getElementById("errorMsg");

            var showError = `<li>Unfortunately we did not find any match. Change your search and try again.</li>`;
            errorMsg.innerHTML = showError;   	
	}
	else{
		let beer = document.getElementById("beerList");
        let showHTML = "";
            for (var i = 0; i < data.length ;i++){
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${data[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${data[i].name}</h4>
	                Alcohol: ${data[i].abv}%<br>
	                Food pairing: ${data[i].food_pairing.join(", ")} <br>
	                Description: ${data[i].description}
                </div>
                </div>`;
            beerList.innerHTML = showHTML;
        	}
 		
 
		}
	},

putChocolateInDom: (dataChocolate) => {
	
 
console.log(dataChocolate)

	if(dataChocolate == ''){
		 console.log("Errorssss")
		let error = document.getElementById("errorMsg");

            var showError = `<li>Unfortunately we did not find any match. Change your search and try again.</li>`;
            errorMsg.innerHTML = showError;   	
	}
	else{
		let beer = document.getElementById("chocolateList");
        let showHTML = "";
            for (var i = 0; i < dataChocolate.length ;i++){
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataChocolate[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataChocolate[i].name}</h4>
	                Alcohol: ${dataChocolate[i].abv}%<br>
	                Food pairing: ${dataChocolate[i].food_pairing.join(", ")} <br>
	                
                </div>
                </div>`;
            chocolateList.innerHTML = showHTML;
        	}
 		
 
		}
	},

putSpicyInDom: (dataSpicy) => {
	

	console.log("baaaah")
	if(dataSpicy == ''){
		 console.log("Errorssss")
		let error = document.getElementById("errorMsg");

            var showError = `<li>Unfortunately we did not find any match. Change your search and try again.</li>`;
            errorMsg.innerHTML = showError;   	
	}
	else{
		let beer = document.getElementById("spicyList");
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
	                
                </div>
                </div>`;
            spicyList.innerHTML = showHTML;
        	}
 		
 
		}
	},




putCitrusInDom: (dataCitrus) => {
	
 
	console.log("baaaah")
	if(dataCitrus == ''){
		 console.log("Errorssss")
		let error = document.getElementById("errorMsg");

            var showError = `<li>Unfortunately we did not find any match. Change your search and try again.</li>`;
            errorMsg.innerHTML = showError;   	
	}
	else{
		let beer = document.getElementById("citrusList");
        let showHTML = "";
        var bla ="";
            for (var i = 0; i < dataCitrus.length ;i++){
 
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataCitrus[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataCitrus[i].name}</h4>
	                Alcohol: ${dataCitrus[i].abv}%<br>
	                Food pairing: ${dataCitrus[i].food_pairing.join(", ")} <br>
 
                </div>
                </div>`;
            citrusList.innerHTML = showHTML;
        	}
        	
 		
 
		}
	}

};
})(); 

modulePattern.addEvent();
// console.log(modulePattern.getFood());

// deleteAlbumAPI();