type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string,
      config?: GtagEventParams | Date
    ) => void;
  }
}

/**
 * Track a custom event in Google Analytics 4.
 * Safe to call even if gtag is not loaded (e.g. ad blockers, dev).
 */
export function trackEvent(eventName: string, params?: GtagEventParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', eventName, params);
}

// ─── Conversion events ─────────────────────────────────────────

export function trackQuizStart(episodeNumber: number, quizTitle: string) {
  trackEvent('quiz_start', {
    episode_number: episodeNumber,
    quiz_title: quizTitle,
  });
}

export function trackQuizComplete(
  episodeNumber: number,
  quizTitle: string,
  resultType: string
) {
  trackEvent('quiz_complete', {
    episode_number: episodeNumber,
    quiz_title: quizTitle,
    result_type: resultType,
  });
}

export function trackNewsletterSignup(location: string) {
  trackEvent('newsletter_signup', { signup_location: location });
}

export function trackBookClick(location: string) {
  trackEvent('book_click', { click_location: location });
}

export function trackBookingClick(bookingType: 'podcast_guest' | '1on1', location: string) {
  trackEvent('booking_click', {
    booking_type: bookingType,
    click_location: location,
  });
}

// ─── Engagement events ─────────────────────────────────────────

export function trackPodcastPlatformClick(
  platform: 'spotify' | 'apple' | 'amazon' | 'youtube',
  location: string
) {
  trackEvent('podcast_platform_click', {
    platform,
    click_location: location,
  });
}

export function trackEpisodePlay(episodeNumber: number, episodeTitle: string) {
  trackEvent('episode_play', {
    episode_number: episodeNumber,
    episode_title: episodeTitle,
  });
}

export function trackTranscriptExpand(episodeNumber: number) {
  trackEvent('transcript_expand', { episode_number: episodeNumber });
}

export function trackSocialClick(
  platform: 'instagram' | 'tiktok' | 'linkedin' | 'youtube',
  location: string
) {
  trackEvent('social_click', { platform, click_location: location });
}

export function trackBlogTopicFilter(topic: string) {
  trackEvent('blog_topic_filter', { topic });
}

export function trackGuestLinkClick(guestName: string, linkType: string) {
  trackEvent('guest_link_click', {
    guest_name: guestName,
    link_type: linkType,
  });
}
