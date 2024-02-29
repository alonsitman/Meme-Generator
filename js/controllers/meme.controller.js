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
    var meme = getMeme()
	var img = document.createElement('img')
    img.src = `img/${gMeme.selectedImgId}.jpg`
   
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    
	// renderMemeLine()
	meme.lines.forEach(line => renderMemeLine(line))
}

function renderMemeLine(line) {
    // var line = getMemeLine()
    const { pos, txt, size, fillColor, borderColor } = line

	gCtx.font = `bold ${size}px Arial`
	gCtx.fillStyle = fillColor
    gCtx.fillText(txt, pos.x, pos.y)
	console.log('font:', gCtx.font)
	// gCtx.strokeText(txt, pos.x, pos.y)
}

function onAddTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onRemove() {

}

function onDuplicate() {

}

function onSelectNext() {

}

function onFillColor() {
    const color = document.getElementById('set-fill-color').value
    setFillColor(color)
    renderMemeLine()
}

function onBorderColor() {
	const color = document.getElementById('set-border-color').value
	setBorderColor(color)
    renderMemeLine()
}

function onEnlargeFont() {
    // gCtx.font = "bold 18px Arial"
    // gCtx.font = document.querySelector('set-font').value
	incrementSize()
	// renderMemeLine()
	renderMeme()
}

function onShrinkFont() {
	decrementSize()
	// renderMemeLine()
	renderMeme()
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

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

// function onClearEdit() {

// }