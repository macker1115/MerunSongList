initialize();

function initialize() {
  const table = document.querySelector('table');
  const tableParent = table.parentElement;

  const input = document.querySelector('input');
  input.addEventListener('keypress', () => {
    if (event.key === 'Enter') filterRows();
  });

  document.querySelectorAll('th').forEach(th => th.onclick = sortRows);
  document.querySelector('th').classList.add('sort-asc');
  hitCount();
}

function filterRows() {
  const keyword = document.querySelector('#word').value;
  const regex = new RegExp(keyword, 'i');
  const table = document.querySelector('table');
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    row.classList.add('displayNone');
    for (let j = 0; j < row.cells.length; j++) {
      if (row.cells[j].textContent.match(regex)) {
        row.classList.remove('displayNone');
        break;
      }
    }
  }
  if (document.querySelector('#distinct').checked) {
    distinctRows()
  }
  hitCount();
  changerowColor();
}

function resetFilter() {
  document.querySelector('input').value = '';
  filterRows();
}

function sortRows() {
  const table = document.querySelector("table");
  const records = [];
  for (let i = 1; i < table.rows.length; i++) {
    const record = {};
    record.row = table.rows[i];
    record.key = table.rows[i].cells[this.cellIndex].textContent;
    records.push(record);
  }
  if (this.classList.contains('sort-asc')) {
    records.sort(compareKeysReverse);
    purgeSortMarker();
    this.classList.add('sort-desc');
  } else {
    records.sort(compareKeys);
    purgeSortMarker();
    this.classList.add('sort-asc');
  }
  for (let i = 0; i < records.length; i++) {
    table.appendChild(records[i].row);
  }
  changerowColor();
}

function purgeSortMarker() {
  document.querySelectorAll('th').forEach(th => {
    th.classList.remove('sort-asc');
    th.classList.remove('sort-desc');
  });
}

function compareKeys(a, b) {
  if (a.key < b.key) return -1;
  if (a.key > b.key) return 1;
  return 0;
}

function compareKeysReverse(a, b) {
  if (a.key < b.key) return 1;
  if (a.key > b.key) return -1;
  return 0;
}

function changerowColor() {
  const table = document.querySelector("table");
  let count = -1;
  for (let row of table.rows) {
    if (count >= 0) {
      if (row.classList.contains('displayNone')) continue;
      if (count % 2 == 0) {
        for (let cell of row.cells) cell.style.backgroundColor = '#ffc0cb';
      }
      else {
        for (let cell of row.cells) cell.style.backgroundColor = '#fffafa';
      }
    }
    count++;
  }
}

function tagSearch(word) {
  document.querySelector('input').value = word;
  filterRows();
}

function distinctRows() {
  const table = document.querySelector('table');
  const titles = [];
  const indexList = [];
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    if (row.classList.contains('displayNone')) continue;
    row.classList.add('displayNone');
    if (!titles.includes(row.cells[1].textContent)) {
      titles.push(row.cells[1].textContent);
      indexList.push([row.cells[1].textContent, row.cells[0].textContent, i]);
      row.classList.remove('displayNone');
    } else if (parseInt(indexList.filter(el => el[0] == row.cells[1].textContent)[0][1]) < parseInt(row.cells[0].textContent)) {
      const old = indexList.filter(el => el[0] == row.cells[1].textContent)[0];
      table.rows[parseInt(old[2])].classList.add('displayNone');
      const index = indexList.indexOf(old);

      indexList[index] = [row.cells[1].textContent, row.cells[0].textContent, i];
      row.classList.remove('displayNone');
    }
  }
}

function hitCount() {
  const table = document.querySelector('table');
  var hitList = table.querySelectorAll('tr:not(.displayNone)')
  if (!document.querySelector('.jp').classList.contains('displayNone')) {
    document.querySelector('#hit').textContent = (hitList.length - 1) + '件表示';
  } else if (!document.querySelector('.en').classList.contains('displayNone')) {
    document.querySelector('#hit').textContent = (hitList.length - 1) + ' hits';
  }
}

function changeLanguage(lang) {
  if (lang == 'jp') {
    document.querySelectorAll('.en').forEach((elem) => { elem.classList.add('displayNone') });
    document.querySelectorAll('.jp').forEach((elem) => { elem.classList.remove('displayNone') });
    document.querySelectorAll('tr td:nth-child(3)').forEach((elem) => { elem.classList.add('ellipsis') });
    document.querySelectorAll('tr td:nth-child(7)').forEach((elem) => { elem.classList.add('ellipsis') });
  } else if (lang == 'en') {
    document.querySelectorAll('.jp').forEach((elem) => { elem.classList.add('displayNone') });
    document.querySelectorAll('.en').forEach((elem) => { elem.classList.remove('displayNone') });
    document.querySelectorAll('tr td:nth-child(3)').forEach((elem) => { elem.classList.remove('ellipsis') });
    document.querySelectorAll('tr td:nth-child(7)').forEach((elem) => { elem.classList.remove('ellipsis') });
  }

}