$(document).ready(function(){

	var	runningBacks =[
		"Le'Veon Bell", "Kareem Hunt", "LeSean McCoy", "Todd Gurley", "Alvin Kamara", "Mark Ingram"
	];
	// console.log(runningBacks)
	
	function addingNewButtons(){
		$("#buttonDiv").empty();
		for (var i = 0; i<runningBacks.length; i++){
		var makeBtn = $("<button>");
			makeBtn.addClass("options btn player-name");
			makeBtn.attr("type", "button");
			makeBtn.attr("data-name",runningBacks[i])
			makeBtn.attr("id", + i)
			makeBtn.attr("value", i)
			makeBtn.text(runningBacks[i]);
			$("#buttonDiv").append(makeBtn);
		};
		
	}
	

	$(document).on("click", ".player-name",function(){
		var player = $(this).attr("data-name");
		getGifs(player)
	});

	
	$("#add-player").on("click",function(){
		var newPlayer = $("#new-player-input").val().trim()
		runningBacks.push(newPlayer);

		addingNewButtons();
	})


	function getGifs(searchTerm){
		var queryString = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC" 
        $.ajax({
        	url: queryString,
        	method: "GET"
        })
        	.then(function(response){
        		console.log(response);
        		var outcome = response.data;
        		for(var i = 0; i < outcome.length; i++){
        			var playerDiv = $("<div>");
        			var playerP = $("<p>").text()
        			var playerImage = $("<img>");
        				playerImage.attr("src", outcome[i].images.fixed_height.url);
        				playerDiv.append(playerP);
        				playerDiv.append(playerImage);
        				$("#just-for-gifs").prepend(playerDiv)
        		}
        	})
	}
	addingNewButtons()
})
	


