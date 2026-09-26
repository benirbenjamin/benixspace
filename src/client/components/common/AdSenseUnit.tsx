import React, { useEffect, useRef, useState } from 'react';
import { ADSENSE_CONFIG } from '../../config/adsense';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdSenseUnitProps {
  slot?: string;
  clientId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'autorelaxed';
  responsive?: boolean;
  layoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slot = ADSENSE_CONFIG.DEFAULT_SLOT_ID,
  clientId = ADSENSE_CONFIG.CLIENT_ID,
  format = 'auto',
  responsive = true,
  layoutKey,
  className = '',
  style = {},
}) => {
  const insRef = useRef<HTMLModElement | null>(null);
  const [isAdVisible, setIsAdVisible] = useState(false);

  useEffect(() => {
    const insNode = insRef.current;
    if (!insNode) return;

    // MutationObserver to detect when AdSense populates the ins tag
    const observer = new MutationObserver(() => {
      const status = insNode.getAttribute('data-ad-status');
      const hasHeight = insNode.offsetHeight > 0 || insNode.childElementCount > 0;

      if (status === 'filled' || (status !== 'unfilled' && hasHeight)) {
        setIsAdVisible(true);
      } else if (status === 'unfilled') {
        setIsAdVisible(false);
      }
    });

    observer.observe(insNode, {
      attributes: true,
      attributeFilter: ['data-ad-status', 'style', 'class'],
      childList: true,
      subtree: true,
    });

    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Silently catch ad-blocker or duplicate push errors without exposing errors
      setIsAdVisible(false);
    }

    return () => {
      observer.disconnect();
    };
  }, [slot, clientId]);

  return (
    <div
      className={`adsense-wrapper transition-all duration-300 ${className}`}
      style={{
        display: isAdVisible ? 'block' : 'none',
        overflow: 'hidden',
      }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style,
        }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      />
    </div>
  );
};
