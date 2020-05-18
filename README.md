# Slider
<a href="https://romkmeister.github.io/Slider/dist/index.html">Демо-страница</a>
<h2>Клонирование репозитория</h2>
 <pre>$ git clone https://github.com/RomKmeister/Slider.git</pre>
<h2>Сборка проекта</h2>
<pre>
$ cd "slider"
$ npm i
$ npm run build</pre>
<h2>Запуск на сервере</h2>
<pre>$ npm run server</pre>

<h2>Запуск тестов</h2>
<pre>$ npm test</pre>

<h2>Архитектура</h2>
Model содержит данные слайдера, при получении данных происходит исправление ошибок, а также подготовка вспомогательных параметров. 
ViewSlider содержит элементы слайдера ViewScale, ViewHandles и ViewBubbles, предоставляет им информацию для отображения и преобразует данные событий на элементах.
ViewPanel отображает настройки слайдера и отслеживает события их изменения.
Для взаимодействия модулей используется паттерн наблюдатель. Presenter подписывается на события ViewSlider, ViewPanel и Model и при получении уведомления перенаправляет вызов на обновление соответствующему элементу. Также наблюдатель используется для передачи данных от элементов ViewScale и ViewHandles, при этом на события подписывается ViewSlider.

<h2>UML-диаграмма</h2>
<img src="https://github.com/RomKmeister/Slider/blob/master/UML.jpg" alt="uml">