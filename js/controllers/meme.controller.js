'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']


function renderMeme() {
    var meme = getMeme()
	
	var img = document.createElement('img')
    img.src = `img/${meme.selectedImgId}.jpg`
    
	img.onload = () => {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
		meme.lines.forEach(line => renderMemeLine(line))
	}
}

function renderMemeLine(line) {
    var { pos, txt, size, fillColor, borderColor, lineIdx } = line

	gCtx.beginPath()

    gCtx.font = `${size}px impact bold`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = borderColor
    gCtx.lineWidth = 1
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'

	gCtx.strokeText(txt, pos.x, pos.y)
    gCtx.fillText(txt, pos.x, pos.y)

	gCtx.closePath()

	if (lineIdx === gMeme.selectedLineIdx) {
		drawLineFrame(line)
	}
}

function drawLineFrame(line) {
	var { pos, txt, size } = line

	var textWidth = gCtx.measureText(txt).width
    var textHeight = size
	var textBoxX = pos.x - textWidth / 2 
	var textBoxY = pos.y - textHeight / 2

	gCtx.strokeRect(textBoxX, textBoxY, textWidth, textHeight)
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onAddLine() {
	addLine()
	renderMeme()
}

function onRemove() {
	removeLine()
	renderMeme()
}

function onSwitchLine() {
	const meme = getMeme()
	var currIdx = meme.selectedLineIdx
	
	if (currIdx < meme.lines.length - 1) currIdx++
	else currIdx = 0 
	
	setSelectedLine(currIdx)
	renderMeme()
	console.log('yo i made it')
}

function onFillColor() {
    const color = document.getElementById('set-fill-color').value
    setFillColor(color)
	renderMeme()
}

function onBorderColor() {
	const color = document.getElementById('set-border-color').value
	setBorderColor(color)
	renderMeme()
}

function onEnlargeFont() {
	incrementSize()
	renderMeme()
}

function onShrinkFont() {
	decrementSize()
	renderMeme()
}

function onDown(ev) {
	const clickedPos = getEvPos(ev)
	const meme = getMeme()

	meme.lines.forEach((line) => {
		if (isLineClicked(line, clickedPos)) {
			setSelectedLine(line.lineIdx)
			setLineDrag(true)
			gStartPos = clickedPos
			document.body.style.cursor = 'grabbing'
		}
	}) 
}

function onMoveLine(ev) {
	const line = getMemeLine()
	const { isDrag } = line
	if (!isDrag) return

	const pos = getEvPos(ev)
	const dx = pos.x - gStartPos.x
	const dy = pos.y - gStartPos.y
	moveLine(dx, dy)

	gStartPos = pos
}

function onUp() {
	setLineDrag(false)
	document.body.style.cursor = 'grab'
	gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
	renderMeme()
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
