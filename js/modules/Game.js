
angular.module('AppGame', []).controller('gameController', function($scope, $http) {
$scope.round;
$scope.firstRound=true;
$scope.countMatchesPlayed=0
$scope.matches=[];
$scope.players=[];
$scope.trophy="images/trophy.png";
$scope.file="files/players1.json";
$scope.table=[
	{ name: "Player1", championships: 1},
	{ name: "Player2", championships: 0},
	{ name: "Player3", championships: 2},
	{ name: "Player4", championships: 0},
	{ name: "Player5", championships: 2},
	{ name: "Player6", championships: 0},
	{ name: "Player7", championships: 2},
	{ name: "Player8", championships: 0},
	{ name: "Player9", championships: 3},
	{ name: "Player10", championships: 0},
	
]

$scope.archivos=[
	{ nombre:"files/players1.json"},
	{ nombre:"files/players2.json"},
	{ nombre:"files/players3.json"}
]

$http.get($scope.file).success(function(data) {
   $scope.players = data;
   console.log("Carga");
});

$scope.setFile=function(entrada){
	
	if(entrada=="files/players1.json"){
		$scope.file=$scope.archivos[0].nombre;
	}
	else if(entrada=="files/players2.json"){
		$scope.file=$scope.archivos[1].nombre;
	}
	else if(entrada=="files/players3.json"){
		$scope.file=$scope.archivos[2].nombre;
	}

	$http.get($scope.file).success(function(data) {
	   $scope.players = data;
	   console.log("Cargaa2");
	});
}

$scope.matchGenerator=function( ){
	$scope.countMatchesPlayed=0;	
	if($scope.firstRound){
		$scope.round=1;
		$scope.firstRound=false;
	}
	else {
		$scope.round=1;
		$scope.firstRound=true;
	}
	var newMatch; var numMatch=0;var i=0;
	if(($scope.players.length%2)==0){
		while( i < $scope.players.length){
			newMatch={
				player1:$scope.players[i],
				player2:$scope.players[i+1],
				winner:" ",
				playerWinner:null,
				matchID: numMatch
			};
			$scope.matches[numMatch]= newMatch;
			numMatch++; i=i+2;
		}
	}
	else 
		alert("The number of players is odd");
}

$scope.nextRound=function(){
	
	if($scope.matches.length==$scope.countMatchesPlayed){
	if($scope.matches.length!=1 ){
	$scope.round++;
	$scope.newList=[];
	var numMatch=0;var i=0; 
	while(i < $scope.matches.length){
		newMatch={
				player1:$scope.matches[i].playerWinner,
				player2:$scope.matches[i+1].playerWinner,
				winner:" ",
				playerWinner:null,
				matchID: numMatch
		};
		$scope.newList[numMatch]= newMatch;
		numMatch++; i=i+2;
	}
	$scope.matches=$scope.newList;
	$scope.countMatchesPlayed=0;
	}}
}

$scope.analizeMatch=function(id_Match){
	if($scope.matches[id_Match].winner==" "){
	var tac1=$scope.matches[id_Match].player1.tactic;
	var tac2=$scope.matches[id_Match].player2.tactic;
	$scope.countMatchesPlayed++;
   if(tac1 == "P"){
		
		if(tac2== "S"){
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player2.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player2;
			 
		}
		else if(tac2== "R"){
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player1.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player1;
			
		}
		else{
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player1.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player1;
			 
		}
	}

	else if (tac1 == "R"){
		
		if(tac2== "S"){
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player1.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player1;
			
		}
		else if(tac2== "P"){
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player2.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player2;
			 
		}
		else{
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player1.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player1;
			 
		}

	}

	else if (tac1 == "S"){
		
		if(tac2== "R"){
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player2.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player2;
			 
		}
		else if(tac2== "P"){
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player1.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player1;
			 
		}
		else{
			$scope.matches[id_Match].winner=$scope.matches[id_Match].player1.name;
			$scope.matches[id_Match].playerWinner=$scope.matches[id_Match].player1;
			
		}
	}
	analizeChampion();
	}
}

$scope.modalMatch=function(id_Match){
	$scope.name1=$scope.matches[id_Match].player1.name;
	$scope.name2=$scope.matches[id_Match].player2.name;
	$scope.src1=selectImg($scope.matches[id_Match].player1.tactic);
	$scope.src2=selectImg($scope.matches[id_Match].player2.tactic);
	
	$('#modalMatch').modal({backdrop:false}).one('click', '#confirm', function(){
		$scope.$apply(function () {
            $scope.analizeMatch(id_Match);
    	});
    });


}



function incrementChampionship(player){

	for(var i=0; i<$scope.table.length; i++){
		if($scope.table[i].name=== player.name){
			$scope.table[i].championships++;
			return true;
		}
	}
	return false;
}

function topTable(player){
	if(incrementChampionship(player)=== false){
		var obj={
			name: player.name,
			championships: 1
		};
		$scope.table.push(obj);
	}
}

function analizeChampion(){
	if($scope.matches.length==1){
		$('#modalChampion').modal({backdrop:false}).one('click', '#confirm', function(){
			$scope.$apply(function () {
	            topTable($scope.matches[0].playerWinner);
	    	});
      	});
	}
}

function selectImg(letter){
	if(letter=="P"){
		return "images/paper.png";
	}
	else if (letter=="R"){
		return "images/rock.png";
	} 
	else if (letter=="S"){
		return "images/scissors.png";
	}

}




});