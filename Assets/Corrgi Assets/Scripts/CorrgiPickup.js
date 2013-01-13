#pragma strict

var defaultHeight : float = 0.0f;
var offsetHeight : float = 1.0;
var bounceHeight : float = 1.0;
var bounceSpeed : float = 4.0;
var bounceYaw : float = 15.0;
var inventoryKey  = "corrgi";

function Start () 
{
	
}

function Awake()
{
	defaultHeight = transform.position.y;
}

function Update () 
{
	transform.position.y = defaultHeight + (offsetHeight - (bounceHeight / 2)) + (Mathf.Sin(Time.realtimeSinceStartup * bounceSpeed)*bounceHeight);
	transform.eulerAngles.y = 180.0 + (Mathf.Sin(Time.realtimeSinceStartup) * bounceYaw);
}

function OnTriggerEnter(other : Collider)
{
	if(other.gameObject.tag == "Player")
	{
		Debug.Log("Pickup hit!");
		// ## disable collision, mesh
		// ## start particle effect
		// ## register with inventory
	}
}