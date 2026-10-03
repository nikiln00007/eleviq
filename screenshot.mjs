import puppeteer from 'puppeteer';

const sites = [
  { url: 'https://portfolio-akash-main.vercel.app/', out: 'public/preview-01.png' },
  { url: 'https://restaurent-website-eosin.vercel.app/', out: 'public/preview-02.png' },
  { url: 'https://sirra-interiors.vercel.app/', out: 'public/preview-03.png' },
  { url: 'https://havofill-fawn.vercel.app/', out: 'public/preview-04.png' },
];

const browser = await puppeteer.launch({ 
  headless: 'new', 
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'] 
});

for (const site of sites) {
  console.log(`Screenshotting: ${site.url}`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: site.out, type: 'png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
    console.log(`  ✓ Saved ${site.out}`);
  } catch (e) {
    console.error(`  ✗ Error for ${site.url}: ${e.message}`);
  }
  await page.close();
}

await browser.close();
console.log('Done!');
