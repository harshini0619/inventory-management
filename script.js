// 5 DEFAULT ITEMS
let inventory = [
  { name: "Rice", quantity: 50, minLevel: 10 },
  { name: "Sugar", quantity: 120, minLevel: 5 },
  { name: "Wheat", quantity: 0, minLevel: 6 },
  { name: "Oil", quantity: 15, minLevel: 5 },
  { name: "Ghee", quantity: 70, minLevel: 7 }
];

// RENDER TABLE (browser only)
function renderTable() {
  if (typeof document === "undefined") return;

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

// STOCK IN
function stockIn(index, qty = null) {
  if (qty === null && typeof document !== "undefined") {
    qty = parseInt(document.getElementById(`qty-${index}`).value);
  }

  if (isNaN(qty) || qty <= 0) return false;

  inventory[index].quantity += qty;
  renderTable();
  return true;
}

// STOCK OUT
function stockOut(index, qty = null) {
  if (qty === null && typeof document !== "undefined") {
    qty = parseInt(document.getElementById(`qty-${index}`).value);
  }

  if (isNaN(qty) || qty <= 0) return false;
  if (inventory[index].quantity < qty) return false;

  inventory[index].quantity -= qty;
  renderTable();
  return true;
}

// DELETE ITEM
function deleteItem(index) {
  inventory.splice(index, 1);
  renderTable();
  return true;
}

// ADD PRODUCT
function addProduct(name = null, min = null) {
  if (typeof document !== "undefined" && name === null) {
    name = document.getElementById("productName").value.trim();
    min = parseInt(document.getElementById("minLevel").value);
  }

  if (!name || isNaN(min)) return false;

  inventory.push({
    name: name,
    quantity: 0,
    minLevel: min
  });

  if (typeof document !== "undefined") {
    document.getElementById("productName").value = "";
    document.getElementById("minLevel").value = "";
  }

  renderTable();
  return true;
}

// INITIAL LOAD
renderTable();

// EXPORT (IMPORTANT)
module.exports = {
  inventory,
  stockIn,
  stockOut,
  deleteItem,
  addProduct
};