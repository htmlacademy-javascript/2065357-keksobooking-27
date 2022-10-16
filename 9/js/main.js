import { switchToActiveState } from '../js/user-form.js';
import { adListFragment } from '../js/popup.js';

const canvas = document.querySelector('#map-canvas');
canvas.append(adListFragment.firstChild);

switchToActiveState();
