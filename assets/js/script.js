// ==========================================
// DOM Element Selectors
// ==========================================
let proName = document.getElementById("proName");
let proPrice = document.getElementById("proPrice");
let proDesc = document.getElementById("proDesc");
let proCat = document.getElementById("proCat");
let addBtn = document.getElementById("addBtn");
let search = document.getElementById("proSearch");
let categories = document.getElementById("categories");
let total = document.getElementById("totalValue");
let products = document.getElementById("products");

let currentIndex;
let productscontainer = [];

// Hide validation error message when user types in any input field
[proName, proPrice, proCat, proDesc].forEach(function (input) {
  input.addEventListener("input", function () {
    document.getElementById("error-msg").classList.add("d-none");
  });
});

// ==========================================
// LocalStorage Initialization
// ==========================================
// Load saved products from LocalStorage on page load
if (localStorage.getItem("products") !== null) {
  productscontainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
  productsLength(productscontainer);
  totalValue(productscontainer);
  categoriesLength(productscontainer);
} else {
  productscontainer = [];
}

// ==========================================
// Main Action Handler (Add / Edit Router)
// ==========================================
// Check validation and decide whether to add a new product or edit an existing one
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

// ==========================================
// Statistics & Counter Functions
// ==========================================
// Update total products count badge
function productsLength(arr) {
  if (arr.length === 0) arr = [];
  products.innerHTML = arr.length;
}

// Calculate and display unique categories count
function categoriesLength(arr) {
  let category = [];
  for (let i = 0; i < arr.length; i++) {
    if (category.indexOf(arr[i].cat) === -1) {
      category.push(arr[i].cat);
    }
  }
  if (category.length === 0) category = [];
  categories.innerHTML = category.length;
}

// Calculate and display total price sum
function totalValue(arr) {
let totalPrice = arr.reduce((acc, item) => acc + Number(item.price || 0), 0);
  total.innerHTML = `$${totalPrice.toFixed(2)}`;
}

// ==========================================
// CRUD Operations
// ==========================================
// Add a new product
function addProduct() {
  let product = {
    name: proName.value,
    price: proPrice.value,
    desc: proDesc.value,
    cat: proCat.value,
  };

  productscontainer.push(product);
  localStorage.setItem("products", JSON.stringify(productscontainer));

  clearProducts();
  displayProducts();
  productsLength(productscontainer);
  totalValue(productscontainer);
  categoriesLength(productscontainer);
}

// Clear input form fields
function clearProducts() {
  proName.value = "";
  proPrice.value = "";
  proDesc.value = "";
  proCat.value = "";
}

// Render all products into the table body
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

// Delete a product by index
function deleteProduct(index) {
  productscontainer.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productscontainer));
  displayProducts();
  productsLength(productscontainer);
  totalValue(productscontainer);
  categoriesLength(productscontainer);
}

// Populate form fields with selected product data for editing
function updateProduct(index) {
  currentIndex = index;
  proName.value = productscontainer[index].name;
  proPrice.value = productscontainer[index].price;
  proDesc.value = productscontainer[index].desc;
  proCat.value = productscontainer[index].cat;
  addBtn.innerHTML = "update Product";
}

// Save updated product details
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

// ==========================================
// Search & Validation
// ==========================================
// Live search input listener
search.addEventListener("input", function () {
  let trim = search.value;
  searchProduct(trim);
});

// Filter products table by product name
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

// Validate that no inputs are empty
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

// Trigger main add/edit function on button click
addBtn.addEventListener("click", function () {
  add();
});