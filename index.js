const statements = [
  "Омегаверс", "Абьюзивные отношения", "Эвфемизмы", "Секс", "Флешбеки", "Кроссовер", "Избранный", 
  "Герои меняют пол (сказал вместо сказала и т.п)", "«Конец» в конце", 
  "Гейство", "Тупо повседневность", "Смайлики", "Изнасилование", 
  "Извините, если есть ошибки", "Много многоточий", "В нутри/Из нутри", "Летсплейщики/Тик-токеры/Стримеры",
  "***", "Несовершеннолетний(-яя)  живёт один(а)", "Пробелы после знаков препинания",
  "КАПС", "Персонажи перемещаются с помощью названия места", "POV", "Измены", "Называть героев «-глазка», «-волоска»",
  "Шмот/Лук/Было надето", "Точное время", "Ненужные персонажи",
  "Мери Сью", "Известные Бренды", "В ШОКЕ", "Точка в названии фанфика", "ГГ младше 18", "ГГ знаком(а) со знаменитостью", "«Гибрид/Полукровка»",
  "Водные процедуры", "Родители уехали", "Родители умерли/погибли", "Т/и", "От врагов до любовников",
  "Горячие парни нарасхват", "ГГ — это автор", "Повествование меняется", "Ввод персонажа постредством столкновения с ГГ",
  "Глава начинается тем, что ГГ просыпается/Глава заканчивается, когда ГГ засыпает", "Рост/вес персонажей",
  "ГГ популярен(а)", "Физика сломалась", "Это моя первая работа", "Редкие запятые",
  "... часть", "Не судите строго", "Описание персонажей вначале", "Диалоги = Первая буква имени + «—/:»", "Графоманство", "Оверсайз одежда",
  "Мысли", "Клиффхэнгеры", "Попаданец", "ТРОЯ", "Суицидальные штучки", "ЛП/ЛД"
]
let cells;
let bingoState;
let HEIGHT = 5;
let WIDTH = 5;
window.onload = function() {
    initTable(HEIGHT, WIDTH);
    cells = document.getElementsByClassName("square");
    for(let i = 0; i < cells.length; ++i) {
      const index = Math.floor(Math.random()*statements.length)
      const randomStatements = statements[index];
      cells[i].innerHTML = randomStatements;
      statements.splice(index, 1); 
    }
    
}
function selectCell(element) {
  const parseId = element.id.split("_");
  const h = parseInt(parseId[1]);
  const w = parseInt(parseId[2]);
  const classList = [...element.classList]
  if (classList.includes("active")){
    element.classList = ["square"];
    bingoState[h][w] = 0; 
  }
  else {
    element.classList.add("active");
    bingoState[h][w] = 1;
  }
  let isBingo = checkBingo();
  console.log("bingo:",isBingo);
  if (isBingo) {
    wonBingo()
  } 
}
function initTable(width, height) {
  const bingoTable = document.getElementById("bingo_table");
  bingoState = []
  for (let h = 0; h < height; h++) {
    bingoState[h] = [];
    const tr = document.createElement("tr");
    for (let w = 0; w < width; w++) {
      bingoState[h][w] = 0;
      const td = document.createElement("td");
      td.classList = ["square"];
      td.addEventListener( "click", function(e) {
          selectCell(this);
      });
      td.id = `cell_${h}_${w}`
      tr.appendChild(td);
    }
    bingoTable.appendChild(tr);
  }
}
function checkBingo() {
  let columnCounter = new Array(WIDTH);
  for (let w = 0; w < WIDTH; w++) {
    columnCounter[w] = 0;

  }
  let verticalCounter = 0;
  let reverseVerticalCounter = 0;
  for (let h = 0; h < HEIGHT; h++) {
    let rowCounter = 0;
    for (let w = 0; w < WIDTH; w++) {
      if (bingoState[h][w] == 1){
        rowCounter++;
        columnCounter[w] += bingoState[h][w];
        if (h == w) {
          verticalCounter++;
        }
        if (h + w == HEIGHT - 1) {
          reverseVerticalCounter++;
        }
      }
    }
    if (rowCounter == WIDTH) {
      return true;
    }
  }
  if (verticalCounter == HEIGHT) {
    return true;
  }
  if (reverseVerticalCounter == HEIGHT) {
    return true;
  }
  for (let w = 0; w < WIDTH; w++) {
    if (columnCounter[w] == HEIGHT) {
      return true;
    }
  }
  return false
}
function wonBingo() {
  const modalBg = document.querySelector('.modal-bg')
  if (isBingo = true) {
    modalBg.classList.add('bg-active')
  }
}
function refreshThePage() {
  location.reload();
}
function closeModal() {
  const modalBg = document.querySelector('.modal-bg');
  modalBg.classList = ["modal-bg"];
}
