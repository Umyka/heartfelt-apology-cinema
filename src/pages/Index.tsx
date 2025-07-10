import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSection, setCurrentSection] = useState('apology'); // 'apology', 'couple', 'letter'
  const [isPlaying, setIsPlaying] = useState(false);

  // Replace these with your actual image URLs from Cloudinary
  const apologyPhotos = [
    'https://via.placeholder.com/800x600/FFB6C1/FFFFFF?text=Sorry+Photo+1',
    'https://via.placeholder.com/800x600/FFC0CB/FFFFFF?text=Sorry+Photo+2',
    'https://via.placeholder.com/800x600/FFCCCB/FFFFFF?text=Sorry+Photo+3',
    'https://via.placeholder.com/800x600/FFE4E1/FFFFFF?text=Sorry+Photo+4',
    'https://via.placeholder.com/800x600/FFF0F5/FFFFFF?text=Sorry+Photo+5'
  ];

  const couplePhotos = [
    'https://via.placeholder.com/800x600/FFB6C1/FFFFFF?text=Us+Photo+1',
    'https://via.placeholder.com/800x600/FFC0CB/FFFFFF?text=Us+Photo+2',
    'https://via.placeholder.com/800x600/FFCCCB/FFFFFF?text=Us+Photo+3',
    'https://via.placeholder.com/800x600/FFE4E1/FFFFFF?text=Us+Photo+4',
    'https://via.placeholder.com/800x600/FFF0F5/FFFFFF?text=Us+Photo+5'
  ];

  // Supabase configuration with validation
  const supabaseUrl = 'YOUR_SUPABASE_URL';
  const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
  
  // Only create Supabase client if credentials are configured
  const supabase = (supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseKey !== 'YOUR_SUPABASE_ANON_KEY') 
    ? createClient(supabaseUrl, supabaseKey) 
    : null;

  // Track visit on page load
  useEffect(() => {
    const trackVisit = async () => {
      // Only track if Supabase is configured
      if (!supabase) {
        console.log('Supabase not configured - visit tracking disabled');
        return;
      }

      try {
        const { error } = await supabase
          .from('visits')
          .insert([
            {
              timestamp: new Date().toISOString(),
              page: 'sorry-website',
              user_agent: navigator.userAgent,
              referrer: document.referrer || 'direct',
              screen_resolution: `${window.screen.width}x${window.screen.height}`,
              viewport_size: `${window.innerWidth}x${window.innerHeight}`
            }
          ]);
        
        if (error) {
          console.error('Error tracking visit:', error);
        } else {
          console.log('Visit tracked successfully');
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, [supabase]);

  // Slideshow timing logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSection === 'apology') {
        if (currentSlide < apologyPhotos.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          // Transition to couple photos after apology photos
          setCurrentSection('couple');
          setCurrentSlide(0);
        }
      } else if (currentSection === 'couple') {
        if (currentSlide < couplePhotos.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          // Transition to letter section
          setCurrentSection('letter');
        }
      }
    }, 4000); // 4 seconds per slide

    return () => clearInterval(timer);
  }, [currentSlide, currentSection, apologyPhotos.length, couplePhotos.length]);

  // Handle music playback
  useEffect(() => {
    const playMusic = () => {
      setIsPlaying(true);
    };

    // Auto-play music on user interaction (due to browser policies)
    const handleFirstInteraction = () => {
      playMusic();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const currentPhotos = currentSection === 'apology' ? apologyPhotos : couplePhotos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden relative">
      {/* Falling Petals Animation */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-pink-300 rounded-full shadow-sm"></div>
          </div>
        ))}
      </div>

      {/* Audio Elements */}
      {isPlaying && (
        <>
          {currentSection === 'apology' && (
            <audio autoPlay loop className="hidden">
              {/* Replace with your Hindi apology song URL */}
              <source src="YOUR_HINDI_APOLOGY_SONG_URL.mp3" type="audio/mpeg" />
            </audio>
          )}
          {(currentSection === 'couple' || currentSection === 'letter') && (
            <audio autoPlay loop className="hidden">
              {/* Replace with his favorite romantic song URL */}
              <source src="YOUR_ROMANTIC_SONG_URL.mp3" type="audio/mpeg" />
            </audio>
          )}
        </>
      )}

      {/* Main Content */}
      <div className="relative z-20">
        {/* Slideshow Section */}
        {currentSection !== 'letter' && (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative">
                <img
                  src={currentPhotos[currentSlide]}
                  alt={currentSection === 'apology' ? `Apology ${currentSlide + 1}` : `Us together ${currentSlide + 1}`}
                  className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl animate-fade-in"
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-3xl flex items-end justify-center p-8">
                  <div className="text-white text-center">
                    {currentSection === 'apology' ? (
                      <h1 className="text-2xl md:text-4xl font-serif mb-4 animate-fade-in">
                        मुझे माफ़ कर दो... 💔
                      </h1>
                    ) : (
                      <h1 className="text-2xl md:text-4xl font-serif mb-4 animate-fade-in">
                        हमारी यादें... ❤️
                      </h1>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {currentPhotos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-pink-500 scale-125' 
                        : 'bg-pink-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Letter Section */}
        {currentSection === 'letter' && (
          <div className="min-h-screen flex items-center justify-center p-4 py-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-amber-200 relative animate-scale-in">
                {/* Letter Decoration */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full shadow-lg"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-500 rounded-full shadow-lg"></div>
                
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-serif text-amber-800 mb-4">
                    मेरा प्यारा...
                  </h2>
                  <div className="w-24 h-0.5 bg-amber-400 mx-auto"></div>
                </div>

                <div className="space-y-6 text-amber-900 leading-relaxed">
                  <p className="text-lg font-serif">
                    My Dearest Love,
                  </p>
                  
                  <p className="text-base md:text-lg">
                    I know I've hurt you, and I can't express how sorry I am. Every moment without your smile feels like an eternity. You mean the world to me, and I never want to be the reason for your pain.
                  </p>
                  
                  <p className="text-base md:text-lg">
                    I created this little space on the internet because words spoken sometimes get lost, but written words... they stay forever, just like my love for you. I hope when you see these photos of us, you remember all the beautiful moments we've shared.
                  </p>
                  
                  <p className="text-base md:text-lg">
                    Please forgive me. Let's create more beautiful memories together. I promise to be better, to love you more gently, and to never take your precious heart for granted.
                  </p>
                  
                  <div className="text-center mt-8">
                    <p className="text-xl font-serif text-pink-600">
                      Forever yours,
                    </p>
                    <p className="text-2xl font-serif text-pink-700 mt-2">
                      ❤️ Your Love ❤️
                    </p>
                  </div>
                </div>

                {/* Heart decorations */}
                <div className="absolute bottom-4 right-4 text-2xl animate-pulse">💕</div>
                <div className="absolute top-4 left-4 text-2xl animate-pulse">💖</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Music Control */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Click anywhere to start message */}
      {!isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-8 rounded-2xl text-center max-w-sm mx-4 animate-scale-in">
            <h3 className="text-xl font-serif text-pink-600 mb-4">🎵 Welcome My Love 🎵</h3>
            <p className="text-gray-600 mb-4">Click anywhere to start our journey together</p>
            <div className="text-2xl">💕</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
