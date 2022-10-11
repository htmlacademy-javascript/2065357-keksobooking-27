import { switchToActiveState } from '../js/user-form.js';
import { adListFragment } from '../js/popup.js';

switchToActiveState();
const canvas = document.querySelector('#map-canvas');
canvas.append(adListFragment.firstChild);
