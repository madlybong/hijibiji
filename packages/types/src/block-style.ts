// ============================================================
//  BLOCK STYLE — flat object that maps to CSS custom properties
//  All fields are optional. GmBlockWrapper converts these to
//  --block-* CSS variables so block components can read them.
// ============================================================
export interface BlockStyle {
  color?: string;               // → --block-color
  backgroundColor?: string;     // → --block-bg-color
  padding?: string;             // → --block-padding (applied directly)
  margin?: string;              // → --block-margin  (applied directly)
  fontSize?: string;            // → --block-font-size
  fontWeight?: string;          // → --block-font-weight
  fontFamily?: string;          // → --block-font-family
  textAlign?: 'left' | 'center' | 'right' | 'justify'; // → --block-text-align
  fontStyle?: 'normal' | 'italic';                     // → --block-font-style
  textDecoration?: 'none' | 'underline' | 'line-through'; // → --block-text-decoration
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase'; // → --block-text-transform
  lineHeight?: string;          // → --block-line-height
  borderRadius?: string;        // → --block-border-radius
  opacity?: string;             // → --block-opacity
  width?: string;               // → --block-width
  height?: string;              // → --block-height
  minHeight?: string;           // → --block-min-height
  border?: string;              // → --block-border
  borderColor?: string;         // → --block-border-color
  borderWidth?: string;         // → --block-border-width
  borderStyle?: string;         // → --block-border-style
  boxShadow?: string;           // → --block-box-shadow
  overflow?: string;            // → --block-overflow
}
