'use strict'

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
    // console.log(`Saving ${strVal.length} bytes to local storage...` )
	// console.log('actual save:', strVal)
	localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
	var val = localStorage.getItem(key)
	// console.log(`loading ...${val}... this beauty`)
	// console.log('JSON Parse:', JSON.parse(val))
	return JSON.parse(val)
	// return JSON(val)
}