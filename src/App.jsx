import {useCallback, useState } from 'react';
import { RiSpeakFill } from "react-icons/ri";
import { MdFiberManualRecord } from "react-icons/md";
import { FaStop } from "react-icons/fa"; 
import locales from './locales';
import SettingModal from './Components/SettingModal';
import { IoSettings } from "react-icons/io5";
import { handleGoogleTTSPlayback } from './apiHandlers/googleTTS';
import { generateOpenAIResponse } from './apiHandlers/openAI';
import Footer from './Components/Footer';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
function App() {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en-US');
  const [outputLanguage, setOutputLanguage] = useState('en-US');
  const [isRecording, setIsRecording] = useState(false); 
  const [recordingTime, setRecordingTime] = useState(0); 
  const [timer, setTimer] = useState(null); 
  const [ai_generated_text, setAiGeneratedText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true; 
  recognition.interimResults = true; 

  const handleVoiceInput = () => {
    recognition.lang = inputLanguage;
    recognition.start();

    setIsRecording(true); 
    setRecordingTime(0); 

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setOriginalText(transcript);
      const simulatedTranslation = translateText(transcript, outputLanguage);
      setTranslatedText(simulatedTranslation);
    };
    

    recognition.onerror = (event) => {
      console.error('Error occurred during speech recognition: ', event.error);
    };

    const newTimer = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimer(newTimer); 
  };

  const stopRecording = async () => {
    recognition.stop(); 
    clearInterval(timer); 
    setIsRecording(false);

     await generateOpenAIResponse(originalText, outputLanguage, setAiGeneratedText);
  };

  const translateText = (text, lang) => {
    const translations = locales[lang]; 
    if (translations) {
      return translations[text] || text; 
    }
    return text; 
  };


  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        push: { quantity: 1 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#EE3429" },
      links: {
        color: "#EE3429",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        speed: 1,
      },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.75 },
      shape: { type: "" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  
  

  return (
    <div className="App">
  <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
    <SettingModal show={isModalOpen} onClose={setIsModalOpen}
     inputLanguage={inputLanguage}
      setInputLanguage={setInputLanguage}
       outputLanguage={outputLanguage}
        setOutputLanguage={setOutputLanguage}
        />

       <div className="bg-black h-screen text-black/50 dark:bg-black dark:text-white/50 overflow-auto">
      
        <img
          id="background"
          className="absolute -left-20 top-0 h-full object-cover"
          src="https://laravel.com/assets/img/welcome/background.svg"
        />
       
        <div className="relative  flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
    
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header className="grid grid-cols-1 items-center  py-10 lg:grid-cols-3">
              <div className="flex lg:col-start-2 lg:justify-center">
                <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
              </div>
              <IoSettings onClick={() => setIsModalOpen(true)} className='absolute top-10 right-4  cursor-pointer' size={30} color='white' />
            </header>

            <main className="mt-6">
  <div className="grid gap-6 lg:grid-cols-1 lg:gap-8">
    <div className="p-6 rounded-lg bg-white opacity-60 shadow-md dark:bg-zinc-900 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">Original Transcript</h2>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{originalText || "No input yet."}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">Translated Transcript</h2>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{translatedText || "No translation yet."}</p>
        </div>
      </div>

     
    </div>

    <div className="p-6 rounded-lg bg-white opacity-60 shadow-md dark:bg-zinc-900 space-y-6">
        <h2 className="text-xl font-semibold text-black dark:text-white">AI Translated Transcript</h2>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{ai_generated_text || "No translation yet."}</p>
      </div>

  </div>
</main>


                {isRecording ? (
                  <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 ">
                  <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 ">
                    Recording time: {recordingTime}s
                    </span>
                    <button 
                      onClick={stopRecording} 
                      className="bg-red-500 rounded-full px-4 py-4 hover:bg-red-600 fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
                    >
                      <FaStop size={20} className="cursor-pointer" color="white" />
                    </button>
                    </div>
                  ) : (
                    <div className=' fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50'>
                    <button 
                      onClick={handleVoiceInput} 
                      disabled={isRecording} 
                      className="bg-white rounded-full px-2 py-2 hover:bg-gray-300 hover:scale-105  left-1/2 transform -translate-x-1/2 z-50"
                    >
                      <MdFiberManualRecord size={30} className="cursor-pointer" color="red" />
                    </button>

                    <button onClick={()=> handleGoogleTTSPlayback(ai_generated_text, outputLanguage)} className='bg-white rounded-full mt-4 px-2 py-2 hover:bg-gray-300 hover:scale-105' disabled={isRecording || !ai_generated_text}>
                    <RiSpeakFill size={30} className='cursor-pointer' color='black'  />
                    </button>
                    </div>

                  )}



          </div>
        </div>
        </div>

                  <Footer/>

       
            </div>
  );
}

export default App;
