import * as viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import * as viewportUnitsBuggyfillHacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks.js';
import 'classlist.js';
import 'raf/polyfill'; //requestAnimationFrame polyfill

// Initialize viewportUnitsBuggyfill
viewportUnitsBuggyfill.init({
  // milliseconds to delay between updates of viewport-units
  // caused by orientationchange, pageshow, resize events
  refreshDebounceWait: 250,
  // provide hacks plugin to make the contentHack property work correctly.
  hacks: viewportUnitsBuggyfillHacks,
});

// Also hook viewportUnitsBuggyfill to resize event (if it was initialized)
if (document.getElementById('patched-viewport')) {
  window.addEventListener('resize', viewportUnitsBuggyfill.refresh, true);
}
