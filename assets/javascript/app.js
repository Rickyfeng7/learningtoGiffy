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
		
		if(runningBacks.indexof(newPlayer) === 1 && newPlayer!==""){
		runningBacks.push(newPlayer);	
		addingNewButtons();
		}
	
	})


	function getGifs(searchTerm){
		var queryString = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10" 
        $.ajax({
        	url: queryString,
        	method: "GET"
        })
        	.then(function(response){
        		console.log(response);
        		var outcome = response.data;
        		for(var i = 0; i < outcome.length; i++){
        			var playerDiv = $("<div>");
        			var playerImage = $("<img>");
        				playerImage.addClass("giffy");
        				playerImage.attr("src", outcome[i].images.fixed_height_still.url);
        				playerImage.attr("data-state", "still")
        				playerImage.attr("data-still", outcome[i].images.fixed_height_still.url)
        				playerImage.attr("data-animate", outcome[i].images.fixed_height.url)
        				playerDiv.append(playerImage);
        				$("#just-for-gifs").prepend(playerDiv)
        		}
        	})
	}
	addingNewButtons();
	$(document).on("click", ".giffy", function(){
		// console.log("Hello I am inside of a clicked Gif")
	// $(".giffy").on("click", function(){
		var toggle = $(this).attr("data-state");
		console.log(toggle)
			if (toggle === "still"){
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
			}
			else{
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
	})
});