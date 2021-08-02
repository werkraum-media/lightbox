'use-strict';

function SetupLightboxContainer(options) {
    const lightboxContainers = document.querySelectorAll(`[data-bs-toggle="lightbox"]`);

    if(lightboxContainers.length > 0)
    {
        for(var i=0; i<lightboxContainers.length;i++)
        {
            // Containers for different set of images
            lightboxContainers[i].setAttribute("data-bs-toggle", "lightbox-container-v"+i);
            const lightboxImages = document.querySelectorAll(`[data-bs-toggle="lightbox-container-v${i}"] .lightbox-bootstrap`);
            // Bootstrap Slider
            var carouselSlide = undefined;
            carouselSlide = document.createElement('div');
            carouselSlide.setAttribute("id", "carouselExampleControls-"+i);
            if(options.effect_type === 'fade')
                carouselSlide.setAttribute("class", "carousel slide carousel-fade");
            else
                carouselSlide.setAttribute("class", "carousel slide");

            carouselSlide.addEventListener('slide.bs.carousel', e => setupImage(e.relatedTarget.querySelector("img")));
            window.addEventListener('resize', () => setupImage(document.querySelector("#lightboxModal .modal-dialog img")));
            // Inner carrousel
            var carouselInner = undefined;
            carouselInner = document.createElement('div');
            carouselInner.setAttribute("class", "carousel-inner");
            // Fill images to the slider      
            for (let i = 0; i < lightboxImages.length; i++)
            {
                // Images for slider
                const image = document.createElement('img');
                image.setAttribute("src", lightboxImages[i].getAttribute("src"));
                if(lightboxImages[i].getAttribute("alt")) image.setAttribute("alt", lightboxImages[i].getAttribute("alt"));
                image.setAttribute("class","d-block img-fluid");
                image.style.margin = "0 auto";
                // add modal targets
                lightboxImages[i].setAttribute("data-bs-toggle","modal");
                lightboxImages[i].setAttribute("data-bs-target","#lightboxModal");
                lightboxImages[i].setAttribute("data-mdb-toggle","modal"); // MDBootstrap
                lightboxImages[i].setAttribute("data-mdb-target","#lightboxModal");// MDBootstrap
                // Component image
                const carouselItem = document.createElement('div');
                carouselItem.setAttribute("class", "carousel-item carousel-item-modal");
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
            // Options for lightbox  
            if(document.querySelectorAll(`[data-bs-toggle="lightbox-container-v${i}"][data-bs-arrow="true"]`).length>0)
                addArrows(carouselInner,carouselSlide.id);
            if(document.querySelectorAll(`[data-bs-toggle="lightbox-container-v${i}"][data-bs-ride]`).length>0) {
                const value = document.querySelectorAll(`[data-bs-toggle="lightbox-container-v${i}"][data-bs-ride]`)[0].attributes.getNamedItem("data-bs-ride").nodeValue;
                carouselSlide.setAttribute("data-bs-ride", value);
                carouselSlide.setAttribute("data-mdb-ride", value);
            }
            if(document.querySelectorAll(`[data-bs-toggle="lightbox-container-v${i}"][data-bs-interval]`).length>0) {
                const value = document.querySelectorAll(`[data-bs-toggle="lightbox-container-v${i}"][data-bs-interval]`)[0].attributes.getNamedItem("data-bs-interval").nodeValue;
                carouselSlide.setAttribute("data-bs-interval", value);
                carouselSlide.setAttribute("data-mdb-interval", value);
            }
        }

        // Open carrousel in the same image the user clicked
        const carousel = document.querySelectorAll('.lightbox-bootstrap');
        carousel.forEach(item =>
        {
            item.addEventListener('click', e => {
                const components = document.querySelectorAll(".carousel-item-modal img[src]");
                for(var i =0; i<components.length; i++){
                    if(components[i].getAttribute("src") == item.getAttribute("src"))
                    {
                        document.querySelectorAll(".carousel-item-modal").forEach(item =>{
                            item.classList.remove("active");
                        });
                        components[i].parentNode.setAttribute("class", "carousel-item carousel-item-modal active");
                        setupImage(components[i]);
                        break;
                    }
                }
            });
        });
        // Hide modal 
        const modalContent = document.getElementById("lightboxModal");
        modalContent.addEventListener('hidden.bs.modal', function (event) {
            document.querySelectorAll(".carousel-item-modal").forEach(item =>{
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
    <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev" data-mdb-target="#${id}" data-mdb-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next" data-mdb-target="#${id}" data-mdb-slide="next">
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
    div.setAttribute("id","lightboxModal");
    const divModal = document.createElement('div');
    divModal.setAttribute("class","modal-dialog modal-dialog-centered");
    divModal.style.width = "auto";
    divModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"></h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="modal-lightbox" class="modal-body"></div>
        </div>
    `;
    div.appendChild(divModal);
    carouselItem.appendChild(div);
}

function setupImage(img) {
    const divModal = document.querySelector("#lightboxModal .modal-dialog");
    const modalPadding = 16;
    const modalMargin = 20;
    const modal = document.getElementById("lightboxModal");

    if(img) {
        let modalHeaderHeight = 0;
        divModal.style.maxHeight = "";
        divModal.style.maxWidth = "";

        if(modal) {
            const modalHeader = modal.querySelector(".modal-header");
            const modalTitle = modal.querySelector(".modal-title");

            if(img.getAttribute("alt")) {
                modalHeader.style.removeProperty("display");
                modalTitle.textContent = img.getAttribute("alt");
                modalHeaderHeight = modalHeader.clientHeight || 68;
            } else {
                modalHeader.style.display = "none";
            }
        }

        let width = img.width;
        let height = img.height;

        const aspectRatio = width / height;

        const maxWidth = Math.min(width + modalPadding * 2, window.innerWidth);
        const maxHeight = Math.min(height, window.innerHeight - modalPadding * 2 - modalMargin * 2 - modalHeaderHeight);

        if(width + modalPadding * 2 > maxWidth) {
            width = maxWidth;
            height = ((maxWidth - modalPadding * 2 - modalMargin * 2 - modalHeaderHeight) / aspectRatio);
        } else {
            width = width + modalPadding * 2;
        }
        
        if(height > maxHeight) {
            width = Math.ceil(maxHeight * aspectRatio) - modalPadding * 2;
            height = (maxHeight / aspectRatio);
        } else {
            height += modalPadding * 2 + modalMargin * 2 + modalHeaderHeight;
        }

        divModal.style.maxHeight = height + "px";
        divModal.style.maxWidth = width + "px";
    }
}

module.exports.SetupLightboxContainer = SetupLightboxContainer;
