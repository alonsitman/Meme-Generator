'use strict'

const MEMES_DB = 'memes'

var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']},
    {id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat']},
    {id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat']},
    {id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat']},
    {id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat']},
    {id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat']},
    {id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat']},
    {id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat']},
    {id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat']},
    {id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat']},
    {id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat']},
    {id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat']},
    {id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat']},
    {id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat']},
    {id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat']},
    {id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat']},
    {id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat']},
    {id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat']}
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
            {
                pos: { x: 200, y: 70 },
                txt: 'I sometimes eat Falafel',
                size: 35,
                font: 'Impact',
                fillColor: 'white',
                borderColor: 'black',
                isDrag: false,
                lineIdx: 0
            },
            {
                pos: { x: 140, y: 20 },
                txt: 'Solidarity Now!',
                size: 30,
                font: 'Impact',
                fillColor: 'white',
                borderColor: 'black',
                isDrag: false,
                lineIdx: 1
            }
            ]
}

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme() {
    return gMeme
}

function setImg(elImg) {
    const meme = getMeme()
    meme.selectedImgId = elImg.id
}

function setLineTxt(txt) {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    meme.lines[lineIdx].txt = txt
}

function getMemeLine() {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    return meme.lines[lineIdx]
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

function setLineDrag(isDrag) {
    const line = getMemeLine()
    line.isDrag = isDrag
}

function moveLine(dx, dy) {
    const line = getMemeLine()
    line.pos.x += dx
    line.pos.y += dy
}

function addLine() {
    const meme = getMeme()
    const newLine = _createLine()

    meme.lines.push(newLine)
    setSelectedLine(newLine.lineIdx)
}

function removeLine() {
    const meme = getMeme()
	const removeIdx = meme.selectedLineIdx
    meme.lines.splice(removeIdx, 1)

    if (removeIdx) setSelectedLine(removeIdx - 1)
}

function setSelectedLine(lineIdx) {
    const meme = getMeme()
    meme.selectedLineIdx = lineIdx
}

function setFillColor(color) {
    const line = getMemeLine()
    line.fillColor = color
}

function setBorderColor(color) {
    const line = getMemeLine()
    line.borderColor = color
}

function incrementSize() {
    const line = getMemeLine()
    line.size++
}

function decrementSize() {
    const line = getMemeLine()
    line.size--
}

function _createLine() {
    const lineIdx = gMeme.lines.length
    const newPos = {
        x: 150 + 50 * lineIdx,
        y: 50 + 50 * lineIdx
    }
    
    return {
        pos: newPos,
        txt: 'Add Text Here',
        size: 30,
        font: 'Impact',
        fillColor: 'white',
        borderColor: 'black',
        isDrag: false,
        lineIdx: lineIdx
    }
}