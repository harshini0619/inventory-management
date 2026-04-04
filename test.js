const {
  inventory,
  stockIn,
  stockOut,
  deleteItem,
  addProduct
} = require('./script');

let failed = false;

// ASSERT FUNCTION
function assert(condition, message) {
  if (condition) {
    console.log("✅ PASS:", message);
  } else {
    console.log("❌ FAIL:", message);
    failed = true;
  }
}

console.log("----- RUNNING TEST CASES -----");

// TEST 1
assert(inventory.length === 5, "Initial inventory has 5 items");

// TEST 2
addProduct("TestItem", 5);
assert(inventory.length === 6, "Product added successfully");

// TEST 3
let prevQty = inventory[0].quantity;
stockIn(0, 10);
assert(inventory[0].quantity === prevQty + 10, "Stock In works");

// TEST 4
prevQty = inventory[0].quantity;
stockOut(0, 5);
assert(inventory[0].quantity === prevQty - 5, "Stock Out works");

// TEST 5
let result = stockOut(0, 10000);
assert(result === false, "Prevents over-removal");

// TEST 6
let prevLength = inventory.length;
deleteItem(0);
assert(inventory.length === prevLength - 1, "Delete item works");

console.log("----- TESTING COMPLETED -----");

// 🔴 IMPORTANT FOR JENKINS
if (failed) {
  console.log("Some tests FAILED");
  process.exit(1);
} else {
  console.log("All tests PASSED");
}