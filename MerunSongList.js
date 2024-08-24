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
}

function filterRows() {
  const keyword = document.querySelector('input').value;
  const regex = new RegExp(keyword, 'i');
  const table = document.querySelector('table');
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    row.style.display = 'none';
    for (let j = 0; j < row.cells.length; j++) {
      if (row.cells[j].textContent.match(regex)) {
        row.style.display = 'table-row';
        break;
      }
    }
  }
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

function changerowColor(){
  const table = document.querySelector("table");
  let count = 0;
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    if (row.style.display == 'none') continue;
    if (count%2 == 0) row.style.backgroundColor = '#ffc0cb';
    else row.style.backgroundColor = '#fffafa';
    count++;
  }
}
