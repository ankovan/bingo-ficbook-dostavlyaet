const statements = [
  "Омегаверс", "Красный, как помидор", "Эвфемизмы", "Секс на N-дцат часов", "Флешбеки", "Кроссовер", "Избранный", 
  'Неожиданная смена пола ("сказал" -> "сказала")', "«Конец» в конце", 
  "Гейство", "Тупо повседневность", "Смайлики/Необычные символы", "Любовь с первого изнасилования", 
  "Извините, если есть ошибки", "Много многоточий", "Бедная нутрия!",
  "Несовершеннолетний(-яя)  живёт один(а)", "Пробелы перед знаками препинания",
  "КАПС", "Описание локации в одно слово", "POV", "Измены", "Называть героев «-глазка», «-волоска»",
  "Шмот/Лук/Было надето", "Точное время", "***", "Кубики/Пресс", "Комментарии автора в скобочках",
  "Мери Сью", "В ШОКЕ", "Точка в названии фанфика", "ГГ младше 18", "«Гибрид/Полукровка»",
  "Водные процедуры", "Родители умерли/уехали", "Т/и", 'Приставка "з"',
  "Новенький(ая) в школе", "ГГ — это автор", "Лицо повествования меняется", "Ввод персонажа постредством столкновения с ГГ",
  "В конце главы все отправляются спать", "Рост/вес персонажей", "НА РУЧКИ!",
  "Углубить поцелуй", "ИНГЛИШ", "Запятые не нужны", "Боксёры", "Первый раз",
  "... часть", "Мой первый фф, не судите строго", "Описание персонажей вначале", "Диалоги вида: первая буква имени и двоеточие", " Попытка в графоманию (провальная)", "Худи и/или оверсайз",
  "*Мысли* (в звездочках)", "Клиффхэнгеры", "Попаданец", "ТРОЯ", "Фанфик для Роскомнадзора"
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
  let postageStampCounter = 0;
  let outsideDiamondCounter = 0;
  let insideDiamondCounter = 0;
  let fourCorner = 0;
  let insideFourCorner = 0;
  let mid = (HEIGHT-1)/2;
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
        if (h < 2 && w >= WIDTH -2) {
          postageStampCounter++;
        }
        if (
          (h == 0 && w == mid)
          || (h == mid && (w == 0 || w == WIDTH -1))
          || (h == HEIGHT - 1 && w == mid)
        ){
          outsideDiamondCounter++;
        }
        if (
          (h == 1 && w == mid)
          || (h == mid && (w == 1 || w == WIDTH -2))
          || (h == HEIGHT - 2 && w == mid)
        ){
          insideDiamondCounter++;
        }
        if (
          (w == 0 && (h == 0 || h == HEIGHT-1))
          || (w == WIDTH-1 && (h == 0 || h == HEIGHT-1))
        ) {
          fourCorner++;
        }
        if (
          (w == mid - 1 && (h == mid -1 || h == mid + 1))
          || (w == mid + 1 && (h == mid - 1 || h == mid + 1))
        ) {
          insideFourCorner++;
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
  if (postageStampCounter == 4) {
    return true;
  }
  if (outsideDiamondCounter == 4) {
    return true;
  }
  if (insideDiamondCounter == 4) {
    return true;
  }
  if (fourCorner == 4) {
    return true;
  }
  if (insideFourCorner == 4) {
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
  const modalBg = document.querySelector('.modal-bg.bingo-win')
  if (isBingo = true) {
    modalBg.classList.add('bg-active')
  }
}
function refreshThePage() {
  location.reload();
}
function closeModal() {
  const modalBg = document.querySelector('.modal-bg.bingo-win');
  modalBg.classList = ["modal-bg"];
  modalBg.classList.add('bingo-win');
}
function showInfo() {
  const modalBg = document.querySelector('.modal-bg.info')
  modalBg.classList.add('bg-active')
}
function closeInfo() {
  const modalBg = document.querySelector('.modal-bg.info');
  modalBg.classList = ["modal-bg"];
  modalBg.classList.add('info');
}