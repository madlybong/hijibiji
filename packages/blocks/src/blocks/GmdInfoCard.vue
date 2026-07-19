<script setup lang="ts">
defineProps<{ title: string; }>();
</script>

<template>
  <div :style="{
    border:           '1px solid var(--color-gm-border-light)',
    backgroundColor:  'var(--block-bg-color, transparent)',
    padding:          '0.625rem',
    borderRadius:     'var(--block-border-radius, 0)',
  }">
    <h4 :style="{
      fontFamily:   'var(--block-font-family, var(--font-montserrat))',
      fontSize:     'var(--block-font-size, 0.8125rem)',
      fontWeight:   '700',
      color:        'var(--block-color, var(--color-gm-accent))',
      marginBottom: '0.25rem',
    }">{{ title }}</h4>
    <p :style="{
      fontSize:   '10px',
      color:      'var(--color-gm-text-muted)',
      lineHeight: '1.4',
    }">
      <slot></slot>
    </p>
  </div>
</template>