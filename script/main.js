
const modulePattern = (function(){

return {

getLightBeers: function(){

var data = [];
$.get('https://api.punkapi.com/v2/beers?ebc_lt=15&page=1&per_page=80', (response) => { 
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
$.get('https://api.punkapi.com/v2/beers?ebc_gt=50&page=1&per_page=80', (response) => { 
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

selectAllBeers: function (choice) {
            console.log("click")
            var getAllBeers = modulePattern.getAllBeers(choice.target.value);        
},
getAllBeers: function(getAllBeers){

var data = [];
$.get('https://api.punkapi.com/v2/beers?' + getAllBeers, (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned
    console.log(data);
    modulePattern.putBeersInDom(data);
//lägg en ny get, skicka vidare till PUTINDOM
//pil längst ned ny request
}).catch(function(error){
	console.log("Error");
});
},


selectBeersByAlcohol: function (choice) {
            console.log("click")
            var getBeers = modulePattern.getBeersByAlcohol(choice.target.value);
            
 },

getBeersByAlcohol: function(getBeers){
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

selectBeersByFlavour: function (choice) {
            console.log("click")
            var getBeersByFlavour = modulePattern.sortBeersByFlavour(choice.target.value);
            
         },



sortBeersByFlavour: function(getBeersByFlavour){
console.log("clackity mackity")

var checked = document.getElementsByClassName("checkIt");
var checkedResult = [];
 
console.log(checked)

	for(var i = 0; i < 3; i++){

	if(checked[i].checked == true){

			checkedResult.push(checked[i].value)		
			console.log(checkedResult);
	 
	}
}
 
if(checkedResult == ''){
	 

var node = document.createElement("LI");                // Create a <li> node
var textnode = document.createTextNode("Please choose a flavour before continuing! (reload the page)");         // Create a text node
node.appendChild(textnode); // Append the text to <li>
node.setAttribute('class', 'node-class'); 
document.getElementById("error-foodList").appendChild(node);



} else {

//forEach loops through the array of choices made by the user
checkedResult.forEach(function(element) {
    console.log(element)
    
 
//checks if the array contains the word spicy
if(element === "spicy"){

$.get('https://api.punkapi.com/v2/beers?page=1&per_page=80&' + getBeersByFlavour + '&food=' + "spicy", (response) => { 
    var dataSpicy = [];
    dataSpicy = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response
    //has returned   

modulePattern.putSpicyInDom(dataSpicy);

}).catch(function(error){
	console.log("Error");
});


}

if(element === "chocolate") {

$.get('https://api.punkapi.com/v2/beers?' + getBeersByFlavour + '&food=' + "chocolate", (response) => { 
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

$.get('https://api.punkapi.com/v2/beers?' + getBeersByFlavour + '&food=' + "citrus", (response) => { 
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

}); //forEach
} //else-statment

},

addEvent: function(){
// document.getElementById('foodBeer-btn').addEventListener('click', modulePattern.sortBeersByFlavour);
document.getElementById('lightBeers-btn').addEventListener('click', modulePattern.getLightBeers);
document.getElementById('darkBeers-btn').addEventListener('click', modulePattern.getDarkBeers);
// document.getElementById('beers-btn').addEventListener('click', modulePattern.getAllBeers);
document.getElementById('getAlcBeer').addEventListener('change', modulePattern.selectBeersByAlcohol);
document.getElementById('getAllBeer').addEventListener('change', modulePattern.selectAllBeers);
document.getElementById('getAlcBeerByFlavour').addEventListener('change', modulePattern.selectBeersByFlavour);
document.getElementById('search-btn').addEventListener('click', modulePattern.getBeerPrice);

},

getBeerPrice: function() { 

	$.ajax(
	{
    url: 'https://karlroos-systemet.p.mashape.com/product?limit=100&name=brewdog&order_by=name', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
    	//
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        console.log(data);
        modulePattern.showPriceInDom(data);

       	// document.getElementById("output").innerHTML = data.source; 
        },
    error: function(error) { console.log("Error"); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "6myQMMIXtCmshRYsqqNr3ik67JNxp1JM1SIjsnsY9FE7luqhcI"); // Enter here your Mashape key
    }
});
},

showPriceInDom: (data) => {
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
                <div class="dom-wrapper-systembolaget">
                	<div class="dom-left">
                		<img src="${"http://press.systembolaget.se/wp-content/uploads/2016/06/SB_2015_300x168px.png"}" class="systemet-img"><br>
                		Tel: 0771 - 83 83 00<br>
                		<a href="https://www.systembolaget.se/butiker-ombud/" target="_blank">Systembolaget.se</a>
                	</div>
				<div class="dom-right">
	                <h4>${data[i].name}</h4>
	               	<h4>${data[i].name_2}</h4>
	                Price: ${data[i].price} SEK<br>
	               	Aclohol: ${(data[i].alcohol * 100).toFixed(0)}% <br>
                </div>
                </div>`;
            beerList.innerHTML = showHTML;
        	}
		}
	},

putBeersInDom: (data) => {
	
	console.log("baaaah")
	// if(data == ''){
	// 	 console.log("Errorssss")
	// 	let error = document.getElementById("errorMsg");

 //            var showError = `<li>Unfortunately we did not find any match. Change your search and try again.</li>`;
 //            errorMsg.innerHTML = showError;   	
	// }
	// else{
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
					 <p><h5>Food pairing:</h5> 
					 1. <a href="https://www.google.se/#q=${data[i].food_pairing[0]}" target="_blank">${data[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${data[i].food_pairing[1]}" target="_blank">${data[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${data[i].food_pairing[2]}" target="_blank">${data[i].food_pairing[2]}</a><br>
         


                </div>
                </div>`;
            beerList.innerHTML = showHTML;
        	}

		// }   
	},

putChocolateInDom: (dataChocolate) => {
	
 
console.log(dataChocolate)

	if(dataChocolate == ''){
		//  console.log("Errorssss")
		// let error = document.getElementById("errorMsg");

		var node = document.createElement("LI");                // Create a <li> node
		var textnode = document.createTextNode("C: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
		node.appendChild(textnode); // Append the text to <li>
		node.setAttribute('class', 'node-class'); 
		document.getElementById("errorMsg").appendChild(node);
            // var showError = `<li><h6>Unfortunately we did not find any beer that match with chocolate flavour. <br>
            // Change your search (reload the page) and try again.<h6></li>`;
            // errorMsg.innerHTML = showError;   	
	}
	else{
		let beer = document.getElementById("chocolateList");
        let showHTML = "";
        	for (var i = 0; i < dataChocolate.length; i++) {
        		var foods= dataChocolate[i].food_pairing;
        	}
 			for (var i = 0; i < foods.length; i++) {
 				console.log(foods[i]);
 				console.log(dataChocolate);
 			
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataChocolate[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataChocolate[i].name}</h4>
	                Alcohol: ${dataChocolate[i].abv}%<br>
					 <p><h5>Food pairing:</h5> 
					 1. <a href="https://www.google.se/#q=${dataChocolate[i].food_pairing[0]}" target="_blank">${dataChocolate[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${dataChocolate[i].food_pairing[1]}" target="_blank">${dataChocolate[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${dataChocolate[i].food_pairing[2]}" target="_blank">${dataChocolate[i].food_pairing[2]}</a><br>
         
                </div>
                </div>`;
            chocolateList.innerHTML = showHTML;
        	}
 
		}
	},

putSpicyInDom: (dataSpicy) => {
	console.log("baaaah")
	if(dataSpicy == ''){
		//  console.log("Errorssss")
		// let error = document.getElementById("errorMsg");

  //           var showError = `<li><h6>Unfortunately we did not find any beer that match with spciy food. <br>
  //           Change your search (reload the page) and try again.</h6></li>`;
  //           error.innerHTML = showError; 

var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode("SPICY: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
node.appendChild(textnode); 
node.setAttribute('class', 'node-class');                              // Append the text to <li>
document.getElementById("errorMsg").appendChild(node);  
	}
	else{
		
		let beer = document.getElementById("spicyList");
        let showHTML = "";
        	for (var i = 0; i < dataSpicy.length; i++) {
        		var foods= dataSpicy[i].food_pairing;
        	}
 			for (var i = 0; i < foods.length; i++) { 			
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataSpicy[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataSpicy[i].name}</h4>
	                Alcohol: ${dataSpicy[i].abv}%<br>
					 <p><h5>Food pairing:</h5> 
					 1. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[0]}" target="_blank">${dataSpicy[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[1]}" target="_blank">${dataSpicy[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[2]}" target="_blank">${dataSpicy[i].food_pairing[2]}</a><br>
         
                </div>
                </div>`;
            spicyList.innerHTML = showHTML;
        	}
		}
	},

putCitrusInDom: (dataCitrus) => {
	
 
	console.log("baaaah")
	if(dataCitrus == ''){
		// let error = document.getElementById("errorMsg");

  //           var showError = `<li><h6>Unfortunately we did not find any beer that match with citrusy flavours. <br>
  //           Change your search (reload the page) and try again.</h6></li>`;
  //           error.innerHTML = showError; 

		var node = document.createElement("LI");                 // Create a <li> node
		var textnode = document.createTextNode("CITRUS: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
		node.appendChild(textnode); 
		node.setAttribute('class', 'node-class');                             // Append the text to <li>
		document.getElementById("errorMsg").appendChild(node);     // Append <li> to <ul> with id="myList"

	}
	else{
		let beer = document.getElementById("citrusList");
        let showHTML = "";
        	for (var i = 0; i < dataCitrus.length; i++) {
        		var foods= dataCitrus[i].food_pairing;
        	}
 			for (var i = 0; i < foods.length; i++) {
 				console.log(foods[i]);
 				console.log(dataCitrus);
 			
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataCitrus[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataCitrus[i].name}</h4>
	                Alcohol: ${dataCitrus[i].abv}%<br>
					 <p><h5>Food pairing:</h5> 
					 1. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[0]}" target="_blank">${dataCitrus[i].food_pairing[0]}.</a><br>
					 2. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[1]}" target="_blank">${dataCitrus[i].food_pairing[1]}.</a><br>
					 3. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[2]}" target="_blank">${dataCitrus[i].food_pairing[2]}.</a><br>
         
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
