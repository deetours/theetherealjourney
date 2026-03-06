// Centralized, $100k "Cinematic" Easings and Motion Variants
// These constants ensure motion feels like a high-end editorial website rather than a standard web app.

export const premiumEasing = [0.22, 1, 0.36, 1]; // "The HBO easing" - stark entry, extreme deceleration

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInRise = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.2, ease: premiumEasing } 
  }
};

export const lineReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.2, ease: premiumEasing } 
  }
};

export const curtainReveal = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: premiumEasing }
  }
};
