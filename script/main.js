//Module pattern object
const modulePattern = (function(){

return {

loading: function(){
	var text = "Beers are loading, please wait..";
	loadingDiv.innerHTML += text;
	$("#loading").show();
},

getEbcValue: function(value){
	if(value == "ebc_lt=15"){
		modulePattern.getEbcBeers(value)
	}
	else if(value == "ebc_gt=15&ebc_lt=50"){
		modulePattern.getEbcBeers(value)
	}
	else if(value == "ebc_gt=50"){
		modulePattern.getEbcBeers(value)
	}
},

getEbcBeers: function(value){
	//loading indicator, to tell the users that something is loading.
	$(document).ajaxStart(function () {
		modulePattern.loading();
	});
	var data = [];
	//get request. The callback parameter response holds the content of the requested page
	$.get('https://api.punkapi.com/v2/beers?' + value, (response) => { 
	    data = response; //success
	    //Only in the callback are we sure that data has been saved,
	    //the anonym function will run on success, when the response has returned

	    //loading img + text = hidden, when response is completed
	    $(document).ajaxComplete(function () {
	    $("#loadingDiv").hide();
		});
	    modulePattern.putBeersInDom(data);
	    console.log(data)
	//catches error, xhr = XMLHttpRequest Object  
	}).catch(function(xhr) {
		console.log(xhr)
	    alert("ERROR! Something went wrong please try again. \n \n" + xhr.responseText);
	});
},

getBeerPrice: function() { 
//function with object literal
	$.ajax(
		{
	    url: 'https://karlroos-systemet.p.mashape.com/product?limit=100&name=brewdog&order_by=name', // URL to the API
	    type: 'GET', // The HTTP Method, GET POST PUT DELETE etc
	    data: {}, // Additional parameters here
	    dataType: "json",
	    ajaxStart: $(document).ajaxStart(function () { //loading indicator
		modulePattern.loading();
		}),
	    success: function(data) {
	        // hantera data här

		    $(document).ajaxComplete(function () {
		    $("#loadingDiv").hide();

			});
		    modulePattern.showPriceInDom(data);
	        },

		//ett annat sätt att alerta error
		error: function(errorObject, statusText, errorThrown) {
			alert("ERROR! \n \n" + errorThrown);
		},
		//för detta api behövs en nyckel som läggs i request headern 
	    beforeSend: function(xhr) {
	    xhr.setRequestHeader("X-Mashape-Authorization", "6myQMMIXtCmshRYsqqNr3ik67JNxp1JM1SIjsnsY9FE7luqhcI"); 
	    // Mashape key
	    }
	});
},

//selector that gets user choice
selectAllBeers: function (choice) {
    var getAllBeers = modulePattern.getAllBeers(choice.target.value);        
},

getAllBeers: function(getAllBeers){

	$(document).ajaxStart(function () {
		modulePattern.loading();
	});

	var data = [];
	$.get('https://api.punkapi.com/v2/beers?' + getAllBeers, (response) => { 
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

selectBeersByAlcoholContent: function (choice) {
	var getBeers = modulePattern.getBeersByAlcoholContent(choice.target.value);
            
 },

getBeersByAlcoholContent: function (getBeers){
	
// aöjkdöalkdjföalksdjfölakjsdfölkajsdf


	let beer = document.getElementById("beerList");
	beerList.innerHTML = null;


	$(document).ajaxStart(function () {
		modulePattern.loading();
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

//Before the get request we have to check what alcohol content the search is going to be restrained to
selectAlcoholContentAndFlavour: function (choice) {
    var getBeersByFlavour = modulePattern.sortBeersByFlavour(choice.target.value);          
},

//Then we have to see which checkboxes are checked and then we can do the get request
sortBeersByFlavour: function(getBeersByFlavour){

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

	 //controls if the user has checked a checkbox before continuing, if not show error msg 
	if(checkedResult == ''){
		var node = document.createElement("LI");  // Create a <li> node
		var textnode = document.createTextNode("Please choose a flavour before continuing! (reload the page)");  // Create a text node
		node.appendChild(textnode); // Append the text to node/<li>
		node.setAttribute('class', 'node-class'); //made a class to be able to use css
		document.getElementById("error-foodList").appendChild(node);
		} 
	else {
		
		//forEach loops through the array of choices (checked checkboxes) made by the user
	checkedResult.forEach(function(element){
		//checks if the array contains the word spicy
		if(element === "spicy"){

			$(document).ajaxStart(function () {
				modulePattern.loading();
			});

		//if spicy matches the user choice the get request activates, and the alcohol-content-selctor-value adds to the request
			$.get('https://api.punkapi.com/v2/beers?food=spicy&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
			    var dataSpicy = [];
			    dataSpicy = response;
			    //Only in the callback are we sure that data has been saved,
			    //the anonym function will run on success, when the response has returned   
			    $(document).ajaxComplete(function () {
		    	$("#loadingDiv").hide();
				});
				modulePattern.putFlavoursInDom(dataSpicy);

			}).catch(function(error){
				alert("Error")
			});
			}

		if(element === "chocolate") {

				$(document).ajaxStart(function () {
					modulePattern.loading();
			});

			$.get('https://api.punkapi.com/v2/beers?food=chocolate&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
			    var dataChocolate = [];
			    dataChocolate = response;
			    //Only in the callback are we sure that data has been saved,
			    //the anonym function will run on success, when the response has returned 
			    $(document).ajaxComplete(function () {
		    	$("#loadingDiv").hide();
				});
			     modulePattern.putFlavoursInDom(dataChocolate);
			}).catch(function(error){
				alert("Error");
			});

			}

		if(element === "citrus"){
				$(document).ajaxStart(function () {
					modulePattern.loading();
			});

			$.get('https://api.punkapi.com/v2/beers?food=citrus&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
			    var dataCitrus = [];
			    dataCitrus = response;
			    //Only in the callback are we sure that data has been saved,
			    //the anonym function will run on success, when the response has returned 
			    $(document).ajaxComplete(function () {
		    	$("#loadingDiv").hide();
				});
			    modulePattern.putFlavoursInDom(dataCitrus);

			}).catch(function(error){
				alert("Error");
			});
			}

		if(element === "curry"){
				$(document).ajaxStart(function () {
					modulePattern.loading();
			});

			$.get('https://api.punkapi.com/v2/beers?food=curry&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
			    var dataCurry = [];
			    dataCurry = response;
			    //Only in the callback are we sure that data has been saved,
			    //the anonym function will run on success, when the response has returned 
			    $(document).ajaxComplete(function () {
		    	$("#loadingDiv").hide();
				});
			    modulePattern.putFlavoursInDom(dataCurry);

			}).catch(function(error){
				alert("Error");
			});
			}
		if(element === "cheese"){

			$(document).ajaxStart(function () {
				modulePattern.loading();
			});
			$.get('https://api.punkapi.com/v2/beers?food=cheese&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
			    var dataCheese = [];
			    dataCheese = response;
			    //Only in the callback are we sure that data has been saved,
			    //the anonym function will run on success, when the response has returned 
			    $(document).ajaxComplete(function () {
		    	$("#loadingDiv").hide();
				});
			    modulePattern.putFlavoursInDom(dataCheese);

			}).catch(function(error){
				alert("Error");
			});
			}
		if(element === "grilled"){

			$(document).ajaxStart(function () {
				modulePattern.loading();
			});
			$.get('https://api.punkapi.com/v2/beers?food=grilled&page=1&per_page=80&' + getBeersByFlavour, (response) => { 
			    var dataGrilled = [];
			    dataGrilled = response;
			    //Only in the callback are we sure that data has been saved,
			    //the anonym function will run on success, when the response has returned 
			    $(document).ajaxComplete(function () {
		    	$("#loadingDiv").hide();
				});
			    modulePattern.putFlavoursInDom(dataGrilled);

			}).catch(function(error){
				alert("Error");
			});
			}
		}); //forEach
	} //else-statment
},

showPriceInDom: (data) => {

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
},

putBeersInDom: (data) => {
	
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

// putChocolateInDom: (dataChocolate) => {

// 	if(dataChocolate == ''){

// 		var node = document.createElement("LI");                // Create a <li> node
// 		var textnode = document.createTextNode("CHOCOLATE: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
// 		node.appendChild(textnode); // Append the text to <li>
// 		node.setAttribute('class', 'node-class'); 
// 		document.getElementById("errorMsg").appendChild(node);  	
// 	}
// 	else{
// 		let beer = document.getElementById("chocolateList");
//         let showHTML = "";
//         	for (var i = 0; i < dataChocolate.length; i++) {
//         		var foods= dataChocolate[i].food_pairing;
//         	}
//  			for (var i = 0; i < foods.length; i++) {
 			
//                 showHTML += 
//                 `
//                 <div class="dom-wrapper">
//                 	<div class="dom-left">
//                 		<img src="${dataChocolate[i].image_url}" class="beer-img"><br>
//                 	</div>
// 				<div class="dom-right">
// 	                <h4>${dataChocolate[i].name}</h4>
// 	                Alcohol: ${dataChocolate[i].abv}%<br>
// 					 <p><h5>Food pairing </h5>
// 					 Click on the links to find recipes!<br>
// 					 1. <a href="https://www.google.se/#q=${dataChocolate[i].food_pairing[0]}" target="_blank">${dataChocolate[i].food_pairing[0]}</a><br>
// 					 2. <a href="https://www.google.se/#q=${dataChocolate[i].food_pairing[1]}" target="_blank">${dataChocolate[i].food_pairing[1]}</a><br>
// 					 3. <a href="https://www.google.se/#q=${dataChocolate[i].food_pairing[2]}" target="_blank">${dataChocolate[i].food_pairing[2]}</a><br>
         
//                 </div>
//                 </div>`;
//             chocolateList.innerHTML = showHTML;
//         	}
// 		}
// },

// putSpicyInDom: (dataSpicy) => {
//         let showHTML = "";
// 	if(dataSpicy == ''){
// 		var node = document.createElement("LI");                 // Create a <li> node
// 		var textnode = document.createTextNode("SPICY: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
// 		node.appendChild(textnode); 
// 		node.setAttribute('class', 'node-class');                              // Append the text to <li>
// 		document.getElementById("errorMsg").appendChild(node);  
// 	}
// 	else{
		
// 		let beer = document.getElementById("spicyList");
//         let showHTML = "";
//  			for (var i = 0; i < dataSpicy.length; i++) { 			
//                 showHTML += 
//                 `
//                 <div class="dom-wrapper">
//                 	<div class="dom-left">
//                 		<img src="${dataSpicy[i].image_url}" class="beer-img"><br>
//                 	</div>
// 				<div class="dom-right">
// 	                <h4>${dataSpicy[i].name}</h4>
// 	                Alcohol: ${dataSpicy[i].abv}%<br>
// 					 <p><h5>Food pairing </h5>
// 					 Click on the links to find recipes!<br>
// 					 1. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[0]}" target="_blank">${dataSpicy[i].food_pairing[0]}</a><br>
// 					 2. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[1]}" target="_blank">${dataSpicy[i].food_pairing[1]}</a><br>
// 					 3. <a href="https://www.google.se/#q=${dataSpicy[i].food_pairing[2]}" target="_blank">${dataSpicy[i].food_pairing[2]}</a><br>
//                 </div>
//                 </div>`;
//             spicyList.innerHTML = showHTML;
//         	}
// 		}
// },
// putCurryInDom: (dataCurry) => {
// 	console.log("DOM")
// 	if(dataCurry == ''){
// 		var node = document.createElement("LI");                 // Create a <li> node
// 		var textnode = document.createTextNode("CURRY: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
// 		node.appendChild(textnode); 
// 		node.setAttribute('class', 'node-class'); // Append the text to <li>
// 		document.getElementById("errorMsg").appendChild(node);  
// 	}
// 	else{
		
// 		let beer = document.getElementById("curryList");
//         let showHTML = "";
//         	for (var i = 0; i < dataCurry.length; i++) {
 		
//                 showHTML += 
//                 `
//                 <div class="dom-wrapper">
//                 	<div class="dom-left">
//                 		<img src="${dataCurry[i].image_url}" class="beer-img"><br>
//                 	</div>
// 				<div class="dom-right">
// 	                <h4>${dataCurry[i].name}</h4>
// 	                Alcohol: ${dataCurry[i].abv}%<br>
// 					 <p><h5>Food pairing </h5>
// 					 Click on the links to find recipes!<br>
// 					 1. <a href="https://www.google.se/#q=${dataCurry[i].food_pairing[0]}" target="_blank">${dataCurry[i].food_pairing[0]}</a><br>
// 					 2. <a href="https://www.google.se/#q=${dataCurry[i].food_pairing[1]}" target="_blank">${dataCurry[i].food_pairing[1]}</a><br>
// 					 3. <a href="https://www.google.se/#q=${dataCurry[i].food_pairing[2]}" target="_blank">${dataCurry[i].food_pairing[2]}</a><br>
//                 </div>
//                 </div>`;
//             curryList.innerHTML = showHTML;
// 		}
// 	}
// 	},

// putCitrusInDom: (dataCitrus) => {

// 	if(dataCitrus == ''){
// 		var node = document.createElement("LI");                 // Create a <li> node
// 		var textnode = document.createTextNode("CITRUS: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
// 		node.appendChild(textnode); 
// 		node.setAttribute('class', 'node-class');                             // Append the text to <li>
// 		document.getElementById("errorMsg").appendChild(node);     
// 	}
// 	else{
// 		let beer = document.getElementById("citrusList");
//         let showHTML = "";
//  			for (var i = 0; i < dataCitrus.length; i++) {
 
//  				console.log(dataCitrus);
 			
//                 showHTML += 
//                 `
//                 <div class="dom-wrapper">
//                 	<div class="dom-left">
//                 		<img src="${dataCitrus[i].image_url}" class="beer-img"><br>
//                 	</div>
// 				<div class="dom-right">
// 	                <h4>${dataCitrus[i].name}</h4>
// 	                Alcohol: ${dataCitrus[i].abv}%<br>
// 					 <p><h5>Food pairing </h5>
// 					 Click on the links to find recipes!<br>
// 					 1. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[0]}" target="_blank">${dataCitrus[i].food_pairing[0]}</a><br>
// 					 2. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[1]}" target="_blank">${dataCitrus[i].food_pairing[1]}</a><br>
// 					 3. <a href="https://www.google.se/#q=${dataCitrus[i].food_pairing[2]}" target="_blank">${dataCitrus[i].food_pairing[2]}</a><br>
         
//                 </div>
//                 </div>`;
//             citrusList.innerHTML = showHTML;
//         	}
// 		}
// },
// putCheeseInDom: (dataCheese) => {
// 	console.log("DOM")
// 	if(dataCheese == ''){
// 		var node = document.createElement("LI");                 // Create a <li> node
// 		var textnode = document.createTextNode("CHEESE: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
// 		node.appendChild(textnode); 
// 		node.setAttribute('class', 'node-class');                             // Append the text to <li>
// 		document.getElementById("errorMsg").appendChild(node);    

// 	}
// 	else{
// 		let beer = document.getElementById("cheeseList");
//         let showHTML = "";

//  			for (var i = 0; i < dataCheese.length; i++) {
  
//  				console.log(dataCheese);
 			
//                 showHTML += 
//                 `
//                 <div class="dom-wrapper">
//                 	<div class="dom-left">
//                 		<img src="${dataCheese[i].image_url}" class="beer-img"><br>
//                 	</div>
// 				<div class="dom-right">
// 	                <h4>${dataCheese[i].name}</h4>
// 	                Alcohol: ${dataCheese[i].abv}%<br>
// 					 <p><h5>Food pairing </h5>
// 					 Click on the links to find recipes!<br>
// 					 1. <a href="https://www.google.se/#q=${dataCheese[i].food_pairing[0]}" target="_blank">${dataCheese[i].food_pairing[0]}</a><br>
// 					 2. <a href="https://www.google.se/#q=${dataCheese[i].food_pairing[1]}" target="_blank">${dataCheese[i].food_pairing[1]}</a><br>
// 					 3. <a href="https://www.google.se/#q=${dataCheese[i].food_pairing[2]}" target="_blank">${dataCheese[i].food_pairing[2]}</a><br>
         
//                 </div>
//                 </div>`;
//             cheeseList.innerHTML = showHTML;
//         	}
// 		}
// },

// putGrilledInDom: (dataGrilled) => {
// 	console.log("DOM")
// 	if(dataGrilled == ''){
// 		var node = document.createElement("LI");                 // Create a <li> node
// 		var textnode = document.createTextNode("GRILLED: Unfortunately we did not find a match with that alcohol content. Change your search (reload the page) and try again.");         // Create a text node
// 		node.appendChild(textnode); 
// 		node.setAttribute('class', 'node-class');                             // Append the text to <li>
// 		document.getElementById("errorMsg").appendChild(node);   

// 	}
// 	else{
// 		let beer = document.getElementById("grilledList");
//         let showHTML = "";

//  			for (var i = 0; i < dataGrilled.length; i++) {
//  				console.log(dataGrilled);
//                 showHTML += 
//                 `
//                 <div class="dom-wrapper">
//                 	<div class="dom-left">
//                 		<img src="${dataGrilled[i].image_url}" class="beer-img"><br>
//                 	</div>
// 				<div class="dom-right">
// 	                <h4>${dataGrilled[i].name}</h4>
// 	                Alcohol: ${dataGrilled[i].abv}%<br>
// 					 <p><h5>Food pairing </h5>
// 					 Click on the links to find recipes!<br>
// 					 1. <a href="https://www.google.se/#q=${dataGrilled[i].food_pairing[0]}" target="_blank">${dataGrilled[i].food_pairing[0]}</a><br>
// 					 2. <a href="https://www.google.se/#q=${dataGrilled[i].food_pairing[1]}" target="_blank">${dataGrilled[i].food_pairing[1]}</a><br>
// 					 3. <a href="https://www.google.se/#q=${dataGrilled[i].food_pairing[2]}" target="_blank">${dataGrilled[i].food_pairing[2]}</a><br>
         
//                 </div>
//                 </div>`;
//             grilledList.innerHTML = showHTML;
//         	}
// 		}
// },



// errorMsgForFlavours: (choice) =>{
// 		var node = document.createElement("LI");                 // Create a <li> node
// 		var textnode = document.createTextNode(choice +": Unfortunately we did not find a match. Change your search and try again.");         // Create a text node
// 		node.appendChild(textnode); 
// 		node.setAttribute('class', 'node-class');                             // Append the text to <li>
// 		document.getElementById("errorMsg").appendChild(node); 
// },

putFlavoursInDom: (dataSpicy, dataChocolate, dataCitrus, dataCurry, dataCheese, dataGrilled) => {
// var choice = [];
// 	if(dataSpicy == ''){ 
// 		var spicy = "SPICY";
// 		choice.push(spicy);
// 		modulePattern.errorMsgForFlavours(choice)
// 			if(dataChocolate == ''){ 
// 		var chocolate = "CHOCOLATE";
// 		choice.push(chocolate);
// 		modulePattern.errorMsgForFlavours(choice)
// 	}
// 	}
// 	if(dataChocolate == ''){ 
// 		var chocolate = "CHOCOLATE";
// 		choice.push(chocolate);
// 		modulePattern.errorMsgForFlavours(choice)
// 	}
// 	if(dataCitrus == ''){ 
// 		var citrus = "CITRUS";
// 		choice.push(citrus);
// 		modulePattern.errorMsgForFlavours(choice)
// 	}
// 	if(dataCurry == ''){ 
// 		var curry = "CURRY";
// 		choice.push(curry);
// 		modulePattern.errorMsgForFlavours(choice)
// 	}
// 	if(dataCheese == ''){ 
// 		var cheese = "CHEESE";
// 		choice.push(cheese);
// 		modulePattern.errorMsgForFlavours(choice)
// 	}
// 	if(dataGrilled == ''){ 
// 		var grilled = "GRILLED";
// 		choice.push(grilled);
// 		modulePattern.errorMsgForFlavours(choice)
// 	}
	if(dataSpicy == '' || dataChocolate == '' || dataCheese == '' || dataCitrus == '' || dataCurry == '' || dataGrilled == ''){
		var node = document.createElement("LI");                 // Create a <li> node
		var textnode = document.createTextNode("Unfortunately we did not find a match. Change your search and try again.");         // Create a text node
		node.appendChild(textnode); 
		node.setAttribute('class', 'node-class');                             // Append the text to <li>
		document.getElementById("errorMsg").appendChild(node); 
	}
	else{

		if(dataSpicy) {
			var newArr = {};
			newArr = dataSpicy;
		}
		if(dataChocolate) {
			var newArr = {};
			newArr = dataSpicy;
		}
		if(dataCitrus) {
			var newArr = {};
			newArr = dataCitrus;
		}
		if(dataCurry) {
			var newArr = {};
			newArr = dataCurry;
		}
		if(dataCheese) {
			var newArr = {};
			newArr = dataCheese;
		}
		if(dataGrilled) {
			var newArr = {};
			newArr = dataGrilled;
		}

        let showHTML = "";

 			for (var i = 0; i < newArr.length; i++) {
 
                showHTML += 
                `
                <div class="dom-wrapper">
                	<div class="dom-left">
                		<img src="${newArr[i].image_url}" class="beer-img"><br>
                	</div>
				<div class="dom-right">
	                <h4>${newArr[i].name}</h4>
	                Alcohol: ${newArr[i].abv}%<br>
					 <p><h5>Food pairing </h5>
					 Click on the links to find recipes!<br>
					 1. <a href="https://www.google.se/#q=${newArr[i].food_pairing[0]}" target="_blank">${newArr[i].food_pairing[0]}</a><br>
					 2. <a href="https://www.google.se/#q=${newArr[i].food_pairing[1]}" target="_blank">${newArr[i].food_pairing[1]}</a><br>
					 3. <a href="https://www.google.se/#q=${newArr[i].food_pairing[2]}" target="_blank">${newArr[i].food_pairing[2]}</a><br>
         
                </div>
                </div>`;

        	}
        	if(dataSpicy){
        	spicyList.innerHTML = showHTML;
        	}
        	if(dataChocolate){
        	chocolateList.innerHTML = showHTML;
        	}
        	if(dataCitrus){
        	citrusList.innerHTML = showHTML;
        	}
        	if(dataCurry){
        	curryList.innerHTML = showHTML;
        	}
        	if(dataCheese){
        	cheeseList.innerHTML = showHTML;
        	}
        	if(dataGrilled){
        	grilledList.innerHTML = showHTML;
        	}


		}

},

addEvent: function(){
	document.getElementById('getAlcBeer').addEventListener('change', modulePattern.selectBeersByAlcoholContent);
	document.getElementById('getAllBeer').addEventListener('change', modulePattern.selectAllBeers);
	document.getElementById('getAlcBeerByFlavour').addEventListener('change', modulePattern.selectAlcoholContentAndFlavour);
	document.getElementById('search-btn').addEventListener('click', modulePattern.getBeerPrice);
}

};
})(); //modulePattern end

modulePattern.addEvent();
// console.log(modulePattern.getFood());

//egen funktion loading
//if spicy lägg till den listan etc en funktion för DOM
//fixedknapp 
