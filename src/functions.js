// Calculating colour contrast values.
// https://stackoverflow.com/a/9733420/4073160

// https://webaim.org/resources/contrastchecker/
// All of these values are ratios to 1 (e.g. AA_NORMAL = 4.5:1).
const SAFE_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5,
  GRAPHICS: 3,
};
const CONTRAST_PRECISION = 2; // how many decimal places to display.

function luminance(r, g, b) {
  const RED = 0.2126;
  const GREEN = 0.7152;
  const BLUE = 0.0722;
  const GAMMA = 2.4;

  let a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });

  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast(rgb1, rgb2) {
  let lum1 = luminance(...rgb1);
  let lum2 = luminance(...rgb2);
  let brightest = Math.max(lum1, lum2);
  let darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Converts a hex colour to RGB values.
 * The hex colour can be either three or six characters long.
 *
 * @param string hexCode
 * @returns an array with three properties, corresponding to RGB values.
 */
function hexToRGB(hexCode) {
  if (hexCode.length >= 6) {
    return [
      hexCode.slice(-6, -4),
      hexCode.slice(-4, -2),
      hexCode.slice(-2),
    ].map((v) => parseInt(`0x${v}`));
  } else if (hexCode.length >= 3) {
    return [
      hexCode.slice(-3, -2),
      hexCode.slice(-2, -1),
      hexCode.slice(-1),
    ].map((v) => parseInt(`0x${v + v}`));
  }

  return [0, 0, 0];
}

/**
 * Returns the contrast ratio between two [hex] colours.
 *
 * @param string bgColour
 * @param string fgColour
 * @returns number
 */
export function contrastValue(bgColour, fgColour) {
  const bg = hexToRGB(bgColour);
  const fg = hexToRGB(fgColour);
  return contrast(bg, fg).toFixed(CONTRAST_PRECISION);
}

/**
 * Returns TRUE if the provided colours are considered "unsafe" based on the selected ratio mode.
 *
 * @param {string} bgColour
 * @param {string} fgColour
 * @returns {boolean}
 */
export function isUnsafeRatio(mode, bgColour, fgColour) {
  if (mode !== "") {
    return contrastValue(bgColour, fgColour) < SAFE_RATIOS[mode];
  }
  return false;
}
