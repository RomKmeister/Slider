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
Model, ViewSlider и ViewPanel не взаимодействуют напрямую и являются параметрами Presenter. Presenter использует паттерн медиатор. Model и View* уведомляют Presenter об изменениях. Presenter знает как элементы должны взаимодействовать и при получении уведомления перенаправляет вызов соттветствующему элементу.

<h2>UML-диаграмма</h2>
<img src="https://github.com/RomKmeister/Slider/UML.jpg" alt="uml">