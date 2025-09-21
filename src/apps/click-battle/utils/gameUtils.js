/**
 * Game performance and utility functions
 */

/**
 * Calculates performance message based on clicks per second
 * @param {number} clicks - Total number of clicks
 * @param {number} duration - Game duration in seconds
 * @returns {Object} - Object with performance title, message and color
 */
export const getPerformanceMessage = (clicks, duration) => {
  const clicksPerSecond = clicks / duration;
  
  if (clicksPerSecond >= 10) {
    return {
      title: "🚀 ¡INCREÍBLE!",
      message: "Eres una bestia clickeando",
      color: "green.300",
    };
  } else if (clicksPerSecond >= 8) {
    return {
      title: "⚡ ¡EXCELENTE!",
      message: "Tienes dedos de Flash",
      color: "blue.300",
    };
  } else if (clicksPerSecond >= 6) {
    return {
      title: "🔥 ¡MUY BIEN!",
      message: "No está nada mal...",
      color: "orange.300",
    };
  } else if (clicksPerSecond >= 4) {
    return {
      title: "😐 Bastante lento",
      message: "Pichí pichá pero bueno...",
      color: "yellow.300",
    };
  } else if (clicksPerSecond >= 2) {
    return {
      title: "😅 Lamentable",
      message: "¿Tienes artritis o qué?",
      color: "gray.300",
    };
  } else {
    return {
      title: "🐌 ¡FATAL!",
      message: "¿Le estás dando a la pantalla?",
      color: "red.300",
    };
  }
};

/**
 * Formats clicks per second with one decimal place
 * @param {number} clicks - Total number of clicks
 * @param {number} duration - Game duration in seconds
 * @returns {string} - Formatted CPS with one decimal place
 */
export const formatCPS = (clicks, duration) => {
  return (clicks / duration).toFixed(1);
};
