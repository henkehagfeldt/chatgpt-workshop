var input = document.getElementById('user_input');

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        readButton();
    }
});

async function queryOpenAI(prompt) {

    prompt += ` be ${setting}, and don't include anything conversational context. Maximum two sentences.`;

    try {
        const response = await fetch(chatCompletionUrl, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                temperature: temperature,
                top_p: top_p,
                model: model,
                messages: [
                    {"role": "system", "content": systemSetting},
                    {"role": "user", "content": prompt}
                ] 
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error querying OpenAI:', error);
    }
}

function animateWand(shouldAnimate) {
    let wand = document.querySelector(".wand");

    if (shouldAnimate) {
        wand.classList.add("animated_wand");
    } else {
        wand.setAttribute('class', 'wand');
    }
    
}

function readButton() {
    
    animateWand(true);

    let user_input = document.querySelector("#user_input").value;
    console.log(user_input);

    showSpinner();

    queryOpenAI(`Give me a random ${user_input}`)
    .then(answer => {
        if (answer != undefined) {
            generateImage(user_input, answer);
        } else {
            document.querySelector("#chatgpt_output").innerHTML = "Something went wrong";
        }
    });
}

function showResponse(response) {
    setTimeout(() => {
        document.querySelector("#chatgpt_output").innerHTML = response;
        showImage();
        animateWand(false);
    }, showImageDelay);
}

async function generateImage(prompt, answer) {
    
    let imagePrompt = `Make a ${imageStyle} image of a ${prompt} that is ${answer}.`;
    const response = await fetch(imageGenerationUrl, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            prompt: imagePrompt,
            n: 1,
            size: imageSize
        })
    });

    const responseData = await response.json();
    displayImage(responseData.data[0].url);
    showResponse(answer);
}

function displayImage(imageUrl) {
    let imgElement =  document.querySelector('#generated-image');
    imgElement.src = imageUrl;
    console.log("Image has been set");
}

function showSpinner() {
    let spinner = document.querySelector("#loading-spinner");
    spinner.style.display = "block";

    let image = document.querySelector("#generated-image");
    image.style.display = "none";
}

function showImage() {
    let spinner = document.querySelector("#loading-spinner");
    spinner.style.display = "none";

    let image = document.querySelector("#generated-image");
    image.style.display = "block";
}