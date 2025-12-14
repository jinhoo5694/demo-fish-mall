import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_PATH = path.join(__dirname, '../src/data/products.json');
const OUTPUT_PATH = path.join(__dirname, '../src/data/products.json');

async function crawlImages() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'));

  console.log(`Starting to crawl images for ${products.length} products...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const updatedProducts = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Crawling: ${product.name.substring(0, 40)}...`);

    try {
      await page.goto(product.product_url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Try multiple selectors to find the main product image
      const imageUrl = await page.evaluate(() => {
        // Try xzoom (main product image)
        const xzoomImg = document.querySelector('.xzoom');
        if (xzoomImg && xzoomImg.src) {
          return xzoomImg.src;
        }

        // Try product image container
        const prodImg = document.querySelector('#prod_image_list img');
        if (prodImg && prodImg.src) {
          return prodImg.src;
        }

        // Try any large product image
        const anyProdImg = document.querySelector('.goods_thumbs img, .prod_img img, .product-image img');
        if (anyProdImg && anyProdImg.src) {
          return anyProdImg.src;
        }

        // Try getting from meta tag
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage && ogImage.content) {
          return ogImage.content;
        }

        return null;
      });

      if (imageUrl && !imageUrl.includes('placeholder')) {
        product.image_url = imageUrl;
        console.log(`  ✓ Found image: ${imageUrl.substring(0, 60)}...`);
      } else {
        console.log(`  ✗ No image found, keeping placeholder`);
      }

    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
    }

    updatedProducts.push(product);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  await browser.close();

  // Save updated products
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(updatedProducts, null, 2));
  console.log(`\nDone! Updated ${updatedProducts.length} products.`);
}

crawlImages().catch(console.error);
