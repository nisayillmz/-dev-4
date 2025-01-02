const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error(error);
  }
};

const displayProducts = (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Fiyat: $${product.price}</p>
        <button id="add-to-cart-${index})">Sepete Ekle</button>`;
    productList.appendChild(productDiv);

    const button = document.getElementById(`add-to-cart-${index}`);
    button.addEventListener("click", () => {
      showProductModal(product.title, product.price, product.image);
    });
  });
};

const showProductModal = (title, price, image) => {
  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button" onclick="closeModal(this)">&times;</span>
      <img src="${image}" alt="${title}" class="modal-image">
      <h3>${title}</h3>
      <p>Fiyat: $${price}</p>
      <button onclick="addToCart('${title}', ${price}, '${image}')">Sepete Ekle</button>
    </div>`;

  document.body.appendChild(modal);
};

const closeModal = (button) => {
  const modal = button.closest(".modal");
  modal.remove();
};

const cart = [];

const addToCart = (title, price, image) => {
  const cartItemsList = document.getElementById("cart-items");

  cart.push({ title, price, image });

  updateCartDisplay(cartItemsList);
  document.querySelector(".modal").remove();
};

const updateCartDisplay = (cartItemsList) => {
  cartItemsList.innerHTML = "";

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        ${item.title} - $${item.price}
      `;
    cartItemsList.appendChild(listItem);
  });
};

window.onload = fetchProducts;