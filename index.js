const puppeteer = require('puppeteer');

let electronicUrl = 'https://nshopvn.com/';
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(electronicUrl);

  let electronicData = await page.evaluate(() => {
    let products = [];
    let product_wrapper = document.querySelectorAll('.product');
    product_wrapper.forEach((product) => {
      let dataJson = {};
      try {
        dataJson.img = product.querySelector('.image > img').src;
        dataJson.title = product.querySelector('.product-title').innerText;
        dataJson.del = product.querySelector('.price del').innerText;
        dataJson.ins = product.querySelector('.price ins').innerText;
      }
      catch (err) {
          console.log(err)
      }
      products.push(dataJson);
    });
    return products;
  });

   console.log(electronicData);
    await browser.close();
})();