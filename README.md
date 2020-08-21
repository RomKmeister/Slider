# Slider
<a href="https://romkmeister.github.io/Slider/">Демо-страница</a>
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
Model содержит данные и логику работы слайдера. Model создает вспомогательный модуль ModelCorrection, который занимается проверкой и исправлением данных слайдера.
View содержит элементы слайдера ScaleView, RunnerView и BubbleView, предоставляет им информацию для отображения и преобразует данные событий на элементах.
Для взаимодействия модулей используется паттерн наблюдатель. Presenter подписывается на события View и Model и при получении уведомления перенаправляет вызов на обновление соответствующему элементу. Также наблюдатель используется для передачи данных от элементов ScaleView и RunnerView, при этом на события подписывается View.

<h2>UML-диаграмма</h2>
<img src="https://github.com/RomKmeister/Slider/blob/master/UML.jpg" alt="uml">