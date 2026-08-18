let proName = document.getElementById("proName");
let proPrice = document.getElementById("proPrice");
let proDesc = document.getElementById("proDesc");
let proCat = document.getElementById("proCat");
let addBtn = document.getElementById("addBtn");
let search = document.getElementById("proSearch");
let currentIndex;
let productscontainer = [];
let categories = document.getElementById("categories");
let total= document.getElementById("totalValue");
let products = document.getElementById("products");

[proName, proPrice, proCat, proDesc].forEach(function (input) {
  input.addEventListener("input", function () {
    document.getElementById("error-msg").classList.add("d-none");
  });
});

if (localStorage.getItem("products") !== null) {
  productscontainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
  productsLength(productscontainer);
  totalValue(productscontainer);
  categoriesLength(productscontainer);
} else {
  productscontainer = [];
}

function add() {
  if (!validateProduct()) {
    document.getElementById("error-msg").classList.remove("d-none");
    return;
  } else {
    document.getElementById("error-msg").classList.add("d-none");
  }
  if (addBtn.innerHTML === "update Product") {
    editprocut();
  } else {
    addProduct();
  }
}

function productsLength(arr) {
  products.innerHTML = arr.length;
}

function categoriesLength(arr) {
  let category = [];
  for (let i = 0; i < arr.length; i++) {
    if (category.indexOf(arr[i].cat) === -1) {
      category.push(arr[i].cat);
    }
  }
  categories.innerHTML = category.length;
}

function totalValue(arr) {
  let tolalPrice = 0;
  for (let i = 0; i < arr.length; i++) {
    tolalPrice += Number(arr[i].price);
  }
  total.innerHTML = `$${tolalPrice}`;
}

function addProduct() {
  let product = {
    name: proName.value,
    price: proPrice.value,
    desc: proDesc.value,
    cat: proCat.value,
  };
  //   console.log(product);
  productscontainer.push(product);
  //   console.log(productscontainer);
  localStorage.setItem("products", JSON.stringify(productscontainer));
  clearProducts();
  displayProducts();
  productsLength(productscontainer);
  totalValue(productscontainer);
  categoriesLength(productscontainer);
}

function clearProducts() {
  proName.value = "";
  proPrice.value = "";
  proDesc.value = "";
  proCat.value = "";
}

function displayProducts() {
  let data = "";
  for (let i = 0; i < productscontainer.length; i++) {
    data += `<tr>
        <td>${i + 1}</td>
        <td>${productscontainer[i].name}</td>
        <td>${productscontainer[i].price}</td>
        <td>${productscontainer[i].cat}</td>
        <td>${productscontainer[i].desc}</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = data;
}

function deleteProduct(index) {
  productscontainer.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productscontainer));
  displayProducts();
  productsLength(productscontainer);
  totalValue(productscontainer);
  categoriesLength(productscontainer);
}

function updateProduct(index) {
  currentIndex = index;
  proName.value = productscontainer[index].name;
  proPrice.value = productscontainer[index].price;
  proDesc.value = productscontainer[index].desc;
  proCat.value = productscontainer[index].cat;
  addBtn.innerHTML = "update Product";
}

function editprocut() {
  productscontainer[currentIndex].name = proName.value;
  productscontainer[currentIndex].price = proPrice.value;
  productscontainer[currentIndex].desc = proDesc.value;
  productscontainer[currentIndex].cat = proCat.value;
  clearProducts();
  addBtn.innerHTML = "Add Product";
  localStorage.setItem("products", JSON.stringify(productscontainer));
  displayProducts();
  productsLength(productscontainer);
  totalValue(productscontainer);
  categoriesLength(productscontainer);
}

search.addEventListener("input", function () {
  let trim = search.value;
  searchProduct(trim);
});

function searchProduct(trim) {
  let tableData = "";
  for (let i = 0; i < productscontainer.length; i++) {
    if (productscontainer[i].name.toLowerCase().includes(trim.toLowerCase())) {
      tableData += `
        <tr>
            <td>${i}</td>
            <td>${productscontainer[i].name}</td>
            <td>${productscontainer[i].price}</td>
            <td>${productscontainer[i].cat}</td>
            <td>${productscontainer[i].desc}</td>
            <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
          </tr>
        `;
    }
  }
  document.getElementById("tableBody").innerHTML = tableData;
}

function validateProduct() {
  if (
    proName.value.trim() === "" ||
    proPrice.value.trim() === "" ||
    proCat.value.trim() === "" ||
    proDesc.value.trim() === ""
  ) {
    return false;
  } 
  return true;
}

addBtn.addEventListener("click", function () {
  add();
});
