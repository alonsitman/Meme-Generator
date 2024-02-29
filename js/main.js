'use strict'

function onInit() {
    renderGallery()
    
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    addListeners()

    // renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    
    gElCanvas.width = elContainer.clientWidth
}

function addListeners() {
	addMouseListeners()
	addTouchListeners()
	
	window.addEventListener('resize', () => resizeCanvas())
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousedown', onDown)
	gElCanvas.addEventListener('mousemove', onMoveLine)
	gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchstart', onDown)
	gElCanvas.addEventListener('touchmove', onMoveLine)
	gElCanvas.addEventListener('touchend', onUp)
}

