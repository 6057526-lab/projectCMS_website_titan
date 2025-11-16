# Инструкция по деплою на Railway

## Подготовка проекта

### 1. Коммит проекта в Git

Убедитесь, что проект находится в Git репозитории (GitHub, GitLab или другой):

```bash
# Проверьте статус
git status

# Добавьте все файлы (кроме тех, что в .gitignore)
git add .

# Создайте коммит
git commit -m "Initial commit with CMS admin panel"

# Если репозиторий еще не создан на GitHub/GitLab, создайте его и затем:
git remote add origin <your-repository-url>
git push -u origin main
```

### 2. Важные файлы, которые должны быть в репозитории

- ✅ `package.json` - зависимости и скрипты
- ✅ `prisma/schema.prisma` - схема базы данных
- ✅ `prisma/seed.ts` - seed скрипт
- ✅ Все файлы приложения (`app/`, `lib/`, `middleware.ts`)
- ✅ `next.config.js`, `tsconfig.json`, `tailwind.config.ts`
- ❌ `.env` - **НЕ коммитить!** (уже в .gitignore)

## Деплой на Railway

### Шаг 1: Создайте проект на Railway

1. Зайдите на [railway.app](https://railway.app)
2. Нажмите "New Project"
3. Выберите "Deploy from GitHub repo" (или другой Git провайдер)
4. Выберите ваш репозиторий

### Шаг 2: Создайте PostgreSQL базу данных

1. В Railway проекте нажмите "+ New"
2. Выберите "Database" → "PostgreSQL"
3. Railway автоматически создаст базу и переменную `DATABASE_URL`

### Шаг 3: Настройте переменные окружения

В настройках проекта Railway → "Variables" добавьте следующие переменные:

#### Обязательные переменные:

```env
# База данных (Railway обычно добавляет автоматически при создании PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database?schema=public

# JWT секрет для аутентификации (минимум 32 символа)
# Сгенерируйте случайную строку командой:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=ваш-случайный-секретный-ключ-минимум-32-символа

# Окружение
NODE_ENV=production
```

#### Как получить значения:

**DATABASE_URL:**
- Railway автоматически создает эту переменную при создании PostgreSQL базы
- Нажмите на созданную базу данных → вкладка "Variables"
- Скопируйте значение `DATABASE_URL`

**JWT_SECRET:**
- Сгенерируйте локально:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Или используйте онлайн генератор случайных строк (минимум 32 символа)
- **Важно**: Используйте уникальный, сложный ключ для production!

### Шаг 4: Настройте build команды

Railway автоматически определит Next.js проект, но убедитесь, что в настройках деплоя:

**Build Command:**
```bash
npm run build
```

**Start Command:**
```bash
npm start
```

### Шаг 5: Запустите миграции и seed

После первого деплоя нужно запустить миграции и seed:

1. В Railway откройте ваш сервис (не базу данных)
2. Перейдите во вкладку "Settings" → "Deploy"
3. В разделе "Deploy Hooks" или используйте "Connect" (CLI)

**Или через Railway CLI:**

```bash
# Установите Railway CLI
npm i -g @railway/cli

# Войдите в Railway
railway login

# Подключитесь к проекту
railway link

# Запустите миграции
railway run npx prisma migrate deploy

# Запустите seed (создаст контент и админа)
railway run npm run prisma:seed
```

**Или через один запуск командой в Railway Dashboard:**

1. В настройках сервиса добавьте в "Build Command":
   ```bash
   npm run build && npx prisma migrate deploy && npm run prisma:seed
   ```
   (Это запустит seed при каждом деплое, что может быть нежелательно)

**Рекомендуемый способ - через Deploy Hook или вручную после первого деплоя:**

В Railway можно использовать "Deploy Logs" → "Connect" или выполнить команды вручную через CLI после первого успешного деплоя.

### Шаг 6: Проверьте деплой

1. Railway автоматически предоставит URL вашего приложения
2. Откройте `<your-railway-url>/admin/login`
3. Войдите с учетными данными:
   - Email: `admin@reems.com`
   - Password: `Admin123!`

### Шаг 7: Измените пароль админа (ВАЖНО!)

После первого входа **обязательно** измените пароль администратора через Prisma Studio или напрямую в базе данных:

```bash
# Через Railway CLI
railway run npx prisma studio
```

Или создайте отдельный скрипт для смены пароля.

## Чек-лист переменных окружения для Railway

Убедитесь, что в Railway Dashboard → Variables у вас есть:

- [ ] `DATABASE_URL` - PostgreSQL connection string (автоматически от Railway)
- [ ] `JWT_SECRET` - случайная строка минимум 32 символа
- [ ] `NODE_ENV=production` - окружение (опционально, Railway может установить автоматически)

## Troubleshooting

### Проблема: "JWT_SECRET is not set"
- Проверьте, что переменная `JWT_SECRET` добавлена в Railway Variables
- Убедитесь, что имя переменной написано точно: `JWT_SECRET`

### Проблема: "Database connection failed"
- Проверьте, что PostgreSQL сервис запущен в Railway
- Убедитесь, что `DATABASE_URL` правильно скопирован из настроек базы данных
- Проверьте, что миграции запущены: `railway run npx prisma migrate deploy`

### Проблема: "Cannot find module" или ошибки при сборке
- Убедитесь, что все зависимости указаны в `package.json`
- Проверьте, что `node_modules` в `.gitignore`

### Проблема: Миграции не применились
- После создания базы данных запустите: `railway run npx prisma migrate deploy`
- Затем запустите seed: `railway run npm run prisma:seed`

## Дополнительные настройки

### Custom Domain (опционально)

1. В Railway → Settings → Networking
2. Добавьте ваш домен
3. Настройте DNS записи как указано в Railway

### Environment Variables для разных окружений

Railway поддерживает разные переменные для Production и Preview окружений. Вы можете настроить их отдельно в разделе Variables.

---

**Важно после деплоя:**
1. ✅ Измените пароль администратора
2. ✅ Проверьте, что все страницы открываются
3. ✅ Протестируйте редактирование контента в админ-панели
4. ✅ Убедитесь, что публичные страницы работают корректно

