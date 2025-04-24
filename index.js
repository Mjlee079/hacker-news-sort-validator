const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser using system Chrome
  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome', // Use system Chrome
    args: ['--no-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // go to Hacker News newest page
    await page.goto("https://news.ycombinator.com/newest");
    
    // Wait for articles to load
    await page.waitForSelector('.athing');

    // Get all article rows
    const articles = await page.$$('.athing');
    
    // Array to store article data
    const articleData = [];

    // Process first 100 articles
    for (let i = 0; i < Math.min(100, articles.length); i++) {
      const article = articles[i];
      
      // Get the title and link
      const titleElement = await article.$('.titleline > a');
      const title = await titleElement.textContent();
      
      // Get the age (time posted) - using the next sibling row
      const nextRow = await article.evaluateHandle(el => el.nextElementSibling);
      const ageElement = await nextRow.$('.age');
      const age = await ageElement.getAttribute('title');
      
      articleData.push({
        title: title.trim(),
        timestamp: new Date(age).getTime(),
        age: age
      });
    }

    // Verify sorting
    let isSorted = true;
    for (let i = 1; i < articleData.length; i++) {
      if (articleData[i].timestamp > articleData[i-1].timestamp) {
        isSorted = false;
        console.log(`Sorting error found between articles ${i} and ${i+1}:`);
        console.log(`Article ${i}: ${articleData[i-1].title} (${articleData[i-1].age})`);
        console.log(`Article ${i+1}: ${articleData[i].title} (${articleData[i].age})`);
        break;
      }
    }

    if (isSorted) {
      console.log('✅ Success: First 100 articles are correctly sorted from newest to oldest');
    } else {
      console.log('❌ Error: Articles are not correctly sorted from newest to oldest');
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close browser
    await browser.close();
  }
}

(async () => {
  await sortHackerNewsArticles();
})();