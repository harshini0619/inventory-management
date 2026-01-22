// 5 DEFAULT ITEMS
let inventory = [
  { name: "Rice", quantity: 50, minLevel: 10 },
  { name: "Sugar", quantity: 120, minLevel: 5 },
  { name: "Wheat", quantity: 0, minLevel: 6 },
  { name: "Oil", quantity: 15, minLevel: 5 },
  { name: "Ghee", quantity: 70, minLevel: 7 }
];

// RENDER TABLE
function renderTable() {
  const table = document.getElementById("inventoryTable");
  table.innerHTML = "";

  inventory.forEach((item, index) => {
    const status = item.quantity < item.minLevel ? "LOW STOCK" : "OK";
    const statusClass = status === "LOW STOCK" ? "low" : "ok";

    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.minLevel}</td>
        <td class="${statusClass}">${status}</td>
        <td>
          <input type="number" id="qty-${index}" placeholder="Qty">
          <button onclick="stockIn(${index})">IN</button>
          <button onclick="stockOut(${index})">OUT</button>
          <button onclick="deleteItem(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// STOCK IN (Bulk Add)
function stockIn(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  if (isNaN(qty) || qty <= 0) {
    alert("Enter valid quantity");
    return;
  }
  inventory[index].quantity += qty;
  renderTable();
}

// STOCK OUT (Bulk Reduce)
function stockOut(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  if (isNaN(qty) || qty <= 0) {
    alert("Enter valid quantity");
    return;
  }
  if (inventory[index].quantity < qty) {
    alert("Not enough stock available");
    return;
  }
  inventory[index].quantity -= qty;
  renderTable();
}

// DELETE ITEM
function deleteItem(index) {
  inventory.splice(index, 1);
  renderTable();
}

// ADD NEW PRODUCT (6th, 7th, ...)
function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const min = parseInt(document.getElementById("minLevel").value);

  if (name === "" || isNaN(min)) {
    alert("Enter valid product name and minimum level");
    return;
  }

  inventory.push({
    name: name,
    quantity: 0,
    minLevel: min
  });

  document.getElementById("productName").value = "";
  document.getElementById("minLevel").value = "";

  renderTable();
}

// INITIAL LOAD
renderTable();
