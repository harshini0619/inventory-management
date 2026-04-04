const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function inventoryTest() {

    let options = new chrome.Options();
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('http://localhost:3001');

        await driver.wait(until.elementLocated(By.id('productName')), 10000);

        let nameInput = await driver.findElement(By.id('productName'));
        await nameInput.clear();
        await nameInput.sendKeys('Test Product');

        let minInput = await driver.findElement(By.id('minLevel'));
        await minInput.clear();
        await minInput.sendKeys('5');

        let addBtn = await driver.findElement(By.xpath("//button[contains(text(),'Add Product')]"));
        await driver.wait(until.elementIsEnabled(addBtn), 10000);
        await addBtn.click();

        console.log("Product Added");

        await driver.sleep(4000);

        let qtyBox = await driver.findElement(By.id('qty-0'));
        await qtyBox.clear();
        await qtyBox.sendKeys('10');

        let inBtn = await driver.findElement(By.xpath("(//button[contains(text(),'IN')])[1]"));
        await driver.wait(until.elementIsEnabled(inBtn), 10000);
        await inBtn.click();

        console.log("Stock IN done");

        await driver.sleep(8000);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await driver.quit();
    }
})();