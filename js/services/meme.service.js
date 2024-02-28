'use strict'

var gMeme = {
    img: '',
    txtLine: '',
}
const MEMES_DB = 'memes'

function getMeme() {
    return gMeme
}

function setImg(elImg) {
    gMeme.img = elImg
}

function setLineTxt(val) {
    gMeme.txtLine = val   
}