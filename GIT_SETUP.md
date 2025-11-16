# Подготовка проекта для Git

## Быстрый старт

### 1. Инициализация Git (если еще не инициализирован)

```bash
git init
```

### 2. Проверка .gitignore

Убедитесь, что `.gitignore` содержит:
- `.env`
- `node_modules/`
- `.next/`
- Другие файлы, которые не должны попасть в репозиторий

**Текущий .gitignore уже настроен правильно ✅**

### 3. Добавление всех файлов

```bash
# Проверить статус (что будет добавлено)
git status

# Добавить все файлы (кроме тех, что в .gitignore)
git add .

# Проверить, что добавилось (должны быть только нужные файлы, БЕЗ .env)
git status
```

### 4. Создание первого коммита

```bash
git commit -m "Initial commit: REEMS CMS with admin panel"
```

### 5. Создание репозитория на GitHub/GitLab

**GitHub:**
1. Зайдите на [github.com](https://github.com)
2. Нажмите "New repository"
3. Название: `reems-cms` (или другое)
4. **НЕ** добавляйте README, .gitignore или license (у нас уже есть)
5. Нажмите "Create repository"

**GitLab:**
1. Зайдите на [gitlab.com](https://gitlab.com)
2. Нажмите "New project" → "Create blank project"
3. Заполните название
4. Нажмите "Create project"

### 6. Подключение удаленного репозитория

После создания репозитория на GitHub/GitLab, скопируйте URL и выполните:

```bash
# Замените <your-repo-url> на URL вашего репозитория
git remote add origin <your-repo-url>

# Пример для GitHub:
# git remote add origin https://github.com/yourusername/reems-cms.git

# Или для GitLab:
# git remote add origin https://gitlab.com/yourusername/reems-cms.git

# Проверить, что remote добавлен
git remote -v
```

### 7. Пуш в удаленный репозиторий

```bash
# Переименовать ветку в main (если нужно)
git branch -M main

# Отправить код в удаленный репозиторий
git push -u origin main
```

---

## Проверка перед коммитом

### ✅ Что ДОЛЖНО быть в репозитории:

- ✅ Все файлы приложения (`app/`, `lib/`, `prisma/`)
- ✅ Конфигурационные файлы (`package.json`, `tsconfig.json`, `next.config.js`)
- ✅ `README.md`, документация
- ✅ `.gitignore`

### ❌ Что НЕ должно быть в репозитории:

- ❌ `.env` файлы (должны быть в .gitignore)
- ❌ `node_modules/` (должны быть в .gitignore)
- ❌ `.next/` (должны быть в .gitignore)
- ❌ Личные ключи, пароли, секреты

### Проверка перед коммитом:

```bash
# Проверить, что .env не попал в репозиторий
git status | grep .env

# Должно быть пусто (ничего не выведет)
# Если что-то вывело - проверьте .gitignore

# Проверить, что node_modules не попал
git status | grep node_modules

# Должно быть пусто
```

---

## Команды Git для работы с проектом

### Обычный рабочий процесс:

```bash
# Проверить статус изменений
git status

# Посмотреть изменения
git diff

# Добавить конкретный файл
git add <filename>

# Или добавить все изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить изменения на сервер
git push

# Получить изменения с сервера
git pull
```

---

## Если .env случайно попал в коммит

Если вы случайно закоммитили `.env` файл:

```bash
# Удалить файл из индекса Git (но оставить локально)
git rm --cached .env

# Добавить .env в .gitignore (если еще не добавлен)
echo ".env" >> .gitignore

# Закоммитить удаление
git add .gitignore
git commit -m "Remove .env from repository"

# Отправить изменения
git push
```

**Важно:** После этого измените все секреты (JWT_SECRET, пароли и т.д.), так как они могли попасть в историю Git.

---

## Готово к деплою на Railway!

После успешного пуша в Git репозиторий:

1. ✅ Проект готов для подключения к Railway
2. ✅ Railway сможет клонировать репозиторий
3. ✅ Можно переходить к настройке переменных окружения

**Следующие шаги:**
- См. [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) - Чек-лист деплоя
- См. [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Инструкция по деплою

