import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CameraOff, Mic, MicOff, Square, Pause, Play, 
  ChevronRight, Bot, CheckCircle, AlertCircle
} from 'lucide-react';
import { interviewQuestions } from '../data/mockData';

const Interview = () => {
  const navigate = useNavigate();
  
  // State
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const currentQuestion = interviewQuestions[currentQuestionIndex] || interviewQuestions[0];
  const totalQuestions = interviewQuestions.length;

  // Setup media on mount
  useEffect(() => {
    const startMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setStream(mediaStream);
        setCameraActive(true);
        setMicActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices", err);
        if (err.name === 'NotAllowedError') {
          setCameraError('Permission denied. Please enable camera and microphone permissions.');
        } else if (err.name === 'NotFoundError') {
          setCameraError('No camera or microphone found on this device.');
        } else {
          setCameraError('Camera unavailable.');
        }
      }
    };
    startMedia();
    
    // Timer
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startRecording = () => {
    if (!stream) return;
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];
    recorder.ondataavailable = (e) => { 
      if (e.data.size > 0) chunksRef.current.push(e.data); 
    };
    recorder.start();
    setIsRecording(true);
    setIsPaused(false);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleNextQuestion = () => {
    stopRecording();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    stopRecording();
    setIsComplete(true);
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
    }
    clearInterval(timerRef.current);
    
    setTimeout(() => {
      navigate('/results/1');
    }, 2000);
  };

  const getDifficultyBadgeColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-amber-100 text-amber-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionTypeBadgeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'behavioral': return 'bg-purple-100 text-purple-800';
      case 'hr': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isComplete) {
    return (
      <div className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900">Interview Complete!</h2>
          <p className="text-gray-600 text-lg">Your responses are being analyzed...</p>
          <div className="flex justify-center pt-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100 overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-semibold text-gray-900 hidden sm:block">InterviewAI</span>
        </div>
        
        <div className="flex items-center justify-center font-mono text-xl font-medium text-gray-900 bg-gray-100 px-4 py-1.5 rounded-md">
          {formatTime(timer)}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-gray-500 hidden sm:block">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <button 
            onClick={() => setShowEndModal(true)}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-medium transition-colors"
          >
            End Interview
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel: Video */}
        <div className="flex-1 md:w-3/5 p-4 flex flex-col relative bg-gray-900">
          <div className="flex-1 relative rounded-xl overflow-hidden bg-black shadow-inner">
            {cameraError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                <CameraOff className="w-16 h-16 mb-4 text-gray-500" />
                <p className="text-lg font-medium text-gray-300">{cameraError}</p>
              </div>
            ) : (
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
              />
            )}
            
            {/* Video Overlays */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${micActive ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs font-medium text-white shadow-sm">
                  {micActive ? 'Mic On' : 'Mic Off'}
                </span>
                <div className="w-px h-3 bg-white/30 mx-1" />
                <div className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs font-medium text-white shadow-sm">
                  {cameraActive ? 'Camera On' : 'Camera Off'}
                </span>
              </div>
              
              {isRecording && (
                <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wider">REC</span>
                  {isPaused && <span className="text-xs text-amber-400 font-bold ml-1">(PAUSED)</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: AI Interviewer */}
        <div className="md:w-2/5 p-4 md:p-6 bg-white flex flex-col border-l border-gray-200 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900 leading-tight">AI Interviewer</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
              ></div>
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {currentQuestion?.question || "Tell me about yourself."}
              </h2>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getQuestionTypeBadgeColor(currentQuestion?.type || 'behavioral')}`}>
                  {currentQuestion?.type || 'Behavioral'}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getDifficultyBadgeColor(currentQuestion?.difficulty || 'beginner')}`}>
                  {currentQuestion?.difficulty || 'Beginner'}
                </span>
              </div>
              
              <p className="text-sm text-gray-500 pt-6 flex items-center mt-auto">
                <AlertCircle className="w-4 h-4 mr-1.5 text-indigo-500" />
                Take your time to think before answering.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="h-24 bg-white border-t border-gray-200 p-4 shrink-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between h-full">
          
          <div className="w-1/3 flex justify-start">
            {!isRecording ? (
              <div className="flex flex-col items-center">
                <button 
                  onClick={startRecording}
                  disabled={!!cameraError}
                  className="w-12 h-12 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mic className="w-6 h-6" />
                </button>
                <span className="text-xs font-medium text-gray-600 mt-1">Record</span>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <button 
                    onClick={isPaused ? resumeRecording : pauseRecording}
                    className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 flex items-center justify-center transition-colors"
                  >
                    {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </button>
                  <span className="text-xs font-medium text-gray-600 mt-1">{isPaused ? 'Resume' : 'Pause'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <button 
                    onClick={stopRecording}
                    className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Square className="w-5 h-5 fill-current" />
                  </button>
                  <span className="text-xs font-medium text-gray-600 mt-1">Stop</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="w-1/3 flex justify-center">
            {/* Optional indicator center area */}
            {isRecording && !isPaused && (
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="font-semibold text-sm">Recording...</span>
              </div>
            )}
          </div>
          
          <div className="w-1/3 flex justify-end">
            <div className="flex flex-col items-center">
              <button 
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center transition-colors shadow-sm font-medium"
              >
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Interview'}
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* End Interview Modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">End Interview?</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to end this interview? You have answered {currentQuestionIndex} of {totalQuestions} questions.
              </p>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEndModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={finishInterview}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  End Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
