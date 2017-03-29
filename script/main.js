//Module pattern object
const modulePattern = (function(){

return {

getLightBeers: function(){
$(document).ajaxStart(function () {
	var text = "Beers are loading, please wait..";
    loadingDiv.innerHTML += text;
    $("#loading").show();
});
var data = [];
//The callback parameter response holds the content of the requested page
$.get('https://api.punkapi.com/v2/beers?ebc_lt=15&page=1&per_page=80', (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response has returned
    $(document).ajaxComplete(function () {
    $("#loadingDiv").hide();
	});
    modulePattern.putBeersInDom(data);

}).catch(function(xhr) {
	console.log(xhr)
    alert("ERROR! Something went wrong please try again. \n \n" + xhr.responseText);
});

document.getElementById('lightBeers-btn').addEventListener('click', modulePattern.getLightBeers);
;
},

getMediumBeers: function(){

$(document).ajaxStart(function () {
	var text = "Beers are loading, please wait..";
    loadingDiv.innerHTML += text;
    $("#loading").show();

});

var data = [];
$.get('https://api.punkapi.com/v2/beers?ebc_gt=15&ebc_lt=50&page=1&per_page=80', (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response has returned     
    $(document).ajaxComplete(function () {
    $("#loadingDiv").hide();
});
    modulePattern.putBeersInDom(data);
// xhr = XMLHttpRequest Object  
}).catch(function(xhr) {
	console.log(xhr)
    alert("ERROR! Something went wrong please try again. \n \n" + xhr.responseText);
});
},

getDarkBeers: function(){

$(document).ajaxStart(function () {
	var text = "Beers are loading, please wait..";
    loadingDiv.innerHTML += text;
    $("#loading").show();
});

var data = [];
$.get('https://api.punkapi.com/v2/beers?ebc_gt=50&page=1&per_page=80', (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response has returned
    $(document).ajaxComplete(function () {
    $("#loadingDiv").hide();
});
    modulePattern.putBeersInDom(data);
}).catch(function(error){
	alert("Error");
});
},

getBeerPrice: function() { 

	$.ajax(
	{
    url: 'https://karlroos-systemet.p.mashape.com/product?limit=100&name=brewdog&order_by=name', // URL to the API
    type: 'GET', // The HTTP Method, GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    ajaxStart: 
	$(document).ajaxStart(function () {
	var text = "Beers are loading, please wait..";
    loadingDiv.innerHTML += text;
    $("#loading").show();
	}),
    success: function(data) {
        //Change data.source to data.something , where something is whichever part of the object you want returned.

	    $(document).ajaxComplete(function () {
	    $("#loadingDiv").hide();

		});
	    modulePattern.showPriceInDom(data);
        },

	//error Object
	error: function(errorObject, statusText, errorThrown) {
		alert("ERROR! \n \n" + errorThrown);
	},
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "6myQMMIXtCmshRYsqqNr3ik67JNxp1JM1SIjsnsY9FE7luqhcI"); 
    // Mashape key
    }
});
},



selectAllBeers: function (choice) {
    var getAllBeers = modulePattern.getAllBeers(choice.target.value);        
},
getAllBeers: function(getAllBeers){

$(document).ajaxStart(function () {
	var text = "Beers are loading, please wait..";
    loadingDiv.innerHTML += text;
    $("#loadingDiv").show();
});
//v2/beers?
var data = [];
$.get('https://api.punkapi.com/' + getAllBeers, (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response has returned
    $(document).ajaxComplete(function () {
    $("#loading").hide();
});
    modulePattern.putBeersInDom(data);
}).catch(function(error){
	alert("Error");
});
},


selectBeersByAlcoholContent: function (choice) {
	var getBeers = modulePattern.getBeersByAlcoholContent(choice.target.value);
            
 },

getBeersByAlcoholContent: function(getBeers){

$(document).ajaxStart(function () {
	var text = "Beers are loading, please wait..";
    loadingDiv.innerHTML += text;
    $("#loading").show();
});

var data = [];
$.get('https://api.punkapi.com/v2/beers?' + getBeers, (response) => { 
    data = response;
    //Only in the callback are we sure that data has been saved,
    //the anonym function will run on success, when the response has returned   
    $(document).ajaxComplete(function () {
    $("#loadingDiv").hide();
});
    modulePattern.putBeersInDom(data);

}).catch(function(error){
	alert("Error");
});
},

selectAlcoholContentAndFlavour: function (choice) {
    var getBeersByFlavour = modulePattern.sortBeersByFlavour(choice.target.value);          
},

sortBeersByFlavour: function(getBeersByFlavour){
console.log("clackity mackity")
//get checkboxes
var checked = document.getElementsByClassName("checkIt");
var checkedResult = [];
//checks if some of the 6 checkboxes are checked
//pushes them into an array to be used later
for(var i = 0; i < 6; i++){
	if(checked[i].checked == true){
		checkedResult.push(checked[i].value);		
	}
}
 
 //controls if the user has checked a checkbox before continuing
if(checkedResult == ''){
	var node = document.createElement("LI");  // Create a <li> node
	var textnode = document.createTextNode("Please choose a flavour before continuing! (reload the page)");  // Create a text node
	node.appendChild(textnode); // Append the text to <li>
	node.setAttribute('class', 'node-class'); 
	document.getElementById("error-foodList").appendChild(node);
	} 
else {
	//forEach loops through the array of choices (checked checkboxes) made by the user
	checkedResult.forEach(function(element){

	//checks if the array contains the word spicy
if(element === "spicy"){

	$(document).ajaxStart(function () {
		var text = "Beers are loading, please wait..";
	    loadingDiv.innerHTML += text;
	    $("#loading").show();
	});

	$.get('https://api.punkapi.com/v2/beers?food=spicy&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
	    var dataSpicy = [];
	    dataSpicy = response;
	    //Only in the callback are we sure that data has been saved,
	    //the anonym function will run on success, when the response has returned   
	    $(document).ajaxComplete(function () {
    	$("#loadingDiv").hide();
		});
		modulePattern.putSpicyInDom(dataSpicy);

	}).catch(function(error){
		alert("Error")
	});
	}

if(element === "chocolate") {

		$(document).ajaxStart(function () {
		var text = "Beers are loading, please wait..";
	    loadingDiv.innerHTML += text;
	    $("#loading").show();
	});

	$.get('https://api.punkapi.com/v2/beers?food=chocolate&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
	    var dataChocolate = [];
	    dataChocolate = response;
	    //Only in the callback are we sure that data has been saved,
	    //the anonym function will run on success, when the response
	    //has returned
	    //has returned   
	    $(document).ajaxComplete(function () {
    	$("#loadingDiv").hide();
		});
	     modulePattern.putChocolateInDom(dataChocolate);
	}).catch(function(error){
		alert("Error");
	});

	}

if(element === "citrus"){
		$(document).ajaxStart(function () {
		var text = "Beers are loading, please wait..";
	    loadingDiv.innerHTML += text;
	    $("#loading").show();
	});

	$.get('https://api.punkapi.com/v2/beers?food=citrus&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
	    var dataCitrus = [];
	    dataCitrus = response;
	    //Only in the callback are we sure that data has been saved,
	    //the anonym function will run on success, when the response has returned 
	    $(document).ajaxComplete(function () {
    	$("#loadingDiv").hide();
		});
	    modulePattern.putCitrusInDom(dataCitrus);

	}).catch(function(error){
		alert("Error");
	});
	}

if(element === "curry"){
		$(document).ajaxStart(function () {
		var text = "Beers are loading, please wait..";
	    loadingDiv.innerHTML += text;
	    $("#loading").show();
	});

	$.get('https://api.punkapi.com/v2/beers?food=curry&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
	    var dataCurry = [];
	    dataCurry = response;
	    //Only in the callback are we sure that data has been saved,
	    //the anonym function will run on success, when the response has returned 
	    $(document).ajaxComplete(function () {
    	$("#loadingDiv").hide();
		});
	    modulePattern.putCurryInDom(dataCurry);

	}).catch(function(error){
		alert("Error");
	});
	}
if(element === "cheese"){

	$(document).ajaxStart(function () {
		var text = "Beers are loading, please wait..";
	    loadingDiv.innerHTML += text;
	    $("#loading").show();
	});
	$.get('https://api.punkapi.com/v2/beers?food=cheese&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
	    var dataCheese = [];
	    dataCheese = response;
	    //Only in the callback are we sure that data has been saved,
	    //the anonym function will run on success, when the response has returned 
	    $(document).ajaxComplete(function () {
    	$("#loadingDiv").hide();
		});
	    modulePattern.putCheeseInDom(dataCheese);

	}).catch(function(error){
		alert("Error");
	});
	}
