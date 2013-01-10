#pragma strict

enum GameState
{
	PreGame = 0,
	ActiveGame = 1,
	PostGame = 2,
};

var roundTime : float = 120;
var gameState : GameState = GameState.PreGame; 
var playerRef : GameObject;

/// private
var roundTimeRemaining : float;

function Start () 
{
	roundTimeRemaining = 0;
}

function Awake()
{
 	playerRef = GameObject.Find("corgi-temprun");
 	playerRef.GetComponent(ThirdPersonController).isControllable = false;
}

function Update () 
{
   if (gameState != GameState.ActiveGame && Input.GetButton("Fire1") == true)
   {
   		Debug.Log("Starting round...");
   		StartRound();
   }

   // if we're out of time, stop the round
   if (gameState == GameState.ActiveGame)
   {
   		roundTimeRemaining -= Time.deltaTime;
   
        if(roundTimeRemaining < 0)
   			StopRound();
   }
}

function StartRound()
{
    playerRef.GetComponent(ThirdPersonController).isControllable = true;
   	roundTimeRemaining = roundTime;
	gameState = GameState.ActiveGame;
}

function StopRound()
{
   	playerRef.GetComponent(ThirdPersonController).isControllable = false;
	gameState = GameState.PostGame;
}