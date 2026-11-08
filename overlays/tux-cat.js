// The follow-alert cat: chibi tuxedo with a big white face (picked 2026-11-07, round 3).
// Drawn in viewBox "-20 -20 240 260". Parts with classes (.head, .eyes, .blink, .tail) are animated by follow-alert.css.
(function () {
  const OL = "#1a1018", FUR = "#3a3644", SHADE = "#2a2733", HI = "#5d586b", W = "#fbf8f4";
  const ol = `stroke="${OL}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;

  function eye(cx, side, gradient) {
    return `<ellipse cx="${cx}" cy="102" rx="21" ry="23" fill="url(#${gradient})" stroke="${OL}" stroke-width="3.5"/>
<path d="M${cx - 15} 112 Q ${cx} 128 ${cx + 15} 112" stroke="#fff" stroke-width="2" fill="none" opacity=".55"/>
<circle cx="${cx - 7}" cy="92" r="7.5" fill="#fff"/><circle cx="${cx + 8}" cy="113" r="3.5" fill="#fff"/>
<path d="M${cx + side * 20} 92 l ${side * 9} -5" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>`;
  }

  function sparkle(x, y, s) {
    return `<path d="M${x} ${y - s} Q ${x} ${y} ${x + s} ${y} Q ${x} ${y} ${x} ${y + s} Q ${x} ${y} ${x - s} ${y} Q ${x} ${y} ${x} ${y - s} Z" fill="#fff" opacity=".9"/>`;
  }

  // id keeps the filter and gradient ids unique if more than one cat is on the page.
  function svg(id) {
    const sticker = "sticker-" + id, gradient = "eye-" + id;
    return `<svg viewBox="-20 -20 240 260" aria-hidden="true"><defs>
<filter id="${sticker}" x="-20%" y="-20%" width="140%" height="140%">
<feGaussianBlur in="SourceAlpha" stdDeviation="4.5"/><feComponentTransfer result="d"><feFuncA type="linear" slope="30" intercept="-3"/></feComponentTransfer>
<feFlood flood-color="#fff7ef"/><feComposite in2="d" operator="in" result="o"/>
<feOffset in="o" dy="6" result="s"/><feFlood flood-color="#3b2160" flood-opacity=".7"/><feComposite in2="s" operator="in" result="sh"/>
<feMerge><feMergeNode in="sh"/><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<linearGradient id="${gradient}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c0f1a"/><stop offset=".42" stop-color="#5a2147"/><stop offset=".75" stop-color="#e0609a"/><stop offset="1" stop-color="#f7d27a"/></linearGradient>
</defs>
<g filter="url(#${sticker})">
<g class="tail"><path d="M136 214 C 178 214 198 196 194 158" fill="none" stroke="${OL}" stroke-width="24" stroke-linecap="round"/>
<path d="M136 214 C 178 214 198 196 194 158" fill="none" stroke="${FUR}" stroke-width="13" stroke-linecap="round"/>
<path d="M190 166 C 192 160 192 156 190 152" fill="none" stroke="${HI}" stroke-width="3" stroke-linecap="round"/></g>
<path d="M58 138 C 42 170 40 206 50 226 Q 54 234 66 234 L 134 234 Q 146 234 150 226 C 160 206 158 170 142 138 Z" fill="${FUR}" ${ol}/>
<path d="M142 150 C 154 180 154 210 146 228 L 134 228 C 142 206 142 176 132 150 Z" fill="${SHADE}"/>
<path d="M78 140 C 72 166 80 192 100 198 C 120 192 128 166 122 140 Z" fill="${W}"/>
<path d="M98 200 L 98 232 M70 196 Q 66 214 68 230 M130 196 Q 134 214 132 230" fill="none" ${ol} stroke-width="4"/>
<path d="M66 222 Q 64 236 82 236 Q 97 236 97 222 Q 82 216 66 222 Z" fill="${W}" ${ol} stroke-width="4"/>
<path d="M103 222 Q 103 236 118 236 Q 136 236 134 222 Q 118 216 103 222 Z" fill="${W}" ${ol} stroke-width="4"/>
<g class="head">
<path d="M24 88 L 20 0 Q 22 -10 32 -6 L 94 34 Z" fill="${FUR}" ${ol}/><path d="M34 66 L 31 10 L 78 40 Z" fill="#f4a7c4"/><path d="M31 10 L 34 66 L 46 54 Z" fill="#ffd0e0"/>
<path d="M176 88 L 180 0 Q 178 -10 168 -6 L 106 34 Z" fill="${FUR}" ${ol}/><path d="M166 66 L 169 10 L 122 40 Z" fill="#f4a7c4"/><path d="M169 10 L 166 66 L 154 54 Z" fill="#ffd0e0"/>
<path d="M100 22 C 146 22 176 42 178 86 L 192 104 L 176 106 C 170 134 140 152 100 152 C 60 152 30 134 24 106 L 8 104 L 22 86 C 24 42 54 22 100 22 Z" fill="${FUR}" ${ol}/>
<path d="M28 108 C 40 136 70 148 100 148 C 130 148 160 136 172 108 C 150 130 126 138 100 138 C 74 138 50 130 28 108 Z" fill="${SHADE}"/>
<path d="M100 66 C 90 90 62 98 34 116 C 50 144 78 150 100 150 C 122 150 150 144 166 116 C 138 98 110 90 100 66 Z" fill="${W}"/>
<g class="eyes">${eye(64, -1, gradient)}${eye(136, 1, gradient)}</g>
<g class="blink"><path d="M46 106 Q 64 88 82 106 M118 106 Q 136 88 154 106" fill="none" stroke="${OL}" stroke-width="5.5" stroke-linecap="round"/></g>
<ellipse cx="44" cy="128" rx="11" ry="6.5" fill="#f59ab8" opacity=".85"/><ellipse cx="156" cy="128" rx="11" ry="6.5" fill="#f59ab8" opacity=".85"/>
<path d="M95.5 117 L 104.5 117 L 100 122 Z" fill="${OL}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<path d="M100 122 Q 95 130 88 125 M100 122 Q 105 130 112 125" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
<circle cx="86" cy="34" r="3" fill="#fff" opacity=".85"/><circle cx="97" cy="31" r="2.2" fill="#fff" opacity=".85"/><circle cx="112" cy="33" r="3" fill="#fff" opacity=".85"/>
${sparkle(48, 62, 7)}${sparkle(152, 62, 7)}
<path d="M44 40 Q 54 30 66 28" stroke="${HI}" stroke-width="3" fill="none" stroke-linecap="round"/>
</g></g></svg>`;
  }

  window.TuxCat = { svg };
})();
