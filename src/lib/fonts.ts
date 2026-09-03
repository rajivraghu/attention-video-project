import {loadFont as loadAmatic} from '@remotion/google-fonts/AmaticSC';
import {loadFont as loadPatrick} from '@remotion/google-fonts/PatrickHand';
import {loadFont as loadCaveat} from '@remotion/google-fonts/Caveat';

const amatic = loadAmatic('normal', {weights: ['700'], subsets: ['latin']});
const patrick = loadPatrick('normal', {weights: ['400'], subsets: ['latin']});
const caveat = loadCaveat('normal', {weights: ['700'], subsets: ['latin']});

export const FONTS = {
  header: amatic.fontFamily, // Amatic SC Bold — tall condensed ALL-CAPS headers
  body: patrick.fontFamily, // Patrick Hand — body text
  label: caveat.fontFamily, // Caveat Bold — labels & scores
};

/** approximate average glyph width (em) used to size the writing clip-mask */
export const FONT_ADVANCE: Record<keyof typeof FONTS, number> = {
  header: 0.42,
  body: 0.5,
  label: 0.48,
};
