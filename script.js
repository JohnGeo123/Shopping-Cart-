const productForm = document.getElementById('productForm');
const shoppingCart = document.getElementById('shoppingCart');
const tbody = shoppingCart.querySelector('tbody');


function addProduct() {
  const productName = document.getElementById('productName').value;
  const productQuantity = document.getElementById('productQuantity').value;

  // Validare
  if (!productName || productQuantity <= 0) {
    alert('Numele produsului trebuie sa fie nevid, iar cantitatea trebuie sa fie un numar pozitiv.');
    return;
  }


  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${productName}</td>
    <td>${productQuantity}</td>
    <td>
      <button onclick="updateQuantity(this, -1)">-</button>
      <button onclick="updateQuantity(this, 1)">+</button>
      <button onclick="removeProduct(this)">Sterge</button>
    </td>
  `;
  tbody.appendChild(newRow);

  saveShoppingCart();
  productForm.reset();
}


function updateQuantity(button, change) {
  const quantityCell = button.parentNode.previousElementSibling;
  let quantity = parseInt(quantityCell.textContent);
  quantity += change;
  if (quantity <= 0) {
    removeProduct(button);
  } else {
    quantityCell.textContent = quantity;
    saveShoppingCart();
  }
}


function removeProduct(button) {
  button.parentNode.parentNode.remove();
  saveShoppingCart();
}


function saveShoppingCart() {
  const cartItems = [];
  tbody.querySelectorAll('tr').forEach(row => {
    const productName = row.cells[0].textContent;
    const productQuantity = parseInt(row.cells[1].textContent);
    cartItems.push({ productName, productQuantity });
  });
  localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}


function loadShoppingCart() {
  const savedCart = localStorage.getItem('shoppingCart');
  if (savedCart) {
    const cartItems = JSON.parse(savedCart);
    cartItems.forEach(item => {
      addProduct(item.productName, item.productQuantity);
    });
  }
}

loadShoppingCart();