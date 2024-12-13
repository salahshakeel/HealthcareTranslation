export const generateOpenAIResponse = async (text, outputLanguage, setAiGeneratedText) => {
    const apiKey =  process.env.REACT_APP_OPEN_AI_API_KEY; 
    const url = "https://api.openai.com/v1/chat/completions";
  
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a voice-to-text transcription assistant specializing in medical terminology. Accurately transcribe spoken input in {outputLanguage}, especially medical terms, technical jargon, and complex medical language. Do not provide answers, explanations, or additional context unless explicitly requested. Focus solely on transcribing the spoken words in ${outputLanguage} with high accuracy, using context and generative AI to ensure clear and precise transcription of medical terms without modification.`,
        },
        { role: "user", content: text },
      ],
      temperature: 0.5,
      max_tokens: 150, 
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        console.error("Error with OpenAI API:", response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const result = data.choices[0].message.content;
      setAiGeneratedText(result); 
    } catch (error) {
      console.error("Error with OpenAI API:", error);
    }
  };