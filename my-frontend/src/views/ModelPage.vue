<template>
  <div class="container">
    <h2>Инференс модели</h2>
    <p class="muted">Загрузите ZIP-архив исследования (DICOM). После обработки вы получите таблицу результатов.</p>

    <FileDrop v-model="file" />

    <div class="controls">
      <button class="btn primary" :disabled="!file || uploading" @click="upload">
        {{ uploading ? `Загружаю… ${progress}%` : 'Запустить модель' }}
      </button>
      <button class="btn" @click="clear" :disabled="uploading">Сброс</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="downloadUrl" class="result-card">
      <h3>Готово — результаты</h3>
      <a :href="downloadUrl" :download="downloadName" class="btn">Скачать .xlsx</a>
    </div>

    <div v-if="resultData && resultData.length" class="result-card">
      <h3>Результаты (просмотр)</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="key in tableKeys" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in resultData" :key="i">
              <td v-for="key in tableKeys" :key="key">{{ row[key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FileDrop from '../components/FileDrop.vue'

const file = ref(null)
const uploading = ref(false)
const progress = ref(0)
const error = ref(null)
const resultData = ref(null)
const downloadUrl = ref(null)
const downloadName = ref('results.xlsx')

function clear() {
  file.value = null
  resultData.value = null
  downloadUrl.value && URL.revokeObjectURL(downloadUrl.value)
  downloadUrl.value = null
  error.value = null
  progress.value = 0
}

const tableKeys = computed(() => {
  if (!resultData.value || !resultData.value.length) return []
  return Object.keys(resultData.value[0])
})

function upload() {
  if (!file.value) return
  uploading.value = true
  error.value = null
  progress.value = 0

  const form = new FormData()
  form.append('file', file.value)

  // XMLHttpRequest для прогресса загрузки и получения blob
  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/api/infer') // <-- поменяй на реальный эндпоинт сервера
  xhr.responseType = 'blob'

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      progress.value = Math.round((e.loaded / e.total) * 100)
    }
  }

  xhr.onload = async () => {
    uploading.value = false
    if (xhr.status >= 200 && xhr.status < 300) {
      const contentType = xhr.getResponseHeader('Content-Type') || ''
      const blob = xhr.response

      try {
        if (contentType.includes('application/json')) {
          // сервер вернул JSON — читаем и отображаем
          const text = await blob.text()
          const json = JSON.parse(text)
          // ожидаем массив объектов
          resultData.value = Array.isArray(json) ? json : (json.results || [json])
        } else if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || contentType.includes('application/octet-stream')) {
          // xlsx или бинарный — создаём ссылку для скачивания
          downloadUrl.value = URL.createObjectURL(blob)
          // можно попытаться взять имя файла из заголовка
          const disp = xhr.getResponseHeader('Content-Disposition') || ''
          const match = disp.match(/filename="?(.+?)"?($|;)/)
          if (match) downloadName.value = match[1]
        } else {
          // другой тип (zip, изображения ...) — предлагаем скачать
          downloadUrl.value = URL.createObjectURL(blob)
          downloadName.value = 'result.bin'
        }
      } catch (e) {
        error.value = 'Не удалось обработать ответ сервера.'
        console.error(e)
      }
    } else {
      error.value = `Ошибка сервера: ${xhr.status}`
      try { console.log(await xhr.response.text()) } catch(e){}
    }
  }

  xhr.onerror = () => {
    uploading.value = false
    error.value = 'Сетевая ошибка при загрузке.'
  }

  xhr.send(form)
}
</script>

<style scoped>
.container { max-width:900px; margin:18px auto; padding:18px; }
.muted { color:#64748b; margin-bottom:10px; }
.controls { margin-top:12px; display:flex; gap:12px; align-items:center; }
.error { color:#b91c1c; margin-top:10px; }
.result-card { margin-top:18px; padding:14px; background:white; border-radius:10px; box-shadow:0 8px 20px rgba(2,6,23,0.04); }
.table-wrap { overflow:auto; max-height:360px; }
table { width:100%; border-collapse:collapse; margin-top:10px; }
th, td { padding:8px 10px; border-bottom:1px solid #eef2f7; text-align:left; font-size:13px; }
</style>
