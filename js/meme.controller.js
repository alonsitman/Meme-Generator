'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']


function onSelectImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    
    setImg(elImg)
    renderMeme()
}

function renderMeme() {
    var img = document.createElement('img')
    img.src = `img/${gMeme.selectedImgId}.jpg`
   
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderMemeLine()
}

function renderMemeLine() {
    var line = getMemeLine()
    const { pos, txt, size, fillColor, borderColor } = line

	gCtx.font = `(${size}px Arial)`
	gCtx.fillStyle = fillColor
    gCtx.fillText(txt, pos.x, pos.y)
	// gCtx.strokeText(txt, pos.x, pos.y)
}

function onAddTxt(txt) {
    setLineTxt(txt)

    // renderMemeLine()
    renderMeme()
}

function onSetColor() {
    const color = document.getElementById('set-color').value
    setColor(color)
    renderMemeLine()
}

function onEnlargeFont() {
    // gCtx.font = "bold 18px Arial"
    // gCtx.font = document.querySelector('set-font').value
	incrementSize()
	renderMemeLine()
}

function onShrinkFont() {
	decrementSizeSize()
	renderMemeLine()
}

function onMoveLine(ev) {
	const { isDrag } = getMemeLine()
	if (!isDrag) return

	const pos = getEvPos(ev)
	// Calc the delta, the diff we moved
	const dx = pos.x - gStartPos.x
	const dy = pos.y - gStartPos.y
	moveLine(dx, dy)

	// Save the last pos, we remember where we`ve been and move accordingly
	gStartPos = pos
	
    // The canvas is rendered again after every move
	renderMeme()
}

function onDown(ev) {
	const clickedPos = getEvPos(ev)
    if (!isLineClicked(clickedPos)) return

	setLineDrag(true)
	//Save the pos we start from
    gStartPos = clickedPos
	document.body.style.cursor = 'grabbing'
}

function onUp() {
	setLineDrag(false)
	document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
	let pos = {
		x: ev.offsetX,
		y: ev.offsetY,
	}

	if (TOUCH_EVENTS.includes(ev.type)) {
		
		ev.preventDefault()         // Prevent triggering the mouse events
		ev = ev.changedTouches[0]   // Gets the first touch point

		// Calc pos according to the touch screen
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
		}
	}
	return pos
}

function onSave() {
    console.log('saved this:', gMeme)
    saveToStorage(MEMES_DB, gMeme)
}

// function onLoad() {
//     gMeme = loadFromStorage(MEMES_DB)
//     console.log('gMeme:', gMeme)
//     console.log('.img:', gMeme.img)
//     renderMeme()
// }

// function onClearEdit() {

// }