'use strict'

let gElCanvas
let gCtx
let gImg

// function renderMeme() {
//     const meme = getMeme()


// }

function onSelectImg(elImg) {
    setImg(elImg)
    renderMeme()
}

function renderMeme() {
    gElCanvas.height = (gImg.naturalHeight / gImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
}