if(element === "grilled"){

	$(document).ajaxStart(function () {
		var text = "Beers are loading, please wait..";
	    loadingDiv.innerHTML += text;
	    $("#loading").show();
	});
	$.get('https://api.punkapi.com/v2/beers?food=grilled&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
	    var dataGrilled = [];
	    dataGrilled = response;
	    //Only in the callback are we sure that data has been saved,
	    //the anonym function will run on success, when the response has returned 
	    $(document).ajaxComplete(function () {
    	$("#loadingDiv").hide();
		});
	    modulePattern.putGrilledInDom(dataGrilled);

	}).catch(function(error){
		alert("Error");
	});
	}

}); //forEach
} //else-statment

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
	               	EBC: ${data[i].ebc}<br>
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
					 1. <a href="https://www.google.se/#q=${data[i].food_pairing[0]}" target="_blank">${data[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${data[i].food_pairing[1]}" target="_blank">${data[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${data[i].food_pairing[2]}" target="_blank">${data[i].food_pairing[2]}</a><br>
                </div>
                </div>`;
            beerList.innerHTML = showHTML;
        	}
	},

putChocolateInDom: (dataChocolate) => {

	if(dataChocolate == ''){

		var node = document.createElement("LI");                // Create a <li> node
		var textnode = document.createTextNode("CHOCOLATE: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
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
 			
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataChocolate[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataChocolate[i].name}</h4>
	                Alcohol: ${dataChocolate[i].abv}%<br>
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
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
		var node = document.createElement("LI");                 // Create a <li> node
		var textnode = document.createTextNode("SPICY: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
		node.appendChild(textnode); 
		node.setAttribute('class', 'node-class');                              // Append the text to <li>
		document.getElementById("errorMsg").appendChild(node);  
	}
	else{
		
		let beer = document.getElementById("spicyList");
        let showHTML = "";
        	// for (var i = 0; i < dataSpicy.length; i++) {
        	// 	var foods= dataSpicy[i].food_pairing;
        	// }
 			for (var i = 0; i < dataSpicy.length; i++) { 			
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataSpicy[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataSpicy[i].name}</h4>
	                Alcohol: ${dataSpicy[i].abv}%<br>
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
					 1. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[0]}" target="_blank">${dataSpicy[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[1]}" target="_blank">${dataSpicy[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[2]}" target="_blank">${dataSpicy[i].food_pairing[2]}</a><br>
                </div>
                </div>`;
            spicyList.innerHTML = showHTML;
        	}
		}
	},
	putCurryInDom: (dataCurry) => {
	console.log("baaaah")
	if(dataCurry == ''){
		var node = document.createElement("LI");                 // Create a <li> node
		var textnode = document.createTextNode("CURRY: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
		node.appendChild(textnode); 
		node.setAttribute('class', 'node-class'); // Append the text to <li>
		document.getElementById("errorMsg").appendChild(node);  
	}
	else{
		
		let beer = document.getElementById("curryList");
        let showHTML = "";
        	for (var i = 0; i < dataCurry.length; i++) {
 		
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataCurry[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataCurry[i].name}</h4>
	                Alcohol: ${dataCurry[i].abv}%<br>
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
					 1. <a href="https://www.google.se/#q=${dataCurry[i].food_pairing[0]}" target="_blank">${dataCurry[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${dataCurry[i].food_pairing[1]}" target="_blank">${dataCurry[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${dataCurry[i].food_pairing[2]}" target="_blank">${dataCurry[i].food_pairing[2]}</a><br>
                </div>
                </div>`;
            curryList.innerHTML = showHTML;
		}
	}
	},

putCitrusInDom: (dataCitrus) => {
	
 
	console.log("baaaah")
	if(dataCitrus == ''){
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
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
					 1. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[0]}" target="_blank">${dataCitrus[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[1]}" target="_blank">${dataCitrus[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[2]}" target="_blank">${dataCitrus[i].food_pairing[2]}</a><br>
         
                </div>
                </div>`;
            citrusList.innerHTML = showHTML;
        	}
		}
	},
	putCheeseInDom: (dataCheese) => {
	
 
	console.log("baaaah")
	if(dataCheese == ''){
		var node = document.createElement("LI");                 // Create a <li> node
		var textnode = document.createTextNode("CHEESE: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
		node.appendChild(textnode); 
		node.setAttribute('class', 'node-class');                             // Append the text to <li>
		document.getElementById("errorMsg").appendChild(node);     // Append <li> to <ul> with id="myList"

	}
	else{
		let beer = document.getElementById("cheeseList");
        let showHTML = "";

 			for (var i = 0; i < dataCheese.length; i++) {
  
 				console.log(dataCheese);
 			
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataCheese[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataCheese[i].name}</h4>
	                Alcohol: ${dataCheese[i].abv}%<br>
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
					 1. <a href="https://www.google.se/#q=${dataCheese[i].food_pairing[0]}" target="_blank">${dataCheese[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${dataCheese[i].food_pairing[1]}" target="_blank">${dataCheese[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${dataCheese[i].food_pairing[2]}" target="_blank">${dataCheese[i].food_pairing[2]}</a><br>
         
                </div>
                </div>`;
            cheeseList.innerHTML = showHTML;
        	}
		}
	},
		putGrilledInDom: (dataGrilled) => {
	
 
	console.log("baaaah")
	if(dataGrilled == ''){
		var node = document.createElement("LI");                 // Create a <li> node
		var textnode = document.createTextNode("GRILLED: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
		node.appendChild(textnode); 
		node.setAttribute('class', 'node-class');                             // Append the text to <li>
		document.getElementById("errorMsg").appendChild(node);     // Append <li> to <ul> with id="myList"

	}
	else{
		let beer = document.getElementById("grilledList");
        let showHTML = "";

 			for (var i = 0; i < dataGrilled.length; i++) {
 				console.log(dataGrilled);
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${dataGrilled[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${dataGrilled[i].name}</h4>
	                Alcohol: ${dataGrilled[i].abv}%<br>
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
					 1. <a href="https://www.google.se/#q=${dataGrilled[i].food_pairing[0]}" target="_blank">${dataGrilled[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${dataGrilled[i].food_pairing[1]}" target="_blank">${dataGrilled[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${dataGrilled[i].food_pairing[2]}" target="_blank">${dataGrilled[i].food_pairing[2]}</a><br>
         
                </div>
                </div>`;
            grilledList.innerHTML = showHTML;
        	}
		}
	},

addEvent: function(){
// document.getElementById('foodBeer-btn').addEventListener('click', modulePattern.sortBeersByFlavour);
document.getElementById('lightBeers-btn').addEventListener('click', modulePattern.getLightBeers);
document.getElementById('mediumBeers-btn').addEventListener('click', modulePattern.getMediumBeers);
document.getElementById('darkBeers-btn').addEventListener('click', modulePattern.getDarkBeers);
document.getElementById('getAlcBeer').addEventListener('change', modulePattern.selectBeersByAlcoholContent);
document.getElementById('getAllBeer').addEventListener('change', modulePattern.selectAllBeers);
document.getElementById('getAlcBeerByFlavour').addEventListener('change', modulePattern.selectAlcoholContentAndFlavour);
document.getElementById('search-btn').addEventListener('click', modulePattern.getBeerPrice);

}

};
})(); 

modulePattern.addEvent();
// console.log(modulePattern.getFood());
