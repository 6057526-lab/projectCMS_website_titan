# Как применить миграции на Railway

## Проблема

Когда выполняете `railway run npx prisma migrate deploy` локально, Railway CLI использует внутренний хост `postgres.railway.internal:5432`, который доступен только внутри контейнера Railway.

## Решение 1: Создать и применить миграцию

### Шаг 1: Получить публичный DATABASE_URL

1. Railway Dashboard → Ваш PostgreSQL сервис
2. Settings → Variables
3. Найдите `DATABASE_URL` (или `PGDATABASE`, `POSTGRES_URL`)
4. Скопируйте значение - это будет публичный URL

Или через CLI:
```powershell
railway variables
```

### Шаг 2: Создать миграцию локально

Временно установите DATABASE_URL локально:

```powershell
# Windows PowerShell
$env:DATABASE_URL="your-public-database-url-here"

# Создать миграцию
npx prisma migrate dev --name init
```

Это создаст папку `prisma/migrations` с файлами миграции.

### Шаг 3: Закоммитить миграции

```powershell
git add prisma/migrations
git commit -m "Add initial Prisma migrations"
git push
```

### Шаг 4: Применить миграцию на Railway

После пуша Railway автоматически пересоберет проект. Затем миграция будет применена автоматически при следующем деплое, ИЛИ можно запустить:

```powershell
railway run npx prisma migrate deploy
```

---

## Решение 2: Использовать Railway Shell (проще!)

Railway позволяет подключиться к контейнеру и выполнить команды там:

1. Railway Dashboard → Ваш проект → Settings → Connect
2. Следуйте инструкциям для подключения к shell
3. Внутри контейнера выполните:
   ```bash
   npx prisma migrate dev
   ```

---

## Решение 3: Создать миграцию вручную (быстро)

Если миграции еще нет, можно создать её без подключения к БД:

1. Убедитесь, что Prisma Client сгенерирован:
   ```powershell
   npx prisma generate
   ```

2. Создайте миграцию вручную:
   ```powershell
   npx prisma migrate dev --create-only --name init
   ```

   Это создаст файлы миграции БЕЗ применения к БД.

3. Закоммитьте:
   ```powershell
   git add prisma/migrations
   git commit -m "Add initial migrations"
   git push
   ```

4. На Railway выполните:
   ```powershell
   railway run npx prisma migrate deploy
   ```

---

## Быстрое решение прямо сейчас:

```powershell
# 1. Создать миграцию БЕЗ подключения к БД
npx prisma migrate dev --create-only --name init

# 2. Закоммитить
git add prisma/migrations
git commit -m "Add initial Prisma migrations"
git push

# 3. После деплоя на Railway - применить миграцию через Dashboard или CLI
railway run npx prisma migrate deploy
```

