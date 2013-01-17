#pragma strict

//

private var internalInventory : Hashtable;

function Start () 
{
	ResetState();
}

function ResetState()
{
	internalInventory = new Hashtable();
}

////


function Update () 
{

}

// called by the pickup, this tells the player to add the pickup to their personal inventory
function CollectPickup(collectedObject : CorrgiPickup)
{
	if(internalInventory.ContainsKey(collectedObject.inventoryKey))
	{
		// ## this seems really dumb, figure out why I can't just ++;
		var currentInvCount : int = internalInventory[collectedObject.inventoryKey];
		internalInventory[collectedObject.inventoryKey] = currentInvCount + 1;
	}
	else
		internalInventory.Add(collectedObject.inventoryKey, 1);
		
	Debug.Log(collectedObject.inventoryKey + " count: " + internalInventory[collectedObject.inventoryKey]);
}

function GetInventory()
{
	return internalInventory;
}