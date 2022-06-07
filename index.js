const colorPicker = document.getElementById("colorPicker");
const clear = document.querySelector(".clear");
const main = document.querySelector(".main");
const addColumns = document.getElementById("addColumns");
const minusColumns = document.getElementById("minusColumns");
const addRows = document.getElementById("addRows");
const minusRows = document.getElementById("minusRows");
const pixelSize = document.getElementById("pixelSize");
const generatedCode = document.getElementById("output");
let currentColor = colorPicker.value;
let codeOutput = [];
let tempArr = [];
let point;
let rows;
let columns;
let numBoxes;

generatedCode.innerHTML = "box-shadow: " + codeOutput;

let defaultGrid = (function () {
  rows = 10;
  columns = 10;
  numBoxes = columns * rows;
  main.style.width = columns * 10;
  main.style.height = rows * 10;
  main.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
  main.style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
  for (var i = 0; i < numBoxes; i++) {
    addElement();
  }
})();

pixelSize.addEventListener("input", () => {
  point = document.querySelectorAll(".point");
  //console.log(pixelSize.value + "px")
  //console.log(main.offsetWidth)
  let confirmBoxes = true;
  for (let i = 0; i < point.length; i++) {
    if (point[i].getAttribute("clicked") === "true") {
      if (
        confirm("Changing the pixel size will erase your current drawing") ===
        true
      ) {
        point[i].setAttribute("clicked", false);
        confirmBoxes = true;
        break;
      } else {
        confirmBoxes = false;
        break;
      }
    } else if (point[i].getAttribute("clicked") === "false") {
      confirmBoxes = true;
    } else {
      confirmBoxes = false;
    }
  }
  if (confirmBoxes === true) {
    erase();
    for (let i = 0; i < point.length; i++) {
      point[i].style.height = pixelSize.value + "px";
      point[i].style.width = pixelSize.value + "px";
    }
  }
});

function addElement() {
  var element = document.createElement("div");
  element.style.height = pixelSize.value + "px";
  element.style.width = pixelSize.value + "px";
  element.classList.add("point");
  element.setAttribute("x", element.offsetLeft);
  element.setAttribute("y", element.offsetTop);
  element.setAttribute("clicked", false);
  main.appendChild(element);
  point = document.querySelectorAll(".point");
  point.forEach(function (e, i) {
    return e.setAttribute("index", i);
  });

  element.onclick = () => {
    element.style.backgroundColor = colorPicker.value;
    element.setAttribute("clicked", true);
    element.setAttribute("x", element.offsetLeft);
    element.setAttribute("y", element.offsetTop);
    //console.log(element)
    tempArr.push({
      //x: element.offsetLeft,
      //y: element.offsetTop,
      index: element.getAttribute("index"),
      value:
        element.offsetLeft +
        10 +
        "px " +
        (element.offsetTop + 10) +
        "px" +
        " 0px 0px",
      color: colorPicker.value
    });

    var valueArr = tempArr.map(function (item) {
      //console.log(item)
      return item.index;
    });

    var isDuplicate = valueArr.some(function (item, idx) {
      //console.log(valueArr, item, valueArr.indexOf(item), idx)
      if (valueArr.indexOf(item) != idx) {
        tempArr[valueArr.indexOf(item)].color = colorPicker.value;
        tempArr.splice(idx, 1);
        //console.log(tempArr)
        //codeOutput.push(valueArr);
        //console.log(codeOutput);
      } //console.log(tempArr)
      //return valueArr.indexOf(item) != idx
    });

    codeOutput = tempArr.map(function (e, i, a) {
      return e.value + " " + e.color;
    });
    generatedCode.innerHTML = "box-shadow: " + codeOutput;
  };
}

