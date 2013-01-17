#pragma strict

var timeMeterTexture : Texture2D;
var startBannerTexture : Texture2D;
var endBannerTexture : Texture2D;

var timeMeterGranularity : float = 12;

var corrgiUIStyle : GUIStyle;

// internal between funcs
private var uiScale : float;
private var timeRemaining : float;
private var timePerChunk : float;

function Start () 
{

}

// JavaScript
function OnGUI () 
{
	uiScale = Screen.height / 720.0f;
	timeRemaining = GetComponent(CorgiGameFlow).roundTimeRemaining;
	timePerChunk = GetComponent(CorgiGameFlow).roundTime / timeMeterGranularity;

	// Work out which state our UI should be in
	if(GetComponent(CorgiGameFlow).gameState == GameState.ActiveGame)
		UI_DrawActiveGameUI();
	else if(GetComponent(CorgiGameFlow).gameState == GameState.PostGame)
		UI_DrawPostGameUI();
	else if(GetComponent(CorgiGameFlow).gameState == GameState.PreGame)
		UI_DrawPreGameUI();
}

// draw for when the game is running
function UI_DrawActiveGameUI()
{
	for(var i : int = 0; i < timeMeterGranularity; i++)
	{
		if(Mathf.Floor(i * timePerChunk) < timeRemaining)
		{
			var timeMeterScale : float = (700 / timeMeterGranularity) * uiScale;
			GUI.Label (Rect (timeMeterScale + (i*(timeMeterScale * 0.75)),32,timeMeterScale,timeMeterScale), timeMeterTexture);
		}
	}
}

// results screen
function UI_DrawPostGameUI()
{
	// get the inventory data
	var inventoryText = "## TEMP RESULTS ##\n";
	var playerInventory : Hashtable = GameObject.FindWithTag("Player").GetComponent(CorrgiInventory).GetInventory(); //## will break in multi

	for (var invItem in playerInventory.Keys)
	{
		inventoryText += invItem + ": " + playerInventory[invItem] + "\n";
	}

	// show it
	GUI.Label (Rect (128*uiScale,30,1024*uiScale,256*uiScale), endBannerTexture);	
	GUI.Label (Rect (128*uiScale,300,1024*uiScale,300*uiScale), inventoryText, corrgiUIStyle);
}


// "bark to start" screen
function UI_DrawPreGameUI()
{
	GUIUtility.RotateAroundPivot(Mathf.Sin(Time.realtimeSinceStartup*2)*4, Vector2(Screen.width/2,Screen.height/2));
	GUI.Label (Rect (128*uiScale,232*uiScale,1024*uiScale,256*uiScale), startBannerTexture);
}