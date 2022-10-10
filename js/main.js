import '../js/active-state.js';
import '../js/inactive-state.js';
import { adListFragment } from '../js/popup.js';

const canvas = document.querySelector('#map-canvas');
canvas.append(adListFragment.firstChild);
