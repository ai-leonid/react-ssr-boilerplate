Boilerplate Frontend
=================
Фронтенд boilerplate. Используемые технологии: node-js, react + server side rendering,  hot-module-replacement, webpack 4, postCss.

Запуск проекта для development
====
1. Качаем Node.js LTS: https://nodejs.org/en/
2. В корне проекта выполняем команду `npm install` чтобы установить зависимости
3. Копируем и переименовываем `config/common.json.dist` и `config/server.json.dist` без расширения `.dist` (руками [либо через скрипт `ci.js`](#Прочее)) и указываем все пути, ключи, env. 
4. В корне выполняем команду `npm start`
5. Сайт должен запуститься на `localhost:8080`

Все изменения подхватываются автоматически при изменении исходников.

Создания билда для production
====
1. Качаем Node.js LTS: https://nodejs.org/en/
2. В корне проекта выполняем команду `npm install` чтобы установить зависимости
3. Копируем и переименовываем `config/common.json.dist` и `config/server.json.dist` без расширения `.dist` (руками [либо через скрипт `ci.js`](#Прочее)) и указываем все пути, ключи, env. 
4. Запустить команду `npm run build`
5. После окончания появится папка `dist` в которой лежит папка `public` и серверный файл `server.js`, который нужно скормить серверу nodejs
6. Запускаем сервер nodejs: `npm run server`


Настройки config/common.json
====
Тут хранятся различные пути до api и другие данные которые доступны как клиентской так и серверной части.

`env='production'` - даёт команду всему приложению вести себя как на боевом сервере, т.е. включается минификация, NODE_ENV ставится production, и выключается hot module replacement плагины. Также не будет работать отдача ассетов (js, css, images), т.к. их на продакшене отдаёт nginx.

`env='development'` - отключает минификацию, и включает hot module replacement. Поэтому запустив шаг 4 (`npm start`) должно всё работать как надо.

`apiUrl` - путь до Api

Настройки config/server.json
====
Файл выделен отдельно так как в нём хранятся различные ключи и серверные данные, которые не должны попасть пользователю.

Прочее
====
Различные названия (page titles, messages и др.): `assets_src\shared\modules\constants.js`

В папке `config/` находятся файлы для конфигурации приложения:

* `common.json.dist` - файл-шаблон **общей** конфигурации из него нужно создать `common.json`

* `server.json.dist` - файл-шаблон **серверной** конфигурации из него нужно создать `server.json`

* `client.js` - модуль для подключения конфигурации в **клиентскую** часть приложения

* `server.js` - модуль для подключения конфигурации в **серверную (node-js)** часть приложения

* `ci.js` - скрипт для настройки и автоматического копирования `*.dist` файлов в `*.js`.

    * `node ci.js -i dev` - сгенерирует все ссылки для -dev инстансов.
    * `node ci.js` - сгенерирует все ссылки для production инстансов.
    * `node ci.js -au https://api-example.com -e production` - указываем кастомные ссылки на инстансы и ставим среду в `production`.
    * Параметры, кратко: `node ci.js [-i dev] [-au apiUrl] [-e production]`
    * Список всех параметров
    
```--instance, -i: instance name without '-'
--apiUrl, -au: url to site api like https://api-example.com.com
--env, -e: production or development app environment
--help, -h: get some help information```

