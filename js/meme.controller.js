'use strict'

let gElCanvas
let gCtx

function renderMeme() {
    const meme = getMeme()


}

function onSelectImg(elImg) {
    renderMeme(elImg)
}

function renderMeme(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}