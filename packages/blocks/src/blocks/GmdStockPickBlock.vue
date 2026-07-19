<script setup lang="ts">
const props = defineProps<{
  label?: string;       // NEW: replaces hardcoded "Stock Pick · April 2026"
  stockName: string;
  stockDesc: string;
  cmp: string;
  target: string;
  addOnDip: string;
  exit: string;
  upside: string;
  upsideTime: string;
}>();
</script>

<template>
  <div :style="{
    backgroundColor: 'var(--block-bg-color, var(--color-gm-accent))',
    padding:         '0.625rem 1rem',
    display:         'flex',
    justifyContent:  'space-between',
    alignItems:      'center',
    color:           '#FFFFFF',
  }">
    <div :style="{ display: 'flex', flexDirection: 'column' }">
      <div :style="{
        fontFamily:    'var(--block-font-family, var(--font-montserrat))',
        fontSize:      '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color:         'var(--color-gm-border-dark)',
        marginBottom:  '0.375rem',
      }">{{ label || 'Stock Pick' }}</div>
      <div :style="{
        fontFamily:   'var(--block-font-family, var(--font-montserrat))',
        fontSize:     'var(--block-font-size, 1.5rem)',
        fontWeight:   '800',
        marginBottom: '0.5rem',
      }">{{ stockName }}</div>
      <div :style="{ fontSize: '9px', color: 'var(--color-gm-border-dark)', marginBottom: '0.625rem' }">{{ stockDesc }}</div>
      <div :style="{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }">
        <span v-for="pill in [
          { text: 'BUY', color: 'var(--color-gm-bullish)' },
          { text: `CMP ${cmp}`, color: 'var(--color-gm-text-muted)' },
          { text: `TARGET ${target}`, color: 'var(--color-gm-primary)' },
          { text: `ADD-ON DIP ${addOnDip}`, color: 'var(--color-gm-text-muted)' },
          { text: `EXIT BEAR CASE ${exit}`, color: 'var(--color-gm-text-muted)' },
        ]" :key="pill.text" :style="{
          border:        `1px solid ${pill.color}`,
          color:         pill.color,
          padding:       '0.125rem 0.5rem',
          fontSize:      '9px',
          fontWeight:    '600',
          textTransform: 'uppercase',
        }">{{ pill.text }}</span>
      </div>
    </div>
    <div :style="{ textAlign: 'right' }">
      <div :style="{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-gm-border-dark)', marginBottom: '0.125rem' }">Potential Upside</div>
      <div :style="{
        fontFamily:  'var(--block-font-family, var(--font-montserrat))',
        fontSize:    '2rem',
        fontWeight:  '800',
        color:       'var(--color-gm-bullish)',
        lineHeight:  '1',
        marginBottom:'0.125rem',
      }">{{ upside }}</div>
      <div :style="{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-gm-border-dark)' }">{{ upsideTime }}</div>
    </div>
  </div>
</template>