<template>
  <div
    class="drop"
    :class="{ 'drop-active': isOver }"
    @dragover.prevent="onOver"
    @dragenter.prevent="onOver"
    @dragleave.prevent="onLeave"
    @drop.prevent="onDrop"
  >
    <input ref="input" type="file" accept=".zip" @change="onFile" class="hidden-input" />
    <div class="drop-inner" @click="openPicker">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 3v12" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 7l4-4 4 4" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <p v-if="!file">Перетащите ZIP с DICOM или нажмите, чтобы выбрать</p>
      <p v-else><strong>{{ file.name }}</strong> — {{ formatSize(file.size) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  modelValue: File
})
const emit = defineEmits(['update:modelValue'])
const isOver = ref(false)
const file = ref(props.modelValue ?? null)
const input = ref(null)

function onOver() { isOver.value = true }
function onLeave() { isOver.value = false }

function onDrop(e) {
  isOver.value = false
  const f = e.dataTransfer.files?.[0]
  if (f) selectFile(f)
}

function onFile(e) {
  const f = e.target.files?.[0]
  if (f) selectFile(f)
}

function selectFile(f) {
  file.value = f
  emit('update:modelValue', f)
}

function openPicker() {
  input.value?.click()
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB'
  return (bytes/1024/1024).toFixed(2) + ' MB'
}
</script>

<style scoped>
.drop { border:2px dashed #cbd5e1; border-radius:12px; padding:20px; cursor:pointer; transition:all .15s ease; }
.drop-active { border-color:#0f172a; background:rgba(15,23,42,0.02); }
.drop-inner { display:flex; flex-direction:column; align-items:center; gap:8px; color:#0f172a; }
.hidden-input { display:none; }
.hint { font-size:12px; color:#64748b; }
</style>
