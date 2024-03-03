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

    gCtx.font = `${size}px impact`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = borderColor
    gCtx.lineWidth = 3
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'
	gCtx.letterSpacing = "2px"

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
	const line = getCurrLine()
	const { isDrag } = line
	if (!isDrag) return

	const pos = getEvPos(ev)
	const dx = pos.x - gStartPos.x
	const dy = pos.y - gStartPos.y
	moveLine(dx, dy)

	gStartPos = pos
	renderMeme()
}

function onUp() {
	setLineDrag(false)
	document.body.style.cursor = 'grab'
	gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
	renderMeme()
}

function isLineClicked(line, clickedPos) {
    var { pos, txt, size } = line
    const clickX = clickedPos.x
    const clickY = clickedPos.y

    var textWidth = gCtx.measureText(txt).width
    var textHeight = size

    var textBoxX = pos.x - textWidth / 2
    var textBoxY = pos.y - textHeight / 2

    if (clickX >= textBoxX && clickX <= textBoxX + textWidth &&
        clickY >= textBoxY && clickY <= textBoxY + textHeight) {
        return true
    }
    return false
}

function onSave() {
    console.log('saved this:', gMeme)
    saveToStorage(MEMES_DB, gMeme)
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}


// style="text-decoration: none"
// search-filter-options = gallery-header
// search-text-input = filter-input
