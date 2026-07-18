<template>
  <li :style="{
    marginBottom: '0.25rem',
    fontSize:     'var(--block-font-size, 0.875rem)',
    color:        'var(--block-color, var(--color-gm-text-dark))',
    fontFamily:   'var(--block-font-family, var(--font-inter))',
  }">
    <slot></slot>
  </li>
</template>