addColumns.onclick = function () {
  point = document.querySelectorAll(".point");
  let confirmBoxes = true;
  for (let i = 0; i < point.length; i++) {
    if (point[i].getAttribute("clicked") === "true") {
      if (confirm("Adding rows will remove your current drawing") === true) {
        point[i].setAttribute("clicked", false);
        confirmBoxes = true;
        break;
      } else {
        confirmBoxes = false;
        break;
      }
    } else if (point[i].getAttribute("clicked") === "false") {
      confirmBoxes = true;
    } else {
      confirmBoxes = false;
    }
  }
  if (confirmBoxes === true) {
    erase();
    columns++;
    for (var i = 0; i < rows; i++) {
      addElement();
    }
    main.style.width = columns * 10;
    main.style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
    console.log(columns, point.length);
  }
};

addRows.onclick = function () {
  point = document.querySelectorAll(".point");
  let confirmBoxes = true;
  for (let i = 0; i < point.length; i++) {
    if (point[i].getAttribute("clicked") === "true") {
      if (confirm("Adding rows will remove your current drawing") === true) {
        point[i].setAttribute("clicked", false);
        confirmBoxes = true;
        break;
      } else {
        confirmBoxes = false;
        break;
      }
    } else if (point[i].getAttribute("clicked") === "false") {
      confirmBoxes = true;
    } else {
      confirmBoxes = false;
    }
  }
  if (confirmBoxes === true) {
    erase();
    rows++;
    for (var i = 0; i < columns; i++) {
      addElement();
    }
    main.style.width = rows * 10;
    main.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
    console.log(rows, point.length);
  }
};

minusColumns.onclick = function () {
  point = document.querySelectorAll(".point");
  let confirmBoxes = true;
  for (let i = 0; i < point.length; i++) {
    if (point[i].getAttribute("clicked") === "true") {
      if (confirm("Adding rows will remove your current drawing") === true) {
        point[i].setAttribute("clicked", false);
        confirmBoxes = true;
        break;
      } else {
        confirmBoxes = false;
        break;
      }
    } else if (point[i].getAttribute("clicked") === "false") {
      confirmBoxes = true;
    } else {
      confirmBoxes = false;
    }
  }
  if (confirmBoxes === true) {
    erase();
    columns--;
    for (var i = rows; i > 0; i--) {
      point = document.querySelectorAll(".point");
      point[i].remove();
    }
    main.style.width = columns * 10;
    main.style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
    console.log(columns, point.length);
  }
};

minusRows.onclick = function () {
  point = document.querySelectorAll(".point");
  let confirmBoxes = true;
  for (let i = 0; i < point.length; i++) {
    if (point[i].getAttribute("clicked") === "true") {
      if (confirm("Adding rows will remove your current drawing") === true) {
        point[i].setAttribute("clicked", false);
        confirmBoxes = true;
        break;
      } else {
        confirmBoxes = false;
        break;
      }
    } else if (point[i].getAttribute("clicked") === "false") {
      confirmBoxes = true;
    } else {
      confirmBoxes = false;
    }
  }
  if (confirmBoxes === true) {
    erase();
    rows--;
    for (var i = columns; i > 0; i--) {
      point = document.querySelectorAll(".point");
      point[i].remove();
    }
    main.style.height = rows * 10;
    main.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
    console.log(rows, point.length);
  }
};

function erase() {
  point = document.querySelectorAll(".point");
  point.forEach((element, index) => {
    element.style.backgroundColor = null;
    element.style.border = "solid 1px black";
    element.setAttribute("clicked", false);
  });
  codeOutput = [];
  tempArr = [];
  generatedCode.innerHTML = "box-shadow: " + codeOutput;
  console.clear();
}

clear.onclick = function () {
  point = document.querySelectorAll(".point");
  let confirmBoxes = true;
  for (let i = 0; i < point.length; i++) {
    if (point[i].getAttribute("clicked") === "true") {
      if (confirm("This will remove your current drawing") === true) {
        point[i].setAttribute("clicked", false);
        confirmBoxes = true;
        break;
      } else {
        confirmBoxes = false;
        break;
      }
    } else if (point[i].getAttribute("clicked") === "false") {
      confirmBoxes = true;
    } else {
      confirmBoxes = false;
    }
  }
  if (confirmBoxes === true) {
    erase();
  }
};
