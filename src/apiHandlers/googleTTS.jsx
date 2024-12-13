export const handleGoogleTTSPlayback = async (ai_generated_text, outputLanguage) => {
    const apiKey =  process.env.REACT_APP_GOOGLE_TTS_API_KEY;
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
  
    const requestData = {
      input: { text: ai_generated_text || "No text to synthesize." },
      voice: {
        languageCode: outputLanguage,
        name: `${outputLanguage}-Journey-F`,
      },
      audioConfig: {
        audioEncoding: "LINEAR16",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: 0.0,
        speakingRate: 0.0,
        sampleRateHertz: 32000,
      },
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        console.error("Error with Google TTS API:", response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const audioContent = data.audioContent;
  
      const audioBlob = new Blob([Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0))], {
        type: "audio/wav",
      });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error with Google TTS API:", error);
    }
  };