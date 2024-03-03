'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')
	addListeners()
	
	hideEditor()
	renderGallery()
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

	if (elEditor.style.display === 'none') {
		elEditor.style.display = 'flex'
	}
}

function hideEditor() {
	var elEditor = document.querySelector('.meme-editor-container')

	if (elEditor.style.display !== 'none') {
		elEditor.style.display = 'none'
	}
}

function displayGallery() {
	var elGallery = document.querySelector('.img-gallery-container')

	if (elGallery.style.display === 'none') {
		elGallery.style.display = 'block'
	}
}

function hideGallery() {
	var elGallery = document.querySelector('.img-gallery-container')

	if (elGallery.style.display !== 'none') {
		elGallery.style.display = 'none'
	}
}

function toggleMenu() {
	document.body.classList.toggle('menu-open')
}