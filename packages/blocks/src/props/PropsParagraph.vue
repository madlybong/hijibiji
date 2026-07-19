<script setup lang="ts">
import Message from 'primevue/message';
</script>

<template>
  <div class="flex flex-col gap-4">
    <Message severity="info" :closable="false" class="text-xs">
      This block is edited inline on the canvas. Click the text on the page to start typing.
    </Message>
  </div>
</template>
