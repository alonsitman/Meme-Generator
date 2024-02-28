'use strict'

function onInit() {
    renderGallery()
    
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    window.addEventListener('resize', () => resizeCanvas())
    
    // renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}

