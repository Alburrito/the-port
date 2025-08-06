/**
 * Generates a random index from an array, ensuring it's different from the current index
 * @param {Array} array - The array to get a random index from
 * @param {number|null} currentIndex - The current index to avoid (optional)
 * @returns {number} A random index different from currentIndex
 */
export function getRandomDifferentIndex(array, currentIndex = null) {
  if (array.length === 0) {
    throw new Error("Array cannot be empty");
  }

  if (array.length === 1) return 0;
  
  if (currentIndex === null || currentIndex === undefined) {
    return Math.floor(Math.random() * array.length);
  }
  
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * array.length);
  } while (newIndex === currentIndex);
  
  return newIndex;
}
