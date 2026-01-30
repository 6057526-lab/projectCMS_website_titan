import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Помощь и инструкции</h1>
        <Link 
          href="/admin/page-list" 
          className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
        >
          ← Назад к страницам
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Добро пожаловать в админ-панель REEMS!</h2>
          <p className="text-gray-700 leading-relaxed">
            Эта система управления контентом позволяет редактировать текстовое содержимое и изображения сайта REEMS.
            Все изменения сохраняются в базе данных и сразу отображаются на публичном сайте.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Что можно делать?</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📄 Просмотр страниц</h3>
              <p className="text-gray-700 text-sm">
                На главной странице админки вы видите список всех страниц сайта. Каждая страница имеет название, 
                адрес (slug) и дату последнего обновления.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">✏️ Редактирование контента</h3>
              <p className="text-gray-700 text-sm">
                Нажмите кнопку "Редактировать" рядом с нужной страницей. Вы увидите все блоки контента этой страницы. 
                Каждый блок имеет тип (HERO, INTRO, MARKET_SEGMENT и т.д.) и уникальный ключ.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📝 Редактирование блоков</h3>
              <p className="text-gray-700 text-sm">
                Для редактирования блока нажмите кнопку "Edit Content" (Редактировать) в правом верхнем углу карточки блока.
                Вы можете изменить:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                <li><strong>Title / Headline</strong> — основной заголовок блока</li>
                <li><strong>Subtitle / Lead Text</strong> — подзаголовок (если есть)</li>
                <li><strong>Body Text / Description</strong> — основной текст блока</li>
                <li><strong>Bullet Points</strong> — маркированный список (каждый пункт с новой строки)</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💾 Сохранение изменений</h3>
              <p className="text-gray-700 text-sm">
                После редактирования нажмите кнопку "Save Changes" (Сохранить). Изменения будут применены немедленно и станут
                видны на публичном сайте. Кнопка "Cancel" (Отмена) отменит изменения без сохранения.
              </p>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🖼️ Загрузка изображений</h3>
              <p className="text-gray-700 text-sm mb-2">
                В каждом блоке внизу карточки есть секция "Block Images". Вы можете загружать новые изображения для этого блока:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Выберите файл (JPEG, PNG или WebP, не более 5 МБ)</li>
                <li>При желании укажите описание изображения (alt) — это важно для доступности и SEO</li>
                <li>Нажмите "Upload Image". Изображение загрузится в облако и привяжется к блоку</li>
              </ul>
              <p className="text-gray-700 text-sm mt-2">
                Загруженные изображения отображаются в блоке и используются на публичном сайте в соответствующей секции (Hero, рыночные сегменты, возможности и т.д.).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Типы блоков</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">HERO</h3>
              <p className="text-sm text-gray-600">Главный баннер в начале страницы</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">INTRO</h3>
              <p className="text-sm text-gray-600">Вводная секция с описанием</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">MARKET_SEGMENT</h3>
              <p className="text-sm text-gray-600">Информация о рыночных сегментах</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">LIFECYCLE_STAGE</h3>
              <p className="text-sm text-gray-600">Этапы жизненного цикла продукта</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">CAPABILITY</h3>
              <p className="text-sm text-gray-600">Описание возможностей компании</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">WHEELS</h3>
              <p className="text-sm text-gray-600">Секция о кованых колёсах</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">COMPANY</h3>
              <p className="text-sm text-gray-600">О компании</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">CTA</h3>
              <p className="text-sm text-gray-600">Призыв к действию (Call To Action)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Работа с изображениями</h2>
          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-700">
              Изображения загружаются в облако (Cloudinary) и привязываются к блоку. Форматы: JPEG, PNG, WebP. Максимальный размер файла — 5 МБ.
              Рекомендуется заполнять описание (alt) для доступности и поисковой оптимизации.
            </p>
            <p className="text-sm text-gray-600">
              Удаление и изменение уже загруженных изображений в текущей версии через админку недоступно. Чтобы заменить картинку, обратитесь к администратору системы.
            </p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Важные замечания</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">ℹ️</span>
              <p className="text-sm text-gray-700">
                <strong>Маркированный список:</strong> В поле "Bullet Points" каждая строка становится отдельным пунктом списка. Пустые строки игнорируются.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-amber-500 mr-2">ℹ️</span>
              <p className="text-sm text-gray-700">
                <strong>Блок INTRO:</strong> В редакторе он не отображается — его контент объединён с блоком Hero на сайте. Редактируйте Hero, если нужно изменить вводный текст.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-sm text-gray-700">
                <strong>Мгновенное обновление:</strong> Все изменения сохраняются в базу данных и сразу отображаются на публичном сайте. Обновите страницу в браузере, чтобы увидеть актуальные данные.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-2">🔒</span>
              <p className="text-sm text-gray-700">
                <strong>Безопасность:</strong> Не передавайте учётные данные другим лицам. После первого входа рекомендуется сменить пароль администратора (через настройки системы или базу данных).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Нужна дополнительная помощь?</h2>
          <p className="text-gray-700 text-sm mb-4">
            Если у вас возникли вопросы или проблемы, обратитесь к администратору системы или 
            к документации проекта.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/admin/page-list"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Перейти к страницам
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

