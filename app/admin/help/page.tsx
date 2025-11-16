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
            Эта система управления контентом позволяет вам редактировать текстовое содержимое сайта REEMS. 
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
                Для редактирования блока нажмите кнопку "Редактировать" в правом верхнем углу карточки блока. 
                Вы можете изменить:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                <li><strong>Заголовок</strong> — основной заголовок блока</li>
                <li><strong>Подзаголовок</strong> — дополнительный заголовок (если есть)</li>
                <li><strong>Текст</strong> — основной текст блока</li>
                <li><strong>Маркированный список</strong> — список пунктов (каждый пункт на новой строке)</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💾 Сохранение изменений</h3>
              <p className="text-gray-700 text-sm">
                После редактирования нажмите кнопку "Сохранить". Изменения будут применены немедленно и станут 
                видны на публичном сайте. Кнопка "Отмена" отменит изменения без сохранения.
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
              <h3 className="font-semibold text-gray-900 mb-2">CTA</h3>
              <p className="text-sm text-gray-600">Призыв к действию (Call To Action)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Важные замечания</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-sm text-gray-700">
                <strong>Только текстовые поля:</strong> В текущей версии можно редактировать только текст. 
                Изображения и другие медиа-файлы пока не поддерживаются.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">ℹ️</span>
              <p className="text-sm text-gray-700">
                <strong>Маркированный список:</strong> Каждая строка в поле "Маркированный список" станет отдельным 
                пунктом списка. Пустые строки будут проигнорированы.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-sm text-gray-700">
                <strong>Мгновенное обновление:</strong> Все изменения сохраняются в базу данных и сразу отображаются 
                на публичном сайте. Обновление страницы покажет актуальные данные.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-2">🔒</span>
              <p className="text-sm text-gray-700">
                <strong>Безопасность:</strong> Не передавайте свои учетные данные другим лицам. 
                После первого входа рекомендуется изменить пароль администратора.
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

