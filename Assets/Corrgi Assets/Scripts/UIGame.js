#pragma strict

var timeMeterTexture : Texture2D;
var timeMeterGranularity : int = 12;

function Start () {

}

// JavaScript
function OnGUI () 
{
	var uiScale : float = Screen.height / 720.0f;

	// Build the meter
	for(var i : int = 0; i < timeMeterGranularity; i++)
	{
		var timeMeterScale : float = (700 / timeMeterGranularity) * uiScale;
		
		GUI.Label (Rect (32,timeMeterScale + (i*(timeMeterScale * 0.75)),timeMeterScale,timeMeterScale), timeMeterTexture);
	}
}