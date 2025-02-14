import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if running in iframe
    const isInIframe = window !== window.parent;
    
    if (isInIframe) {
      // Notify parent window to scroll
      window.parent.postMessage({
        type: 'SCROLL_TO_TOP',
        path: pathname
      }, '*');
      
      // Scroll the iframe content
      window.scrollTo(0, 0);
    } else {
      // Normal scroll behavior when not in iframe
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;