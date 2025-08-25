import { useState, useEffect } from 'react';

/**
 * Device detection hook using User Agent and device capabilities
 * Detects actual device type rather than just screen size
 */
export function useDeviceDetection() {
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const platform = navigator.platform.toLowerCase();
      
      // Check for mobile devices first (most specific)
      const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
                      /mobile/i.test(userAgent) ||
                      ('ontouchstart' in window && screen.width < 768);

      // Check for tablets
      const isTablet = /ipad|android(?!.*mobile)|kindle|silk|playbook|tablet/i.test(userAgent) ||
                      (platform.includes('mac') && 'ontouchstart' in window) || // iPad on iOS 13+
                      (/android/i.test(userAgent) && !/mobile/i.test(userAgent)) ||
                      ('ontouchstart' in window && screen.width >= 768 && screen.width <= 1024);

      // Check device type based on detection results
      if (isMobile && !isTablet) {
        return 'mobile';
      } else if (isTablet) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    };

    // Initial detection
    setDeviceType(detectDevice());

    // Listen for orientation changes (mobile/tablet specific)
    const handleOrientationChange = () => {
      setTimeout(() => {
        setDeviceType(detectDevice());
      }, 100); // Small delay for orientation change to complete
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return deviceType;
}
