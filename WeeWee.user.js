// ==UserScript==
// @name         WeeWeeEeEe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bruhable
// @author       You
// @match        *iq.karelia.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(async() => {
    //var baza = {"sample":"sample","Кто автор одной из первых технологий сверточных нейронныхсетей?":"Ян ЛеКун","Чем является функция потерь в задаче классификации?":"индикатором ошибки","К какому типу относится признак \"Цвет волос\"?":"Номинальный","Автокодировщик применяется для решения задачи:":"уменьшения размерности","В чем заключается гипотеза компактности (дляклассификации):":"близкие объекты, как правило, лежат в одном классе","Какое приблизительное количество нейронов в мозге человека":"около 90 млрд.","Метод упрощения задачи до построения дерева Pre-pruning:":"ограничивает рост дерева до того как оно построено","Суть работы алгоритма опорных векторов заключается в том,чтобы:":"создать линию (или гиперплоскость), которая разделяетданные на классы","Выберите НЕверное утверждение. Достоинствами жаднойнисходящей стратегии построения деревьев решений являются:":"трудоемкость квадратична по длине выборки","Выберите верное утверждение":"Объекты описываются с помощью признаков","К какому типу относится задача предсказания цены на жильепо его характеристикам?":"Задача восстановления регрессии","Предсказание стоимости барреля нефти в следующем месяцеявляется задачей:":"регрессии","Как называется отросток нейрона, который подводит к немусигнал?":"дендрит","Определение вида животного на изображении является задачей:":"классификации","Какие из этих задач являются задачами классификации?":"Поиск групп похожих пользователей интернет-магазина|Разделение журналов, хранящихся в электронной библиотеке,на научные и художественные","Перцептрон был разработан":"Фрэнком Розенблаттом ","Выберите достоинства жадной нисходящей стратегии построениядеревьев решений:":"не бывает отказов от классификации|трудоемкость линейна по длине выборки|интерпретируемость и простота классификации|допустимы разнотипные данные и данные с пропусками|гибкость: можно варьировать множество предикатов","Выберите корректное определение метода ближайших соседей":"метрический классификатор, основанный на оцениваниирасстояний между объектами.","Бинарное решающее дерево это:":"ациклический граф содержащий 2 типа вершин - внутренние илистовые","Какое расстояние применяется для сравнения сигналов?":"энергия сжатия и растяжения","Мультиколлинеарность это":"тесная корреляционная взаимосвязь между отбираемыми дляанализа факторами,совместно воздействующими на общийрезультат, которая затрудняет оценивание регрессионныхпараметров","Логистическая регрессия это:":"это статистическая модель, используемая для прогнозированиявероятности возникновения некоторого события путём егосравнения с логистической кривой"}
    console.log("downQ() - скачать базу\n\nloadQ() - загрузить из файла\n\ngetQ() - вывести базу в консоль")

    var qq = {"sample": "sample"} // Тут будут храниться ответы

    unsafeWindow.getQ = function() {return qq}
    unsafeWindow.setQ = function(newq) {qq = newq; GM_setValue("qq", qq)}
    unsafeWindow.downQ = function() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(qq)));
        element.setAttribute('download', "answers.json");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    unsafeWindow.loadQ = function() {
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {

            // getting a hold of the file reference
            var file = e.target.files[0];

            // setting up the reader
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                unsafeWindow.setQ(JSON.parse(content))
                console.log("Успешно загружено!")
            }

        }

        input.click();
    }
    var tqq = await GM_getValue("qq"); // Грузим ответы из памяти
    if (typeof(tqq) == "undefined") {
        await GM_setValue("qq", qq)
    }
    else {
        qq = tqq
    }

    console.log("Вопросов в базе: " + Object.keys(qq).length)

    if (window.location.href.includes("finish")) {
        //window.location.replace("https://iq.karelia.ru/enter.php?t_id=165")
        return
    }

    if (!window.location.href.includes("next")) {

        if (Object.keys(qq).length == 1) {unsafeWindow.setQ(baza)}

        return
    }

    // Дальше код для захвата и сохранения ответов
    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    function antiMos(encstr) {
        encstr += "\n"
        var regx = /(?<=\n)[^\n]{3,}(?=\n)/g;
        var lines = encstr.match(regx);
        var endq = ""

        for (var j = 0; j < lines.length; j = j+2) {
            for (var i = 0; i < lines[j].length; i++) {
                if (lines[j][i] == " ") {
                    if (lines[j+1][i] != " ") {
                        lines[j] = lines[j].replaceAt(i, lines[j+1][i])
                    }
                }
            }
            endq += lines[j]
        }

        return endq;
    }

    var question = document.evaluate("//*[contains(@style, 'padding-left:30px; padding-right:30px')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText

    question = antiMos(question)

    var anrad = document.getElementsByName("a_form_id[]");
    var nans = {}

    for (var i=0; i<anrad.length; i++) {
        nans[antiMos(anrad[i].parentElement.parentNode.parentElement.innerText)] = anrad[i];
    }

    async function saveAnswer() {
        var a = []
        var nons = document.getElementsByName("a_form_id[]");

        for (var i=0; i<nons.length; i++) {
            if (nons[i].checked) {
                a.push(antiMos(nons[i].parentElement.parentNode.parentElement.innerText));
            }
        }

        qq[question] = a.join("|")
        await GM_setValue("qq", qq)
    }
    document.evaluate("//*[contains(@value, 'Отослать ответ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.addEventListener("click", async() => {
        await saveAnswer();
    });
    document.addEventListener("keydown", function(e) {
        if (e.key == "`") {
            if (qq[question] != undefined) {
                if (qq[question].includes("|")) {
                    var ans = qq[question]
                    for (let x of ans.split("|"))
                    {
                        nans[x].click()
                    }
                }
                else {
                    nans[qq[question]].click()
                }
            }}
    })

    // Раскомментите нижнюю строчку, если хотите супербыстрые ответы
    //setTimeout(function() {
    //document.evaluate("//*[contains(@value, 'Отослать ответ')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    //}, 800)
})()
