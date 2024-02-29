'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

	renderGallery()
    resizeCanvas()
    addListeners()
	renderMeme()

	var elEditor = document.querySelector('.meme-editor')
	elEditor.style.display = 'none'
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

function displayEditor() {
	var elEditor = document.querySelector('.meme-editor')
	var elGallery = document.querySelector('.img-gallery')

	if (elEditor.style.display === 'none') {
		elEditor.style.display = 'flex'
		elGallery.style.display = 'none'
	}
}

function displayGallery() {
	var elEditor = document.querySelector('.meme-editor')
	var elGallery = document.querySelector('.img-gallery')

	if (elGallery.style.display === 'none') {
		elEditor.style.display = 'none'
		elGallery.style.display = 'block'
	}
}
