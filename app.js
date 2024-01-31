const submitIcon = document.querySelector("#submit-icon")
const inputElement = document.querySelector("input")
const imageSection = document.querySelector(".images-section")
const thumbsUp = document.getElementById('thumbs-up');
const thumbsDown = document.getElementById('thumbs-down');

const getImages = async () => {
   
    thumbsUp.style.display = 'none';
    thumbsDown.style.display = 'none';

    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(imageContainer => {
        imageSection.removeChild(imageContainer);
    });

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            size: "1024x1024",
            quality:"standard",
            n:1,
            model: "dall-e-3"
        })
       
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options);
        const data = await response.json();
        console.log(data);

        if (data?.data.length > 0) { 
            data.data.forEach(imageObject => {
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container");
                const imageElement = document.createElement("img");
                imageElement.setAttribute("src", imageObject.url);
                imageContainer.append(imageElement);
                imageSection.append(imageContainer);
            });
            thumbsUp.style.display = 'block'; 
            thumbsDown.style.display = 'block';
        } else {
            
        }
    } catch (error) {
        console.log(error);
    }
}


submitIcon.addEventListener("click", function() {
    getImages();

  
    this.innerHTML = '<i class="fas fa-spinner"></i>';

    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-arrow-right"></i>';
        thumbsUp.disabled = false; 
        thumbsDown.disabled = false; 
    }, 15000);
});


thumbsUp.addEventListener('click', function() {
    if (thumbsUp.innerHTML.includes('fas fa-thumbs-up')) {
        thumbsUp.innerHTML = '<i class="far fa-thumbs-up"></i>';
    } else {
        thumbsUp.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    }
});

thumbsDown.addEventListener('click', function() {
    if (thumbsDown.innerHTML.includes('fas fa-thumbs-down')) {
        thumbsDown.innerHTML = '<i class="far fa-thumbs-down"></i>';
    } else {
        thumbsDown.innerHTML = '<i class="fas fa-thumbs-down"></i>';
    }
});
