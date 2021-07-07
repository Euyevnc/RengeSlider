# RangeSlider

[__DEMO__](https://euyevnc.github.io/RangeSlider/)

## Установка 
>npm i range-slider-for-ml

## Как этим пользоваться
 
```
import "jquery"  
import "range-slider-for-ml"  
import"range-slider-for-ml/dist/styles.css"    
//Стили тоже нужно импортировать, и уже потом, если нужно, переопределять т.к. там заданы параметры позиционирования и размеры элементов  
```

Добавленный плагином метод носит имя rangeSlider. При применении он отрендерит слайдер/слайдеры с заданными свойствами и вернёт объект слайдера или массив объектов в случае, если jquery-объект содержит более одного элемента. Функция принимает один аргумент - объект. Через его параметры определяются параметры создаваемого слайдера. Котрые будут приведены в таблице ниже. 

```
let params = {type: "range", orient:"horizontal", scale: true, scaleInterval: 1000, cloud: "click", origin: 0, rangeOffset: 15000, step: 100}

let container = $(".js-parent-container")
let slider = container.rangeSlider(params)

```

Для изменения параметров уже созданного слайдера можно использовать метод changeConfig, передав в качестве аргумента объект с параметрами, которые нужно изменить и их значениями:

```
let newParams = {scaleInterval: 2500, origin: 2000, rangeOffset: 10000}

slider.changeConfig(newParams)

```
Выглядеть это будет примерно так:  
![demo](https://github.com/Euyevnc/RangeSlider/blob/master/readme_assets/readme.png)



Перечень параметров через которые задаётся конфигурация плагина:

|    Имя          |Описание                                          |Значение по-умолчанию|
|  -------------  |:------------------------------------------------:|:-----:|
|    type         |Тип: string; Варианты: "range", "point"            |"range"| |
|    origin       | Тип: number; (Точка отсчёта)                      | 0|
|    rangeOffset  | Тип: number; (Количество значений)                | 100|
|    step         | Тип: number ;  (Размер шага)                       | 1|
|    orient       | Тип: string; Варианты: "vertical", "horizontal"  | "horizontal"|
|    scale        | Тип: boolean   (Отображение шкалы)            | true|
|    cloud        | Тип: string; Варианты: "always", "none", "click" | "click"|
|    scaleInterval| Тип: number; (Интервал отображаемых делений шкалы) | 10|
|    list         | Тип: Array <number/string> (Альтернативный способ)  | []|
|    initialStart | Тип: number; (Начальное положение первого ползунка) | = origin|
|    initialEnd   | Тип: number; (Начальное положение второго ползунка) | = rangeOffset|
    

**Если длинна массива _list_ более нуля, то свойства _step_, _origin_, _scaleInterval_ задаются по-умолчанию, а _rangeOffset_ - исходя из длинны .**

В метод слайдера getValue() возвращает массив с 2 значениями, . И setValues, который значения устанавливает, если тип слайдера  "point" указывать имеет смысл лишь один аргумент. Ну и упомянутый метод init, который может установить значения и перерендерить слайдер, что используется , например, в DEMO при изменении свойств слайдера.

## Как это устроено

Функция создаёт объект слайдера на основе переданных параметров и jquery-объекта, объект имеет три функциональных слоя: _model_, _presenter_, _view_; и объект для хранения конфигурационных данных _config_

Слои _view_ и _model_ имеют свойство _observer_, через который они сообщаются со слоем _presenter_ . И _model_, и _view_(его под-слои _tumblers_ и _scale_, если быть точным) вызывают функцию _observer.broadcast_ при определённых условиях. 

_Presenter_ подписывает свои функции _reactToInteraction_ и _reactToUpdate_ на соответствующие обсерверы, а эти функции в свою очередь вызывают метод для обновления _view_ или _model_, передавая полученные аргументы

Действо попытался отобразить да UML-диаграмме. 
https://drive.google.com/file/d/1nYSpW9N7zwQJ2vJgMtDh5ux6BseQ3ryB/view?usp=sharing







