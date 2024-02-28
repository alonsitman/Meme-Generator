'use strict'

let gElCanvas
let gCtx

// function renderMeme() {
//     const meme = getMeme()


// }

function onSelectImg(elImg) {
    setImg(elImg)
    renderMeme()
}

function renderMeme() {
    var img = gMeme.img
    
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onAddTxt(val) {
    setLineTxt(val)
    gCtx.fillText(gMeme.txtLine, 50, 50)
}

// function onSetColor {
//     gCtx.fillStyle = document.getElementById('set-color').value
// }

// function onSetFont() {
    // gCtx.font = "bold 18px Arial"
    // gCtx.font = document.querySelector('set-font').value
// }

function onSave() {
    saveToStorage(MEMES_DB, gMeme)
}

// function onLoad() {
//     gMeme = loadFromStorage(MEMES_DB)


// }

// function onClearEdit() {

// }