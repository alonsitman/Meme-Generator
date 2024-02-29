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
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
            {
                pos: { x: 50, y: 50 },
                txt: 'I sometimes eat Falafel',
                size: 20,
                fillColor: 'red',
                borderColor: 'white',
                isDrag: false
            }
            ]
}

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme() {
    return gMeme
}

function setImg(elImg) {
    gMeme.selectedImgId = elImg.id
}

function setLineTxt(txt) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function getMemeLine() {
    const lineIdx = gMeme.selectedLineIdx
    return gMeme.lines[lineIdx]
}

function isLineClicked(clickedPos) {
	const line = getMemeLine()
    let { pos, size, txt } = line
    size /= 2

	const xDistance = pos.x - clickedPos.x
    const yDistance = pos.y - clickedPos.y
        
	//Check if clickedPos is inside the txt rectangle
    return (xDistance <= size * txt.length &&
            yDistance <= size)
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