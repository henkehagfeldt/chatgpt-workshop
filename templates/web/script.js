function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function queryOpenAI(prompt) {

    // Insert your API key here
    const apiKey = '<api-key>'; 

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                temperature: 1,
                top_p: 1,
                model: "gpt-3.5-turbo",
                messages: [
                    {"role": "system", "content": "You are a good randomization tool."},
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

function readButton() {
    let wand = document.querySelector(".wand");
    wand.classList.add("animated_wand");

    let user_input = document.querySelector("#user_input").value;
    console.log(user_input);

    queryOpenAI(`Give me a random ${user_input} and nothing else, be ridiculous.`)
    .then(answer => {
        if (answer != undefined) {
            document.querySelector("#chatgpt_output").innerHTML = answer;
        } else {
            
            document.querySelector("#chatgpt_output").innerHTML = "Something went wrong";
        }
        
        wand.setAttribute('class', 'wand');
    });
}