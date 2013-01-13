#pragma strict

var timeMeterTexture : Texture2D;
var startBannerTexture : Texture2D;
var endBannerTexture : Texture2D;

var timeMeterGranularity : float = 12;

function Start () {

}

// JavaScript
function OnGUI () 
{
	var uiScale : float = Screen.height / 720.0f;
	var timeRemaining : float = GetComponent(CorgiGameFlow).roundTimeRemaining;
	var timePerChunk : float = GetComponent(CorgiGameFlow).roundTime / timeMeterGranularity;
	//Debug.Log(timeRemaining);
	// Build the meter
	if(GetComponent(CorgiGameFlow).gameState == GameState.ActiveGame)
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
	else if(GetComponent(CorgiGameFlow).gameState == GameState.PostGame)
	{
		GUI.Label (Rect (128*uiScale,30,1024*uiScale,256*uiScale), endBannerTexture);
	}
	else if(GetComponent(CorgiGameFlow).gameState == GameState.PreGame)
	{
		GUIUtility.RotateAroundPivot(Mathf.Sin(Time.realtimeSinceStartup*2)*4, Vector2(Screen.width/2,Screen.height/2));
		GUI.Label (Rect (128*uiScale,232*uiScale,1024*uiScale,256*uiScale), startBannerTexture);
	}
}
