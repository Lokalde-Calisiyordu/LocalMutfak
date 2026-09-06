import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { EditorView } from '@codemirror/view';

// "LocalMutfak" sıcak mutfak/oyun paletiyle uyumlu özel CodeMirror teması.
export const win98CmTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#241407',
    foreground: '#fff3df',
    caret: '#ffb100',
    selection: 'rgba(255, 177, 0, 0.35)',
    selectionMatch: 'rgba(255, 177, 0, 0.2)',
    lineHighlight: 'rgba(255, 255, 255, 0.05)',
    gutterBackground: '#2c1a0c',
    gutterForeground: '#9c8465',
    gutterBorder: '#3a2412',
    gutterActiveForeground: '#ffb100',
    fontFamily: 'Consolas, "SFMono-Regular", Menlo, Monaco, "Courier New", monospace',
  },
  styles: [
    { tag: t.comment, color: '#a68f6f', fontStyle: 'italic' },
    { tag: [t.string, t.special(t.string)], color: '#ff9d6f' },
    { tag: [t.number, t.bool, t.null], color: '#6fcf5a' },
    { tag: [t.keyword, t.controlKeyword, t.operatorKeyword], color: '#ffb100', fontWeight: 'bold' },
    { tag: t.operator, color: '#ffd98a' },
    { tag: [t.className, t.typeName, t.definition(t.typeName)], color: '#ffcf4d' },
    { tag: t.propertyName, color: '#ffd98a' },
    { tag: t.variableName, color: '#fff3df' },
    { tag: t.tagName, color: '#ff5a36' },
    { tag: t.attributeName, color: '#ff9d6f' },
    { tag: t.angleBracket, color: '#a68f6f' },
    { tag: [t.bracket, t.paren, t.squareBracket], color: '#dcc4a0' },
    { tag: t.function(t.variableName), color: '#ffd98a' },
    { tag: t.meta, color: '#a68f6f' },
    { tag: t.invalid, color: '#ff5c5c' },
  ],
});

// Yazı boyutu, dolgu ve etkileşim vurgularını ayrı bir uzantı olarak ekliyoruz.
// Arkaplan rengi, editörün boş (satırsız) alanlarıyla dolu alanları arasında
// tutarsızlık olmasın diye tüm alt bileşenlere (scroller/content/gutters)
// açıkça ve aynı şekilde veriliyor.
export const win98CmExtras = EditorView.theme({
  '&': { fontSize: '14.5px', backgroundColor: '#241407', height: '100%' },
  '.cm-scroller': { lineHeight: '1.55', backgroundColor: '#241407' },
  '.cm-content': { padding: '10px 6px', caretColor: '#ffb100', backgroundColor: '#241407', minHeight: '100%' },
  '.cm-gutters': { paddingRight: '10px', backgroundColor: '#2c1a0c', minHeight: '100%' },
  '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,0.05)' },
  '.cm-activeLineGutter': { backgroundColor: 'rgba(255,177,0,0.1)' },
  '.cm-matchingBracket': { backgroundColor: 'rgba(255,90,54,0.3)', outline: '1px solid #ff5a36' },
  '.cm-selectionMatch': { backgroundColor: 'rgba(255,177,0,0.18)' },
  // Metin seçimi hem odaklıyken hem odak kaybolduğunda net görünsün diye
  // açıkça, yüksek önceliğe sahip kurallarla belirtiliyor (Ctrl+A dahil).
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: 'rgba(255, 177, 0, 0.35) !important',
  },
  '&:not(.cm-focused) .cm-selectionBackground': {
    backgroundColor: 'rgba(255, 177, 0, 0.25) !important',
  },
  // Emmet abbreviation'ı yazılırken altı çiziliyor (örn. "div.card>ul>li*3")
  '.emmet-tracker': {
    textDecoration: 'underline dotted',
    textUnderlineOffset: '3px',
    textDecorationColor: 'var(--accent, #ffb100)',
  },
  // Tab ile genişletilecek Emmet çıktısının canlı önizlemesi (küçük kod kutusu)
  '.cm-tooltip .emmet-preview': {
    background: '#2c1a0c',
    border: '1px solid #8a5a34',
    borderRadius: '10px',
    boxShadow: '0 4px 0 rgba(0,0,0,0.4), 0 0 12px rgba(255,177,0,0.15)',
    padding: '4px 6px',
    fontFamily: 'Consolas, "SFMono-Regular", Menlo, Monaco, "Courier New", monospace',
    fontSize: '12.5px',
    maxWidth: '360px',
    overflow: 'auto',
  },
  '.cm-tooltip .emmet-preview_error': {
    color: '#ff5c5c',
    border: '1px solid #ff5c5c',
  },
  '.cm-tooltip.cm-tooltip-autocomplete': {
    background: '#2c1a0c',
    border: '1px solid #8a5a34',
    borderRadius: '10px',
    boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
  },
  '.cm-tooltip.cm-tooltip-autocomplete > ul': {
    fontFamily: 'Consolas, "SFMono-Regular", Menlo, Monaco, "Courier New", monospace',
    fontSize: '12.5px',
  },
  '.cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected]': {
    background: 'var(--accent, #ffb100)',
    color: 'var(--text-inverse, #2b1608)',
  },
  // Emmet tamamlamaları için ikon (varsayılan tip haritasında "emmet" karşılığı yok)
  '.cm-completionIcon-emmet:after': {
    content: '"🔥"',
    color: '#ffcf4d',
  },
});
