#pragma strict

var defaultHeight : float = 0.0f;
var offsetHeight : float = 1.0;
var bounceHeight : float = 1.0;
var bounceSpeed : float = 4.0;
var bounceYaw : float = 15.0;
var inventoryKey  = "corrgi";

private var isActive = true;

function Start () 
{
	
}

function Awake()
{
	defaultHeight = transform.position.y;	// ## flip to do a terrain raycast
	ResetState();
}

function ResetState()
{
	isActive = true;
	GetComponent(BoxCollider).active = true;
	GetComponentInChildren(MeshRenderer).active = true;
}

function Update () 
{
	transform.position.y = defaultHeight + (offsetHeight - (bounceHeight / 2)) + (Mathf.Sin(Time.realtimeSinceStartup * bounceSpeed)*bounceHeight);
	transform.eulerAngles.y = 180.0 + (Mathf.Sin(Time.realtimeSinceStartup) * bounceYaw);
}

function OnTriggerEnter(other : Collider)
{
	// if we're alive and a player just hit us...
	if(isActive && other.gameObject.tag == "Player")
	{	
		// disable collision (and mesh)
		isActive = false;
		GetComponent(BoxCollider).active = false;
		
		// ## start particle effect
		
		// register with the colliding player's inventory
		other.gameObject.GetComponent(CorrgiInventory).CollectPickup(this);
	}
}
