
// const apiKey = "<your-api-key-here>";
const imageGenerationUrl = "https://api.openai.com/v1/images/generations";
const chatCompletionUrl = "https://api.openai.com/v1/chat/completions";
const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
};

const temperature = 1;
const top_p = 1;
const model = "gpt-3.5-turbo";

const systemSetting = "You are a good randomization tool.";
const setting = "wacko";
const imageStyle = "photo-realistic";
const imageSize = "512x512";
const showImageDelay = 1000;