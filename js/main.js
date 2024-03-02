'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

	renderGallery()
    resizeCanvas()
    addListeners()
	// renderMeme()

	var elEditor = document.querySelector('.meme-editor-container')
	elEditor.style.display = 'none'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    
    gElCanvas.width = elContainer.clientWidth
}

function addListeners() {
	addMouseListeners()
	addTouchListeners()
	
	window.addEventListener('resize', () => {
		resizeCanvas()
		renderMeme()
	})
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
	var elEditor = document.querySelector('.meme-editor-container')
	var elGallery = document.querySelector('.img-gallery-container')

	if (elEditor.style.display === 'none') {
		elEditor.style.display = 'flex'
		elGallery.style.display = 'none'
	}
}

function displayGallery() {
	var elEditor = document.querySelector('.meme-editor-container')
	var elGallery = document.querySelector('.img-gallery-container')

	if (elGallery.style.display === 'none') {
		elEditor.style.display = 'none'
		elGallery.style.display = 'block'
	}
}

function toggleMenu() {
	document.body.classList.toggle('menu-open')
}