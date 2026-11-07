/* ==========================================================================
   VALLEY DETAIL PAGES LOGIC
   Used by: haa-valley.html, paro-valley.html, phobjikha-valley.html, bumthang-valley.html
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.itinerary-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.parentElement;
            const allItems = document.querySelectorAll('.itinerary-item');
            
            allItems.forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });
            
            parent.classList.toggle('active');
        });
    });

    // Slider & Modal Logic
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const track = document.getElementById('sliderTrack');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    if (track && slides.length > 0) {
        function updateSlider() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        window.moveSlider = (direction) => {
            currentSlide += direction;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            updateSlider();
        };

        window.openModal = (index) => {
            currentSlide = index;
            modalImg.src = slides[currentSlide].src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        };

        window.closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            updateSlider(); // Sync main slider back
        };

        window.modalMoveSlider = (direction) => {
            currentSlide += direction;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            modalImg.src = slides[currentSlide].src;
        };

        // Close modal on click outside content
        window.onclick = (event) => {
            if (event.target == modal) {
                window.closeModal();
            }
        };

        // Attach event listeners for internal slider nav buttons if they exist
        const sliderPrev = document.querySelector('.slider-prev');
        const sliderNext = document.querySelector('.slider-next');
        if (sliderPrev) sliderPrev.onclick = () => window.moveSlider(-1);
        if (sliderNext) sliderNext.onclick = () => window.moveSlider(1);

        // Attach event listeners for modal nav buttons if they exist
        const modalPrev = document.querySelector('.modal-prev');
        const modalNext = document.querySelector('.modal-next');
        const modalClose = document.querySelector('.close-modal');
        if (modalPrev) modalPrev.onclick = () => window.modalMoveSlider(-1);
        if (modalNext) modalNext.onclick = () => window.modalMoveSlider(1);
        if (modalClose) modalClose.onclick = () => window.closeModal();
    }
});
