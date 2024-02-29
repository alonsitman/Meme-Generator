'use strict'

let gElCanvas
let gCtx

// function renderMeme() {
//     const meme = getMeme()


// }

function onSelectImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    
    setImg(elImg)
    renderMeme()
}

function renderMeme() {
    var img = document.createElement('img')
    img.src = `meme-imgs/${gMeme.selectedImgId}.jpg`
   
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onAddTxt(txt) {
    setLineTxt(txt)
    
    
    // gCtx.fillText(txt, 50, 50)
}

// function onSetColor {
//     gCtx.fillStyle = document.getElementById('set-color').value
// }

// function onSetFont() {
    // gCtx.font = "bold 18px Arial"
    // gCtx.font = document.querySelector('set-font').value
// }

function onSave() {
    console.log('saved this:', gMeme)
    saveToStorage(MEMES_DB, gMeme)
}

function onLoad() {
    gMeme = loadFromStorage(MEMES_DB)
    console.log('gMeme:', gMeme)
    console.log('.img:', gMeme.img)
    renderMeme()
}

// function onClearEdit() {

// }