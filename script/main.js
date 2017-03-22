
const modulePattern = (function(){

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
 






	// if(spicy = document.getElementById("spicy").checked){
	// 	console.log("checked spicy");
 //        modulePattern.getFood(spicy);
 //    }

 //    else{
 //        console.log("Nohting spicy thanks");
 //    }
 //    if(chocolate = document.getElementById("chocolate").checked){
 //    			console.log("checked chocolate");
 //         modulePattern.getFood(chocolate);
 //    }

 //    else{
 //        console.log("No chocolate thanks");
 //    }
 //    if(citrus = document.getElementById("citrus").checked){
 //    			console.log("checked citrus");
 //         modulePattern.getFood(citrus);
 //    }

 //    else{
 //        console.log("Nothing citrusy");
 //    }
   
},

addEvent: function(){
document.getElementById('foodBeer-btn').addEventListener('click', modulePattern.getUserInput);
document.getElementById('alcoholFree-btn').addEventListener('click', modulePattern.getAlcoholFree);
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

putChocolateInDom: (dataChocolate) => {
	
 
	console.log("baaaah")
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
	                Description: ${dataChocolate[i].description}
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
	                Description: ${dataSpicy[i].description}
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
	                Description: ${dataCitrus[i].description}
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