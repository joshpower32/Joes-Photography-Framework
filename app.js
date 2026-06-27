const app = {};

// Get a free instant key at https://www.pexels.com/api/
app.key = '4SuTxTJkprUsJAP1CZoSkd412wKx4EuXt7xfK5HzZf9DreiCe8Wv0twm';

app.photos = [];
app.currentIndex = 0;

app.init = function () {
    app.buildLightbox();
    app.getCurated();
};

// Load a small, curated set of high-quality "portfolio" photos by default.
app.getCurated = function () {
    $.ajax({
        url: 'https://api.pexels.com/v1/curated',
        method: 'GET',
        dataType: 'JSON',
        headers: { Authorization: app.key },
        data: { per_page: 12 }
    }).then(function (result) {
        $('.results').empty();
        app.photos = result.photos || [];
        app.displayImages(app.photos);
    }).catch(function () {
        $('.results').html('<p class="no-results">Could not load photos. Check your API key.</p>');
    });
};

app.buildLightbox = function () {
    $('body').append(`
        <div id="lightbox" class="lightbox" role="dialog" aria-modal="true">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <button class="lightbox-prev" aria-label="Previous photo">&#8249;</button>
            <button class="lightbox-next" aria-label="Next photo">&#8250;</button>
            <div class="lightbox-inner">
                <img id="lightbox-img" src="" alt="">
                <p class="lightbox-credit" id="lightbox-credit"></p>
            </div>
        </div>
    `);

    $('#lightbox .lightbox-close').on('click', app.closeLightbox);

    // Close when clicking the dark backdrop (not the image)
    $('#lightbox').on('click', function (e) {
        if (e.target === this) app.closeLightbox();
    });

    $('#lightbox .lightbox-prev').on('click', function () { app.navigate(-1); });
    $('#lightbox .lightbox-next').on('click', function () { app.navigate(1); });

    $(document).on('keydown', function (e) {
        if (!$('#lightbox').hasClass('open')) return;
        if (e.key === 'Escape')     app.closeLightbox();
        if (e.key === 'ArrowLeft')  app.navigate(-1);
        if (e.key === 'ArrowRight') app.navigate(1);
    });

    // Open lightbox on card click (delegation handles dynamically added cards)
    $(document).on('click', '.photo-box', function () {
        app.openLightbox(parseInt($(this).data('index')));
    });

    // Keyboard-activate cards (accessibility)
    $(document).on('keydown', '.photo-box', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            app.openLightbox(parseInt($(this).data('index')));
        }
    });

    // Don't let attribution link clicks bubble up and open the lightbox
    $(document).on('click', '.photo-credit a', function (e) {
        e.stopPropagation();
    });
};

app.navigate = function (dir) {
    app.currentIndex = (app.currentIndex + dir + app.photos.length) % app.photos.length;
    app.showPhoto(app.currentIndex);
};

app.openLightbox = function (index) {
    app.currentIndex = index;
    app.showPhoto(index);
    $('#lightbox').addClass('open');
    $('body').addClass('no-scroll');
};

app.closeLightbox = function () {
    $('#lightbox').removeClass('open');
    $('body').removeClass('no-scroll');
    $('#lightbox-img').attr('src', '');
};

app.showPhoto = function (index) {
    const photo = app.photos[index];
    const img = document.getElementById('lightbox-img');

    // Fade in once the high-res image has loaded
    img.style.opacity = '0';
    img.onload = function () { img.style.opacity = '1'; };

    $('#lightbox-img')
        .attr('src', photo.src.large2x)
        .attr('alt', photo.alt || 'Photography');

    $('#lightbox-credit').html(
        `Photo by <a href="${photo.photographer_url}" target="_blank" rel="noopener">${photo.photographer}</a>
         on <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a>`
    );
};

app.getImages = function (query) {
    $.ajax({
        url: 'https://api.pexels.com/v1/search',
        method: 'GET',
        dataType: 'JSON',
        headers: { Authorization: app.key },
        data: { query: query, per_page: 12, orientation: 'landscape' }
    }).then(function (result) {
        $('.results').empty();
        app.photos = result.photos || [];
        app.displayImages(app.photos);
    }).catch(function () {
        $('.results').html(
            '<p class="no-results">Could not load photos. Check your API key.</p>'
        );
    });
};

app.displayImages = function (data) {
    if (!data || data.length === 0) {
        $('.results').html(
            '<p class="no-results">No photos found. Try a different search.</p>'
        );
        return;
    }

    data.forEach(function (photo, index) {
        const imgHTML = `
            <div class="photo-box" data-index="${index}" role="button" tabindex="0"
                 aria-label="View full size photo by ${photo.photographer}">
                <div class="img-box">
                    <img src="${photo.src.medium}" alt="${photo.alt || 'Photography'}">
                </div>
                <p class="photo-credit">
                    <a href="${photo.photographer_url}" target="_blank" rel="noopener">${photo.photographer}</a>
                    on
                    <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a>
                </p>
            </div>
        `;
        $('.results').append(imgHTML);
    });
};

$('form').on('submit', function (event) {
    event.preventDefault();
    const item = $('.userInput').val().trim();
    if (!item) return;
    $('.userInput').val('');
    app.getImages(item);
});

$(document).ready(function () {
    app.init();
});
