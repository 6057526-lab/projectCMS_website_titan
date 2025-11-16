# Список переменных окружения для Railway

Скопируйте этот список при настройке проекта на Railway.

## Обязательные переменные

### 1. DATABASE_URL
**Описание:** Connection string для PostgreSQL базы данных  
**Где взять:** Railway автоматически создает при добавлении PostgreSQL сервиса  
**Расположение в Railway:**
- Railway Dashboard → Ваш PostgreSQL сервис → Variables → `DATABASE_URL`

**Пример:**
```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

---

### 2. JWT_SECRET
**Описание:** Секретный ключ для подписи JWT токенов аутентификации  
**Требования:** Минимум 32 символа, случайная строка  
**Как сгенерировать:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Расположение в Railway:**
- Railway Dashboard → Ваш проект (не база данных) → Settings → Variables → Add Variable
- Имя: `JWT_SECRET`
- Значение: `<сгенерированная строка>`

**Пример:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

### 3. NODE_ENV (опционально)
**Описание:** Окружение приложения  
**Значение:** `production`  
**Расположение в Railway:**
- Railway Dashboard → Ваш проект → Settings → Variables
- Railway может установить автоматически

---

## Чек-лист для добавления переменных

1. [ ] Добавлен PostgreSQL сервис → получен `DATABASE_URL`
2. [ ] Сгенерирован `JWT_SECRET` (минимум 32 символа)
3. [ ] Добавлен `JWT_SECRET` в Variables основного сервиса (не базы данных)
4. [ ] `NODE_ENV=production` (опционально)

---

## Быстрая команда для генерации JWT_SECRET

```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Linux/Mac
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Проверка после добавления переменных

После добавления всех переменных проверьте:

1. Все переменные отображаются в Railway Dashboard → Variables
2. `DATABASE_URL` доступен для основного сервиса (Railway автоматически делает его доступным)
3. `JWT_SECRET` добавлен в основной сервис (не в базу данных)
4. После деплоя приложение запускается без ошибок

---

## Важные замечания

⚠️ **Безопасность:**
- Никогда не коммитьте `.env` файлы в Git
- Используйте разные `JWT_SECRET` для разных окружений
- После первого входа обязательно измените пароль администратора

ℹ️ **Railway особенности:**
- `DATABASE_URL` автоматически доступен всем сервисам в проекте
- Переменные из PostgreSQL сервиса автоматически доступны основному сервису
- При добавлении новой переменной Railway перезапустит сервис

