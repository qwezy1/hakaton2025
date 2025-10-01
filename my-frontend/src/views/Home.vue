<template>
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-left">
        <h2>ИИ-сервис для анализа КТ грудной клетки</h2>
        <p class="lead">
          Автоматическая классификация исследований на «норму / ненорму». Быстро, безопасно и
          подготовлено для интеграции в медицинские рабочие процессы.
        </p>

        <div class="metrics">
          <div class="metric">
            <div class="big">>95%</div>
            <div class="small">Точность (примерно)</div>
          </div>
          <div class="metric">
            <div class="big">~1–3 с</div>
            <div class="small">Время инференса / исследование</div>
          </div>
          <div class="metric">
            <div class="big">.xlsx</div>
            <div class="small">Выход — таблица с результатами</div>
          </div>
        </div>

        <div class="actions">
          <router-link class="btn primary" to="/model">Начать</router-link>
        </div>
      </div>

      <div class="hero-right">
        <!-- карточка модели -->
        <div class="card">
          <h3>Описание модели</h3>
          <p>Модель обучена выявлять исследования с признаками патологии/без патологии по DICOM-срезам.</p>
          <ul>
            <li>Вход: ZIP с DICOM файлами исследования</li>
            <li>Выход: классификация, вероятность, (опционально) маски</li>
            <li>Результат: Excel файл + JSON</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const scrollDocs = () => {
  const el = document.getElementById('docs')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.container { max-width:1100px; margin:0 auto; padding:28px; }
.hero { padding:48px 0; background: linear-gradient(180deg,#e6f0ff, #ffffff); }
.hero-grid { display:grid; grid-template-columns:1fr 420px; gap:28px; align-items:start; }
.hero-left h2 { font-size:32px; margin-bottom:10px; }
.lead { color:#334155; margin-bottom:18px; }
.metrics { display:flex; gap:12px; margin:20px 0; }
.metric { background:white; padding:12px 14px; border-radius:10px; box-shadow:0 4px 14px rgba(16,24,40,0.06); text-align:center; min-width:120px; }
.metric .big { font-size:18px; font-weight:700; }
.metric .small { font-size:12px; color:#64748b; }
.actions { display:flex; gap:12px; margin-top:12px; }
.btn { padding:10px 16px; border-radius:8px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
.primary { background:#0f172a; color:white; }
.ghost { border:1px solid rgba(15,23,42,0.08); background:white; color:#0f172a; }
.hero-right .card { background:white; padding:18px; border-radius:12px; box-shadow:0 10px 30px rgba(2,6,23,0.04); }
.small-muted { color:#64748b; font-size:12px; margin-top:8px; }
.docs { margin-top:34px; background:#fff; padding:18px; border-radius:10px; box-shadow:0 6px 18px rgba(2,6,23,0.04); }
</style>
