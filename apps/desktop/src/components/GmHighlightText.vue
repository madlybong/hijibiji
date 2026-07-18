<template>
  <span :style="{
    fontWeight:  'var(--block-font-weight, 600)',
    color:       'var(--block-color, var(--color-gm-accent))',
    fontFamily:  'var(--block-font-family, var(--font-inter))',
    fontSize:    'var(--block-font-size, inherit)',
  }">
    <slot></slot>
  </span>
</template>