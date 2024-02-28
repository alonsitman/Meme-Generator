'use strict'

function renderGallery() {
    var strHTML = ''
    var strHTMLs = []

    for (var i = 1; i < 5; i++) {
        const strArticle = `<article class="gallery-img">
                        <img src="meme-imgs/${i}.jpg" alt="meme-img" onclick="onSelectImg(this)">
                    </article>`
        
        strHTMLs.push(strArticle)
    }

    strHTML = strHTMLs.join('')

    const elGallery = document.querySelector('.gallery-grid-container')
    elGallery.innerHTML = strHTML
}