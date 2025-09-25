#  ИИ веб-приложение для определения заболеваний

Этот проект представляет собой fullstack-приложение с **Frontend на Vue (Vite)**, **Backend на NestJS** и **PostgreSQL** в качестве базы данных.  
Весь проект упакован в Docker для удобного запуска и изоляции окружения.

---

##  Используемые технологии

- **Frontend**: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)  
- **Backend**: [NestJS](https://nestjs.com/) (Node.js framework)  
- **Database**: [PostgreSQL 15](https://www.postgresql.org/)  
- **Web server (frontend)**: [Nginx](https://nginx.org/)  
- **Containerization**: [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)  

---

##  Структура проекта

project-root/
│
├── frontend/ # Vue (Vite)
│ ├── Dockerfile
│ ├── nginx.conf
│ ├── package.json
│ └── src/...
│
├── backend/ # NestJS
│ ├── Dockerfile
│ ├── package.json
│ └── src/...
│
├── docker-compose.yml # Оркестрация
└── README.md # Документация


---

##  Как запустить

### 1. Установи Docker и Docker Compose
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac)  
- [Docker Engine + Compose](https://docs.docker.com/engine/install/) (Linux)  

Проверь установку:
```bash
docker -v
docker compose version
```


2. Запуск контейнеров

```
docker compose up --build
```
## На 9000 порту сидит graylog
### Пароль и ник для захода admin admin

## Доступ к сервисам

Frontend (Vue + Nginx) → http://localhost:8080