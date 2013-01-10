#pragma strict

var timeMeterTexture : Texture2D;
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
				GUI.Label (Rect (32,timeMeterScale + (i*(timeMeterScale * 0.75)),timeMeterScale,timeMeterScale), timeMeterTexture);
			}
		}
	}
	else
		GUI.TextField(Rect (256,256,768,512), "Hit Fire1 (ctrl) to start");
}