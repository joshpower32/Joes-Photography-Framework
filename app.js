const app = {};

// Get a free instant key at https://www.pexels.com/api/
// Only needed for the LIVE SEARCH feature — the default gallery below is
// pinned to direct image URLs and loads instantly with no API call.
app.key = '4SuTxTJkprUsJAP1CZoSkd412wKx4EuXt7xfK5HzZf9DreiCe8Wv0twm';

// Default "portfolio" gallery — pinned Pexels shots (no API roundtrip, no
// pop-in, and the gallery never changes under you). To swap a photo, browse
// pexels.com and paste the image address; for a real client, replace these
// with their own photos.
app.curatedPhotos = [
    { src: { medium: "https://images.pexels.com/photos/34960157/pexels-photo-34960157.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/34960157/pexels-photo-34960157.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Silhouette of a hiker walking with distant volcanoes and a sea of clouds in Guatemala.", photographer: "Diego Girón", photographer_url: "https://www.pexels.com/@diego-giron-464799823" },
    { src: { medium: "https://images.pexels.com/photos/37911536/pexels-photo-37911536.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/37911536/pexels-photo-37911536.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "A serene outdoor pool next to a sunlit stone house with palm tree and lush greenery.", photographer: "Nuri Askerhan", photographer_url: "https://www.pexels.com/@nuri-askerhan-2158943795" },
    { src: { medium: "https://images.pexels.com/photos/32603655/pexels-photo-32603655.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/32603655/pexels-photo-32603655.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "A Great Cormorant stands on a rock by the shoreline, gazing into the distance.", photographer: "János Csatlós", photographer_url: "https://www.pexels.com/@sataz" },
    { src: { medium: "https://images.pexels.com/photos/15393678/pexels-photo-15393678.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/15393678/pexels-photo-15393678.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Stunning view of a coastal cliff with people sightseeing, clear skies, and blue ocean.", photographer: "Alex Does Pictures", photographer_url: "https://www.pexels.com/@alex-does-pictures-33201512" },
    { src: { medium: "https://images.pexels.com/photos/6306236/pexels-photo-6306236.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/6306236/pexels-photo-6306236.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Woman in traditional hijab and dress standing in a doorway in Marrakesh", photographer: "Piotr Arnoldes", photographer_url: "https://www.pexels.com/@piotr-arnoldes-7862031" },
    { src: { medium: "https://images.pexels.com/photos/36704256/pexels-photo-36704256.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/36704256/pexels-photo-36704256.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Boats and swimmers in azure waters off the coast of Cetara, Campania, Italy.", photographer: "Alexey Dulin", photographer_url: "https://www.pexels.com/@alexey-dulin-19422188" },
    { src: { medium: "https://images.pexels.com/photos/31349058/pexels-photo-31349058.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/31349058/pexels-photo-31349058.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Detailed view of St. Mark's Basilica and Bell Tower under clear blue sky in Venice, Italy.", photographer: "sn3k", photographer_url: "https://www.pexels.com/@sn3k-54158755" },
    { src: { medium: "https://images.pexels.com/photos/37927742/pexels-photo-37927742.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/37927742/pexels-photo-37927742.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Stylish woman stands confidently in an urban architectural environment", photographer: "Ola Szkolda", photographer_url: "https://www.pexels.com/@olaszkolda" },
    { src: { medium: "https://images.pexels.com/photos/37940566/pexels-photo-37940566.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/37940566/pexels-photo-37940566.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Scenic view of Meoto Iwa Rocks in Mie, Japan, symbolizing marriage and harmony.", photographer: "Giuseppe Paoletti", photographer_url: "https://www.pexels.com/@giusxpe" },
    { src: { medium: "https://images.pexels.com/photos/37852931/pexels-photo-37852931.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/37852931/pexels-photo-37852931.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "A breathtaking aerial view of the vibrant waters and lush coastline of the Windward Islands in French Polynesia.", photographer: "Eliza Ross", photographer_url: "https://www.pexels.com/@eliza-ross-2161941282" },
    { src: { medium: "https://images.pexels.com/photos/36656004/pexels-photo-36656004.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/36656004/pexels-photo-36656004.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "A European Starling sits on a bare tree branch under a clear blue sky.", photographer: "Sergey Antonov", photographer_url: "https://www.pexels.com/@sergey-antonov-2159115697" },
    { src: { medium: "https://images.pexels.com/photos/6604701/pexels-photo-6604701.jpeg?auto=compress&cs=tinysrgb&w=640", large2x: "https://images.pexels.com/photos/6604701/pexels-photo-6604701.jpeg?auto=compress&cs=tinysrgb&w=1600" }, alt: "Relaxing balcony setup with chairs and table overlooking a sparkling blue sea", photographer: "Dimitris Mourousiadis", photographer_url: "https://www.pexels.com/@dimi" },
];

app.photos = [];
app.currentIndex = 0;

app.init = function () {
    app.buildLightbox();
    app.getCurated();
};

// Show the pinned default gallery — instant, no network request needed.
app.getCurated = function () {
    $('.results').empty();
    app.photos = app.curatedPhotos;
    app.displayImages(app.photos);
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
