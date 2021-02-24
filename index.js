function SetupLightboxContainer(options) {
    const lightboxContainers = document.querySelectorAll("#lightbox-container");

    // Predefined settings
    if(options.interval_time == undefined)
        options.interval_time = 5000;
    if(options.arrow_mode == undefined)
        options.arrow_mode = true;
    if(options.effect_type == undefined)
        options.effect_type = "normal";

    if(lightboxContainers.length <= 0)
        console.log("Doesn't exist");
    else
    {
        for(var i=0; i<lightboxContainers.length;i++)
        {
            // Containers for different set of images
            lightboxContainers[i].setAttribute("id", "lightbox-container-v"+i);
            const lightboxImages = document.querySelectorAll("#"+lightboxContainers[i].id+" .lightbox-bootstrap");
            // Bootstrap Slider
            var carouselSlide = undefined;
            carouselSlide = document.createElement('div');
            carouselSlide.setAttribute("id", "carouselExampleControls-"+i);
            if(options.effect_type === 'fade')
                carouselSlide.setAttribute("class", "carousel slide carousel-fade");
            else
                carouselSlide.setAttribute("class", "carousel slide");
            carouselSlide.setAttribute("data-bs-ride", `${options.carousel_type}`);
            carouselSlide.setAttribute("data-bs-interval", `${options.interval_time}`);
            // Inner carrousel
            var carouselInner = undefined;
            carouselInner = document.createElement('div');
            carouselInner.setAttribute("class", "carousel-inner");
            // Fill images to the slider      
            for (let i = 0; i < lightboxImages.length; i++)
            {
                // Images for slider
                const image = lightboxImages[i].cloneNode();
                image.setAttribute("class","d-block w-100");
                // add modal targets
                lightboxImages[i].setAttribute("data-bs-toggle","modal");
                lightboxImages[i].setAttribute("data-bs-target","#exampleModal");
                // Component image
                const carouselItem = document.createElement('div');
                carouselItem.setAttribute("class", "carousel-item");
                // add image to carrousel item 
                carouselItem.appendChild(image);
                // add carrousel item to inner
                carouselInner.appendChild(carouselItem);
            }
            // add inner carrousel to slider
            carouselSlide.appendChild(carouselInner);
            // Create modal
            if(i==0)
                addModal(lightboxContainers[i].parentNode);
            const modal = document.getElementById("modal-lightbox");
            modal.appendChild(carouselSlide);
            if(options.arrow_mode === true)
                addArrows(carouselInner,carouselSlide.id);
        }

        // Open carrousel in the same image the user clicked
        const carousel = document.querySelectorAll('.lightbox-bootstrap');
        carousel.forEach(item =>
        {
            item.addEventListener('click', function (e) {
                const components = document.querySelectorAll(".carousel-item img[src]");
                for(var i =0; i<components.length; i++){
                    if(components[i].currentSrc == item.src)
                    {
                        document.querySelectorAll(".carousel-item").forEach(item =>{
                            item.classList.remove("active");
                        });
                        components[i].parentNode.setAttribute("class", "carousel-item active");
                        break;
                    }
                }
            });
        });
        // Hide modal 
        const modalContent = document.getElementById("exampleModal");
        modalContent.addEventListener('hidden.bs.modal', function (event) {
            document.querySelectorAll(".carousel-item").forEach(item =>{
                item.classList.remove("active");
            });
        });
    }
}

// Bootstrap function
function addArrows(carouselItem, id)
{
    const div = document.createElement('div');
    div.innerHTML = `
    <button class="carousel-control-prev" type="button" data-bs-target="#${id}"  data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#${id}"  data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    `;
    carouselItem.appendChild(div);
}
// Bootstrap function
function addModal(carouselItem)
{
    const div = document.createElement('div');
    div.setAttribute("class","modal fade");
    div.setAttribute("id","exampleModal");
    div.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div id="modal-lightbox" class="modal-body">
                </div>
            </div>
        </div>
    `;
    carouselItem.appendChild(div);
}

module.exports.SetupLightboxContainer = SetupLightboxContainer;