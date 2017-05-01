/*!
 * МОДУЛЬ SKED
 * @author  GEORGII MAKARYCHEV
 */
;(function(){

  var lectures = [];   // массив для объектов лекций
  var halls = [];      // массив для объектов аудиторий
  var schools = [];    // массив для объектов школ

  // Для примера показано, как массив выглядит с данными.
  // Иначе можно заполнить данными, полученных из хранилища.
  /*
      schools[0] = {
          //id: "1", // решил, что лучше вместо id использовать ключ массива
          title: "Школа разработки интерфейсов",
          quantity: 30,
          className: 'lecture-sch--RI'
      }
      schools[1] = {
          //id: "2",
          title: "Школа мобильного дизайна",
          quantity: 40,
          className: 'lecture-sch--MD'
      }
      schools[2] = {
          //id: "3",
          title: "Школа мобильной разработки",
          quantity: 50,
          className: 'lecture-sch--MR'
      }
    */

/*--------------------------------------------------------------------------*/

/**
 * Включение вывода отладочных сообщений в консоль
 *
 * @param {boolean} status
 * @return {boolean} true - вкл., false - выкл.
 */
  var debug = false;
  function debugging(status) {
      if (typeof status != 'boolean') {
        return debug = false;
      }
    return debug = status;
  }

/**
 * Возвращает объект из массива объектов по id или title
 *
 * @private
 * @param {object} arr Массив, в котором ищем (school, lecture, hall)
 * @param {(string|number)} search Название (title) или id.
 * @return {object} обновлённый объект из массива sсhool.
 */
  function getObjFromArray(arr, search) {
    if (!!!arr || search === ''
        || search === 'undefined'
        || typeof arr !== 'object'
        || typeof search !== 'string' && typeof search !== 'number') {
      if (debug) console.warn('В функцию переданы неправильные параметры.');
      return false;
    }
    // проверяем как будем искать:
    if (typeof search === 'number') { // ищем по id
      for (var i = 0; i < arr.length; i++) {
        if (i in arr) {
          //if (search == arr[i].id) return arr[i];
          if (search == i) return arr[i];
        }
      }
    }
    if (typeof search === 'string') { // ищем по title
      for (var i = 0; i < arr.length; i++) {
        if (i in arr) {
          if (search.toUpperCase() == arr[i].title.toUpperCase()) return arr[i];
        }
      }
    }
    if (debug) {
      if (typeof search === 'number') {
        console.log('В массиве нет объекта с id='+search);
      }
/*    else {
        console.log('В массиве нет объекта с заголовком ['+search+']');
      } */
    }
    return false;
  }

  /**
   * Возвращает дату из строки с разделителями
   *
   * @private
   * @param {string} strDate Строка вида дд.мм.гггг или дд-мм-гг и т.п
   * @return {object} преобразованный объект даты
   */
  function parseDate(strDate) {
    var _date = strDate.split(/[.|,|-|\/|\s]/g);
    return new Date(parseInt(_date[2], 10),
              parseInt(_date[1], 10) - 1,
              parseInt(_date[0], 10));
  }
  /**
   * Возвращает дату и время из текстовых строк
   *
   * @private
   * @param {string} strDate Строка вида дд.мм.гггг или дд-мм-гг и т.п
   * @param {string} strTime Строка вида 15:30 или 02-00
   * @return {object} преобразованный объект дата+время
   */
  function parseDateTime(strDate, strTime) {
    var _date = strDate.split(/[.|,|-|\/|\s]/g);
    var _time = strTime.split(/[.|,|-|:|\s]/g);
    return new Date(parseInt(_date[2], 10),
              parseInt(_date[1], 10) - 1,
              parseInt(_date[0], 10),
              parseInt(_time[0], 10),
              parseInt(_time[1], 10));
  }
  /**
   * Преобразует строку в дату
   *
   * @private
   * @param {string} strDate Строка вида "Fri Apr 28 2017 15:40:00 GMT+0300 (MSK)"
   * @return {object} преобразованный объект даты
   */
  function getDateFromStr(strDate) {
    return new Date(strDate);
  }

/*--------------------------------------------------------------------------*/

  function sked() {};

  /** Объект для работы с лекциями */
  var lecture = {
      store: lectures,
      add: function(title, speaker='') {
        if (!!!title || title == ''
            || typeof title !== 'string'
            || typeof speaker !== 'string') {
          if (debug) console.warn('В функцию передан неправильные параметры.');
          return false;
        }
        /** проверяем нет ли лекции с таким названием */
        if (getObjFromArray(this.store, title)) {
          if (debug) console.warn('Лекция с таким названием уже существует!');
          return false;
        }
          if (debug) console.log('Лекция ['+title+'] добавлена!');
          this.store.push({
            title: title,
            speaker: speaker
          });
          return this.store[this.store.length-1];
      },
      editTitle: function(search, title) {
        obj = getObjFromArray(this.store, search);
        obj.title = title;
        return obj;
      },
      editSpeaker: function(search, speaker) {
        obj = getObjFromArray(this.store, search);
        obj.speaker = speaker;
        return obj;
      }
  }

  /** Объект для работы с аудиториями */
  var hall = {
      store: halls,
      add: function(title, capacity, desc='') {
        if (!!!title || !!!capacity
            || title == '' || capacity < 1
            || typeof title !== 'string' || typeof desc !== 'string'
            || typeof capacity !== 'number') {
          if (debug) console.warn('В функцию переданы неправильные параметры.');
          return false;
        }
        /** проверяем нет ли аудитории с таким названием */
        if (getObjFromArray(this.store, title)) {
          if (debug) console.warn('Аудитория с таким названием уже существует!');
          return false;
        }
          if (debug) console.log('Аудитория ['+title+'] добавлена!');
          this.store.push({
            title: title,
            capacity: capacity,
            desc: desc
          });
          return this.store[this.store.length-1];
      },
      editTitle: function(search, title) {
        obj = getObjFromArray(this.store, search);
        obj.title = title;
        return obj;
      },
      editCapacity: function(search, capacity) {
        if (capacity < 1) {
          if (debug) console.warn('Аудитория должна вмещать хотя бы 1 студента.');
          return false;
        }
        obj = getObjFromArray(this.store, search);
        obj.capacity = capacity;
        return obj;
      },
      editDescription: function(search, desc) {
        obj = getObjFromArray(this.store, search);
        obj.desc = desc;
        return obj;
      }
  }

  /** Объект для работы со школами */
  var school = {
      store: schools,
      add: function(title, quantity, className='lecture-sch--X') {
        if (!!!title || !!!quantity
            || title == '' || quantity < 1
            || typeof title !== 'string'
            || typeof quantity !== 'number') {
          if (debug) console.warn('В функцию переданы неправильные параметры.');
          return false;
        }
        /** проверяем нет ли школы с таким названием */
        if (getObjFromArray(this.store, title)) {
          if (debug) console.warn('Школа с таким названием уже существует!');
          return false;
        }
          if (debug) console.log('Школа ['+title+'] добавлена!');
          this.store.push({
            title: title,
            quantity: quantity,
            className: className
          });
          return this.store[this.store.length-1];
      },
      editTitle: function(search, title) {
        obj = getObjFromArray(this.store, search);
        obj.title = title;
        return obj;
      },
      editQuantity: function(search, quantity) {
        /* будем считать, что в школе может быть 0 студентов */
        if (quantity < 0) {
          if (debug) console.warn('В школе не может быть отрицательное количество студентов.');
          return false;
        }
        obj = getObjFromArray(this.store, search);
        obj.quantity = capacity;
        return obj;
      },
      editClassName: function(search, className) {
        if (typeof className !== 'string') return false;
        obj = getObjFromArray(this.store, search);
        obj.className = className;
        return obj;
      }
  }

/*--------------------------------------------------------------------------*/
/**
* Добавляем доп.методы объектам для удобства работы
*/
Object.defineProperties(lecture, {
  'show': {
     get: function() {
       return this.store;
     }
   }
});
Object.defineProperty(hall, 'show', {
  get: function() {
    return this.store;
  }
});
Object.defineProperties(school, {
  'show': {
    get: function() {
      return this.store;
    }
  },
  'render': {
    get: function() {
      var filters = document.getElementById('filters');
      var html = '',
          html_row = '';
          html = '<div class="lecture--legend">';
          for (var i = 0; i < this.store.length; i++) {
            if (i in this.store) {
              html_row += '<div class="lecture-sch">\n' +
                          '<span class="filter-sch" data-options="'+this.store[i].className+'">' +
                            this.store[i].title +
                          '</span>\n' +
                          '<div class="'+this.store[i].className+'"></div>\n' +
                          '</div>\n';
            }
          }
          html = html+html_row+'</div>';
      filters.innerHTML = html;
    }
  }
});
Date.prototype.getMonthName = function() {
    var month = ['Январь','Февраль','Март','Апрель','Май','Июнь',
    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    return month[this.getMonth()];
}
/*--------------------------------------------------------------------------*/
/**
* Работа с событиями расписания
*/

var events = []; // массив для объектов событий
/*
    events[0] = {
      date: '15.06.2016',
      time: '19:00',
      duration: 2.5,
      lecture: lectures[0],
      hall: halls[0],
      schools: [
        schools[0],
        schools[1]
      ]
    }
*/
function initEvent() {
  var event = {
    date: '',
    time: '',
    duration: 0,
    lecture: {},
    hall:    {},
    schools: []
  };

  function event() {
    return event;
  }
  /** МОЖНО вызывать цепочкой методов для удобства */
  event.setDate = function( value='' ) {
      if (typeof value !== 'string') return false;
        event.date = value;
        if (debug) console.log('Дата ['+value+'] установлена для события.');
      return this;
  };
  event.setTime = function( value='' ) {
      if (typeof value !== 'string') return false;
        event.time = value;
        if (debug) console.log('Время ['+value+'] установлено для события.');
      return this;
  };
  event.setDuration = function( value=0 ) {
      if (typeof value !== 'number') return false;
        event.duration = value;
        // TODO:
        // добавить проверку, чтобы лекция заканчивалась не поздее 24:00
        if (debug) console.log('Продолжительность ['+value+'] часа установлена для события.');
      return this;
  };
  event.setLecture = function( value={} ) {
      if (typeof value === 'number') {
        event.lecture = getObjFromArray(lectures, value);
      }
      /** !!! в будущем нужна проверка на соответствие прототипа,
       *  !!! если передаётся сам объект, а не ссылка на существующий.
       *  !!! Но пока сделаю проверку при сохранении события.
       */
      if (typeof value === 'object' && !value.hasOwnProperty('length')) {
        event.lecture = value;
      }
      if (debug) console.log('Лекция ['+event.lecture.title+'] выбрана для события.');
      return this;
  };
  event.setHall = function( value={} ) {
      if (typeof value === 'number') {
        event.hall = getObjFromArray(halls, value);
      }
      if (typeof value === 'object' && !value.hasOwnProperty('length')) {
        event.hall = value;
      }
      if (debug) console.log('Аудитория ['+event.hall.title+'] установлена для события.');
      return this;
  };
  /** Стоит помнить, что может быть несколько школ, поэтому данные хранятся в массиве */
  /** На входе может быть объект, массив объектов или индекс элемента в хранилище schools */
  event.setSchool = function( value=[] ) {

          /** функция проверки наличия школы в массиве */
          function checkSchools(obj) {
            var i;
            for (i in event.schools) {  // будем сравнивать по title
              if (obj.title.toUpperCase() == event.schools[i].title.toUpperCase()) {
                return false;
              }
            }
            return true;
          }

      if (typeof value === 'number') {
        var obj = getObjFromArray(schools, value);
        if (checkSchools(obj)) {
          event.schools.push(obj);
          if (debug) console.log('Школа ['+obj.title+'] прикреплена к событию.');
        }
      }
      if (typeof value === 'object') {
        if (!value.hasOwnProperty('length')) { // передан 1 объект {}, а не массив
          if (checkSchools(value)) {
            event.schools.push(value); // добавляем объект в массив
            if (debug) console.log('Школа ['+value.title+'] прикреплена к событию.');
          }
        }
        if (value.length === 0) { // передан пустой массив []
          event.schools = [];
        }
        if (value.length > 0) { // передан не пустой массив [{},{}] или [1,2]
          /** Заготовка на будущее, чтобы добавлять несколько школ сразу, а не цепочкой */
          //event.schools = value;
          if (debug) console.log('Извините, пока что нельзя добавить несколько школ сразу :(');
        }
      }
      return this;
  };
  /** Вызывать в конце цепочки методов */
  event.clear = function() {
    var d = debug;
    sked.debugging(false);
    event.setDate()
          .setTime()
          .setDuration()
          .setLecture()
          .setHall()
          .setSchool();
    sked.debugging(d);
    if (debug) console.log('Временное хранилище очищено.');
    return this;
  };
  event.check = function() {
      if (event.date === '') return false;
      if (event.time === '') return false;
      if (event.duration === 0) return false;
      if (JSON.stringify(event.lecture) === '{}') return false;
      if (JSON.stringify(event.hall) === '{}') return false;
      if (JSON.stringify(event.schools) === '[]') return false;
      if (debug) console.log('Событие можно попытаться сохранить.');
    return true;
  };
  event.save = function() {
      if (event.check()) {
        var obj = {};
        for (var key in event) { // берём только enumerable ключи
          obj[key] = event[key];
        }
        /** Проверка на корректность и связность данных */

        // Вместимость аудитории должна быть больше или равной количеству студентов на лекции.
        var capacity = obj.schools.map(function(el) { return el.quantity; })
                                  .reduce(function(sum, current) { return sum + current; }, 0);
        if ( obj.hall.capacity < capacity ) {
          if (debug) console.warn('Вместимость аудитории ['+obj.hall.title+'] должна быть >= количеству студентов на лекции.');
          return this;
        }

        for (var i in events) {
          if ( parseDate(events[i].date).getTime() == parseDate(obj.date).getTime() ) {
            var start = parseDateTime(events[i].date, events[i].time).getTime(), // начало имеющегося события
                  end = start + events[i].duration*3600*1000,
               _start = parseDateTime(obj.date, obj.time).getTime(),             // начало добавляемого события
                 _end = _start + obj.duration*3600*1000;

              if ( start >= _start  &&  start < _end      /*смещение вперед*/
                  || end <= _end  &&  end > _start        /*смещение назад*/
                  || start < _end  &&  end > _start       /*вхождение*/
                  || start >= _start  &&  end <= _end ) { /*поглощение и совпадение*/
                  // Для одной школы не может быть двух лекций одновременно:
                  for (var s in obj.schools) {
                    if ( events[i].schools.indexOf(obj.schools[s]) != -1 ) {
                      if (debug) console.warn('['+obj.schools[s].title+'] не может иметь двух лекций одновременно!');
                      return this;
                    }
                  }
                  // В одной аудитории не может быть одновременно двух разных лекций:
                  if ( events[i].hall.title.toUpperCase() == obj.hall.title.toUpperCase() ) {
                    if (debug) console.warn('В аудитории ['+obj.schools[s].title+'] не может быть одновременно двух разных лекций!');
                    return this;
                  }
              }
          }
        }
        events.push(obj);
        if (debug) console.log('Событие сохранено в расписании.');
        event.clear();
        return this;
      }
      if (debug) console.log('Событие не может быть сохранено!');
      return false;
  };
  /** Скрываем свойства из перечисления */
  Object.defineProperties(event, {
      clear: {enumerable: false},
      check: {enumerable: false},
      save: {enumerable: false},
      setDate: {enumerable: false},
      setTime: {enumerable: false},
      setDuration: {enumerable: false},
      setLecture: {enumerable: false},
      setHall: {enumerable: false},
      setSchool: {enumerable: false},
      'show': {
         get: function() {
           return events;
         }
       },
      'done': {
        set: function(search) {
          obj = getObjFromArray(events, search);
          obj.className = "lecture-done";
          this.render;
        }
      },
      'render': {
        get: function() {
          var schedule = document.getElementById('schedule');
          var html = '';
          var arrMonths = [];
          var arrDays = [];
          var arrLectures = [];
          var _date;
          var _dateTime
              for (var i = 0; i < events.length; i++) {
                if (i in events) {
                  var html_schools = '';
                  var e = events[i];
                  _date = parseDate(e.date);
                  _dateTime = parseDateTime(e.date, e.time);
                  /** Получить все месяцы в расписании для sked--month */
                  arrMonths[_date.getMonth()] = ''
                                    +'<div class="sked--month">'+
                                      '<div class="sked-wrapper">'+
                                      _date.getMonthName()+' '+_date.getFullYear()+
                                      '</div>'+
                                      '<div class="lecture-wrapper"><hr>'+
                                      '</div></div>';
                  /** Получить все числа в расписании для sked-wrapper */
                  arrDays[_date] = '<div class="sked-wrapper">'+
                                      '<div class="sked"><span class="sked-date">'+
                                      _date.getDate()+
                                      '</span></div>'+
                                      '</div>';
                  /** Получить все лекции по числам */
                  if (e.hasOwnProperty('className') && e.className !== '') { /* для sked.event.done */
                      e.className = (e.className.startsWith(' ')) ? e.className : ' '+e.className; /* пробел уже добавлен? */
                  } else {
                      e.className = '';
                  }
                  for (var s in e.schools) {
                    html_schools += '<div class="'+e.schools[s].className+'"><small>'+e.schools[s].title+'</small></div>';
                  }
                  arrLectures[_dateTime] = ''+ //'<div class="'+e.schools[0].className+'"><small>'+e.schools[0].title+'</small></div>'
                                      '<div class="lecture'+e.className+'">'+
                                      '<div class="lecture-sch">'+html_schools+'</div>'+
                                      '<div class="lecture-title"><span></span>'+
                                      '<div>'+e.lecture.title+'</div></div>'+
                                      '<div class="lecture-speaker">'+
                                      '<div class="lecture-speaker--name"><b>'+
                                      e.lecture.speaker+
                                      '</b><span class="lecture-speaker--tooltip">'+
                                      '<div class="lecture-speaker--card">'+
                                      '<img src="assets/img/nophoto.png" alt="Speaker photo">'+
                                      '<div class="lecture-speaker--wrapper">'+
                                      '<div class="lecture-speaker--name">'+e.lecture.speaker+'</div>'+
                                      '<div class="lecture-speaker--about">'+
                                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, molestiae.</div>'+
                                      '<div class="lecture-speaker--more"><a href="javasript:void(0);">Подробнее</a></div>'+
                                      '</div></div></span></div></div>'+
                                      '<div class="lecture-info">'+
                                      '<div class="lecture-info--date">'+e.date+' '+e.time+'</div>'+
                                      '<div class="lecture-info--place">Аудитория «'+e.hall.title+'»</div>'+
                                      '<div class="lecture-info--materials"></div>'+
                                      '<div class="lecture-info--video"></div>'+
                                      '</div></div>';
                }
              }
          /** Вывод расписания */
          for (var m in arrMonths) {
            html += arrMonths[m];
            for (var d in arrDays) {
              if (getDateFromStr(d).getMonth() == m) {
                html += arrDays[d];
                html += '<div class="lecture-wrapper">';
                  var current_date = getDateFromStr(d).getDate()+'.'+getDateFromStr(d).getMonth();
                for (var l in arrLectures) {
                  var lecture_date = getDateFromStr(l).getDate()+'.'+getDateFromStr(l).getMonth();
                  if (lecture_date == current_date) {
                    html += arrLectures[l];
                    html += '<hr class="lecture-delimiter">';
                  }
                }
                html += '</div>';
              }
            }
          }

          schedule.innerHTML = html;

        }
      }
  });
  return event;
}

/** TODO */
// Сортировка events перед рендером
// Проверка наложения событий при .save();
// Просмотр расписания школы в заданный интервал дат;
// Просмотр графика лекций в аудитории в заданный интервал дат;
// Хранение в LocalStorage в сериализованном виде;
// Простая админка, подключаемая файлом sked.visual.js

  function setFilter() {
      var filters = {};
      var _events = events;
      var __events = events;

      function filter(_start, _end) {

        if (typeof _start === 'undefined' && typeof _end === 'undefined') {
          events = __events;
          _events = events;
          sked.event.render;
          if (debug) console.log('Фильтр очищен!');
          return filters;
        }
        if (typeof _start != 'string' && typeof _end != 'string') return false;

        /** Обойти массив events и получить новый отфильтрованный массив */
        function filterObj(event) {
          if ( parseDate(event.date) >= parseDate(_start) && parseDate(event.date) <= parseDate(_end) )
            return true;
          else {
            return false;
          }
        }
             _events = events.filter(filterObj);
             events = _events;
             sked.event.render;
             events = __events; // вернули ссылку на исходный объект
        if (debug) console.log('Отфильтровано событий: '+_events.length+'.');
        return filters;
      }

      filters.school = function(search) {
          if (typeof search !== 'string' && typeof search !== 'number') {
            if (debug) console.warn('В функцию переданы неправильные параметры.');
            return false;
          }
          var obj = getObjFromArray(schools, search);
              if (!obj) {
                console.warn('Школа ['+search+'] не найдена!');
                return this;
              }
          _events = _events.filter(function(event) {
                                      for (var i in event.schools) {
                                        if (obj.title.toUpperCase() == event.schools[i].title.toUpperCase()) {
                                          return true;
                                        }
                                      }
                                      return false;
                                  });
          events = _events;
          sked.event.render;
          events = __events; // вернули ссылку на исходный объект
        return this;
      }

    return filter;
  }
  //    filter('13/12/2016', '15/12/2016').school("ШРИ");
  sked.filter = setFilter();

/*--------------------------------------------------------------------------*/

  if (false) { // на случай, если нужно будет посмотреть объекты заменить на true
    sked.lectures = lectures;
    sked.halls = halls;
    sked.schools = schools;
    sked.events = events;
  }

  sked.debugging = debugging;
  sked.lecture = lecture;
  sked.hall = hall;
  sked.school = school;
  sked.event = initEvent();
  sked.newEvent = function(name) {
    window[name] = new initEvent();
  }
  sked.render = function() {
    sked.school.render;
    sked.event.render;
  }
  window.sked = sked;
}.call(this));
