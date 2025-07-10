
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// This component handles visit tracking
export const VisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      // Supabase configuration with validation
      const supabaseUrl = 'YOUR_SUPABASE_URL';
      const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
      
      // Only proceed if credentials are configured
      if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
        console.log('Supabase credentials not configured - visit tracking disabled');
        return;
      }

      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

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
  }, []);

  return null; // This component doesn't render anything
};
