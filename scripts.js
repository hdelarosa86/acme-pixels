const addRow = document.querySelector('#addRow');
const removeRow = document.querySelector('#removeRow');
const addColumn = document.querySelector('#addColumn');
const removeColumn = document.querySelector('#removeColumn');
const colorContainerChildren = [
  ...document.querySelector('.colorContainer').children,
];
const red = document.querySelector('#red');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');
const yellow = document.querySelector('#yellow');
const cyan = document.querySelector('#cyan');

const render = (template, node) => {
  node.innerHTML += template;
};

// const generateN = n => {
//   for (let i = 0; i < n; i++) {
//     render(`<div id="row-${i + 1}"></div>`, document.querySelector('#grid'));
//     const row = document.querySelector(`#row-${i + 1}`);
//     for (let j = 0; j < n; j++) {
//       render(`<div class="cells"></div>`, row);
//     }
//   }
// };

//generateN(5);

let color;
colorContainerChildren.forEach(ele => {
  ele.addEventListener('click', ev => {
    colorContainerChildren.forEach(ele => {
      ele.style.border = '0';
    });
    ev.target.style.border = '1px solid black';
    color = ev.target.id;
  });
});

let cells = document.querySelectorAll('.cells');
cells.forEach(ele => [
  ele.addEventListener('click', ev => {
    ev.target.style.backgroundColor = color;
  }),
]);

// addRow.addEventListener('click', ev => {
//   const node = document.querySelector('#grid').lastElementChild;
//   const cloneNode = node.cloneNode(true);
//   [...cloneNode.children].forEach(ele => {
//     ele.style.backgroundColor = '';
//   });
//   document.querySelector('#grid').appendChild(cloneNode);
//   cells = document.querySelectorAll('.cells');
//   console.log(cells);
// });
// removeRow.addEventListener('click', ev => {
//   document.querySelector('#grid').lastElementChild.remove();
// });

// addColumn.addEventListener('click', ev => {

// });
// removeColumn.addEventListener('click', ev => {

// });
const generateNxN = n => {
  let arr = [];
  for (let row = 0; row < n; row++) {
    arr.push([]);
    for (let j = 0; j < n; j++) {
      arr[row].push(`<div class="cells" style="background-color:"></div>`);
    }
  }
  return arr;
};

const arrGrid = generateNxN(5);
const generateHTMLGrid = arr => {
  document.querySelector(`#grid`).innerHTML = '';
  for (let row = 0; row < arr.length; row++) {
    render(`<div></div>`, document.querySelector(`#grid`));
    const rowContainer = document.querySelector(`#grid`).lastElementChild;
    for (let column = 0; column < arr[row].length; column++) {
      render(arr[row][column], rowContainer);
    }
  }
};
generateHTMLGrid(arrGrid);

addRow.addEventListener('click', ev => {
  arrGrid.push([]);
  for (let column = 0; column < arrGrid[0].length; column++) {
    arrGrid[arrGrid.length - 1].push(
      `<div class="cells" style="background-color:"></div>`
    );
  }
  generateHTMLGrid(arrGrid);
});
removeRow.addEventListener('click', ev => {
  if (arrGrid.length > 0) {
    document.querySelector('#grid').lastElementChild.remove();
    arrGrid.pop();
  } else {
    removeRow.setAttribute('disabled', '');
  }
});

addColumn.addEventListener('click', ev => {
  arrGrid.forEach(row => {
    row.push(`<div class="cells" style="background-color:"></div>`);
  });
  generateHTMLGrid(arrGrid);
});
removeColumn.addEventListener('click', ev => {
  arrGrid.forEach(row => {
    row.pop();
  });
  generateHTMLGrid(arrGrid);
});
