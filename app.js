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

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
        <img class="" src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Fiyat: $${product.price}</p>
        <button onclick="addToCart('${product.title}', ${product.price}, '${product.image}')">Sepete Ekle</button>`;
    productList.appendChild(productDiv);
  });
};

const cart = [];

const addToCart = (title, price, image) => {
  const cartItemsList = document.getElementById("cart-items");

  cart.push({ title, price, image });

  updateCartDisplay(cartItemsList);
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
