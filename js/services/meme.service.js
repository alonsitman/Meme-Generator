'use strict'

const MEMES_DB = 'memesDB'
const gSavedMemes = loadFromStorage(MEMES_DB)
var gMeme 
createDemoMeme()

var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['evil', 'funny', 'classic']},
    {id: 2, url: 'img/2.jpg', keywords: ['pets', 'classic']},
    {id: 3, url: 'img/3.jpg', keywords: ['babies', 'pets']},
    {id: 4, url: 'img/4.jpg', keywords: ['pets', 'classic']},
    {id: 5, url: 'img/5.jpg', keywords: ['babies', 'funny']},
    {id: 6, url: 'img/6.jpg', keywords: ['surprise']},
    {id: 7, url: 'img/7.jpg', keywords: ['babies', 'surprise']},
    {id: 8, url: 'img/8.jpg', keywords: ['funny']},
    {id: 9, url: 'img/9.jpg', keywords: ['babies', 'funny']},
    {id: 10, url: 'img/10.jpg', keywords: ['funny', 'classic']},
    {id: 11, url: 'img/11.jpg', keywords: ['surprise', 'classic']},
    {id: 12, url: 'img/12.jpg', keywords: ['classic']},
    {id: 13, url: 'img/13.jpg', keywords: ['classic']},
    {id: 14, url: 'img/14.jpg', keywords: ['surprise', 'classic']},
    {id: 15, url: 'img/15.jpg', keywords: ['classic']},
    {id: 16, url: 'img/16.jpg', keywords: ['funny']},
    {id: 17, url: 'img/17.jpg', keywords: ['evil', 'classic']},
    {id: 18, url: 'img/18.jpg', keywords: ['']}
]

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}



function createDemoMeme() {
    createMeme()
    setImg(11)
    setLineTxt('I\'m a lover not a fighter')
}

//     gMeme.lines = [
//                 {
//                     pos: { x: 200, y: 70 },
//                     txt: 'I sometimes eat Falafel',
//                     size: 35,
//                     font: 'Impact',
//                     fillColor: 'white',
//                     borderColor: 'black',
//                     isDrag: false,
//                 },
//                 {
//                     pos: { x: 140, y: 20 },
//                     txt: 'Solidarity Now!',
//                     size: 30,
//                     font: 'Impact',
//                     fillColor: 'white',
//                     borderColor: 'black',
//                     isDrag: false,
//                 }
//                 ]
// }

function createMeme() {
    gMeme = {
        id: makeId(),
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [_createLine()],
    }
}

function getMeme() {
    return gMeme
}

function getCurrLine() {
    const lineIdx = gMeme.selectedLineIdx
    return gMeme.lines[lineIdx]
}

function addLine() {
    const newLine = _createLine()
    gMeme.lines.push(newLine)
    setSelectedLine(newLine.lineIdx)
}

function removeLine() {
	const removeIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(removeIdx, 1)

    if (removeIdx) setSelectedLine(removeIdx - 1)
}

function updateLinePos(dx, dy) {
    const line = getCurrLine()
    line.pos.x += dx
    line.pos.y += dy
}

function setSelectedLine(lineId) {
    const { lines } = getMeme()
    const lineIdx = lines.findIndex(line => line.id === lineId)

    gMeme.selectedLineIdx = lineIdx
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    const line = getCurrLine()
    line.txt = txt
}

function setLineDrag(isDrag) {
    const line = getCurrLine()
    line.isDrag = isDrag
}

function setFillColor(color) {
    const line = getCurrLine()
    line.fillColor = color
}

function setStrokeColor(color) {
    const line = getCurrLine()
    line.strokeColor = color
}

function setLineWidth(newWidth) {
    const line = getCurrLine()
    line.newWidth
}

function incrementTxtSize() {
    const line = getCurrLine()
    line.size++
}

function decrementTxtSize() {
    const line = getCurrLine()
    line.size--
    if (line.size < 1) line.size = 1
}

function _createLine() {
    // const newPos = {
    //     x: 150 + 50 * gMeme.selectedLineIdx,
    //     y: 50 + 50 * gMeme.selectedLineIdx
    // }
    
    return {
        id: makeId(),
        pos: {x: 200, y: 100},
        txt: 'Add Text Here',
        size: 30,
        font: 'Impact',
        fillColor: 'white',
        strokeColor: 'black',
        width: 200,
        isDrag: false,
    }
}
