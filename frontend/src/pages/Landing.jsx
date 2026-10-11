import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Menu, 
  X, 
  Camera, 
  Bot, 
  FileText, 
  MessageSquare, 
  Mic, 
  Eye, 
  Target,
  Settings,
  Video,
  BarChart3,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold tracking-tight text-slate-900">InterviewAI</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollTo('features')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</button>
              <button onClick={() => scrollTo('how-it-works')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How It Works</button>
              <button onClick={() => scrollTo('about')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">About</button>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">Log in</Link>
              <Link to="/register" className="text-sm font-medium bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <button onClick={() => scrollTo('features')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Features</button>
              <button onClick={() => scrollTo('how-it-works')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">How It Works</button>
              <button onClick={() => scrollTo('about')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">About</button>
              <div className="border-t border-slate-100 pt-4 mt-2">
                <Link to="/login" className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Log in</Link>
                <Link to="/register" className="block w-full text-center mt-2 px-3 py-3 text-base font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Practice Smarter. <br className="hidden sm:block" />
                <span className="text-indigo-600">Interview Better.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                AI-powered interview practice with personalized feedback on your answers, communication, voice, and behavioral performance.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                  Start Free Interview
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <button onClick={() => scrollTo('features')} className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-lg text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  Explore Features
                </button>
              </div>
              <div className="mt-10 flex items-center space-x-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-indigo-${i*100} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p>Join 10,000+ candidates</p>
              </div>
            </div>

            {/* Dashboard Mockup Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden transform md:-rotate-2 transition-transform hover:rotate-0 duration-500">
                {/* Header */}
                <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="ml-4 w-1/3 h-4 bg-slate-200 rounded-md"></div>
                </div>
                {/* Body */}
                <div className="p-6 grid grid-cols-12 gap-6 bg-slate-50/50">
                  {/* Video Area */}
                  <div className="col-span-12 md:col-span-8 bg-slate-900 rounded-xl aspect-video relative overflow-hidden shadow-inner flex items-center justify-center group">
                    <Camera className="h-12 w-12 text-slate-700 group-hover:text-slate-500 transition-colors" />
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center space-x-2 text-white/90 text-xs font-medium">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Recording...</span>
                    </div>
                  </div>
                  {/* AI & Score Panel */}
                  <div className="col-span-12 md:col-span-4 space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                      <div className="relative">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                          <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="40" className="text-indigo-600" strokeLinecap="round" />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <span className="text-2xl font-bold text-slate-800">82</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-600">Overall Score</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-indigo-50 rounded-lg shrink-0">
                          <Bot className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-indigo-600 mb-1">AI Interviewer</p>
                          <p className="text-sm text-slate-700 leading-snug">"Can you tell me about a time you had to overcome a significant technical challenge?"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Small Stats */}
                  <div className="col-span-12 grid grid-cols-3 gap-4">
                    {[
                      { title: 'Clarity', val: '88%', w: 'w-[88%]' },
                      { title: 'Pace', val: '92%', w: 'w-[92%]' },
                      { title: 'Relevance', val: '75%', w: 'w-[75%]' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-end mb-2">
                          <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                          <p className="text-sm font-bold text-slate-800">{stat.val}</p>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-indigo-500 rounded-full ${stat.w}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Everything you need to succeed</p>
            <p className="mt-4 text-lg text-slate-600">Comprehensive analysis across multiple dimensions to give you the most accurate feedback.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI-Powered Interviews', desc: 'Experience realistic mock interviews powered by advanced AI that adapts to your skill level and target role.', color: 'text-purple-600', bg: 'bg-purple-100' },
              { icon: FileText, title: 'Answer Analysis', desc: 'Get detailed feedback on answer relevance, structure, vocabulary, and content quality.', color: 'text-blue-600', bg: 'bg-blue-100' },
              { icon: MessageSquare, title: 'Communication Analysis', desc: 'Analyze your communication patterns including clarity, coherence, and professional language use.', color: 'text-indigo-600', bg: 'bg-indigo-100' },
              { icon: Mic, title: 'Vocal Analysis', desc: 'Evaluate speaking pace, voice stability, pauses, and vocal energy for confident delivery.', color: 'text-rose-600', bg: 'bg-rose-100' },
              { icon: Eye, title: 'Behavioral Analysis', desc: 'Review visual behavioral signals including eye contact, posture, and facial engagement indicators.', color: 'text-amber-600', bg: 'bg-amber-100' },
              { icon: Target, title: 'Personalized Feedback', desc: 'Receive actionable improvement plans tailored to your specific strengths and weaknesses.', color: 'text-emerald-600', bg: 'bg-emerald-100' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">How It Works</p>
            <p className="mt-4 text-lg text-slate-600">Four simple steps to transform your interview skills.</p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-200" aria-hidden="true"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {[
                { step: '01', icon: Settings, title: 'Choose Interview', desc: 'Select your interview type, target role, and difficulty level.' },
                { step: '02', icon: Video, title: 'Complete Interview', desc: 'Answer AI-generated questions using your camera and microphone.' },
                { step: '03', icon: BarChart3, title: 'AI Analyzes Performance', desc: 'Our AI evaluates your answers, communication, voice, and behavior.' },
                { step: '04', icon: TrendingUp, title: 'Improve With Feedback', desc: 'Review detailed reports and track your improvement over time.' },
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-sm flex items-center justify-center z-10 mb-6 relative group">
                    <div className="absolute inset-0 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <item.icon className="h-10 w-10 text-indigo-600 relative z-10" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-md">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/50 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/30 mix-blend-multiply blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Ready to ace your next interview?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of candidates who improved their interview skills with AI-powered practice.
          </p>
          <Link to="/register" className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-xl text-indigo-600 bg-white hover:bg-slate-50 hover:scale-105 shadow-xl transition-all">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-slate-900 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Brain className="h-8 w-8 text-indigo-500" />
                <span className="text-xl font-bold tracking-tight text-white">InterviewAI</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Empowering candidates to perform their best through intelligent practice, actionable insights, and realistic simulation.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollTo('features')} className="text-slate-400 hover:text-white text-sm transition-colors">Features</button></li>
                <li><Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">Blog</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">Help Center</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © 2024 InterviewAI. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
