<template>
  <div id="app">
    <header class="site-header">
      <div class="container">
        <h1 class="logo">AI chest CT</h1>
        <nav>
          <router-link to="/">Главная</router-link>
          <router-link to="/model">Модель</router-link>
        </nav>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="site-footer">
      <div class="container">
        <small>© 2025 ДЖУНгарики</small>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* header/footer минимальные стили — остальное в styles.css */
.site-header {
  background: linear-gradient(90deg,#0f172a,#0b1220);
  color: white;
  padding: 18px 0;
}
.site-header .container { display:flex; align-items:center; justify-content:space-between; gap:16px; }
.logo { font-weight:700; letter-spacing:0.4px; }
.site-header nav a { color: rgba(255,255,255,0.9); margin-left:14px; text-decoration:none; }
.site-footer { padding:18px 0; text-align:center; color:#666; background:#f8fafc; margin-top:48px;}
</style>

