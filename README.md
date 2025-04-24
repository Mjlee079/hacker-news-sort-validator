# Hacker News Sort Validator

This project contains a Playwright script that validates the sorting of articles on Hacker News' newest page. It specifically checks if the first 100 articles are correctly sorted from newest to oldest.

## Features

- Automated validation of article sorting on https://news.ycombinator.com/newest
- Checks the first 100 articles
- Provides detailed output for any sorting errors
- Uses Playwright for browser automation
- Runs in visible browser mode for easy monitoring

## Prerequisites

- Node.js (v14 or higher)
- Chrome browser installed on your system

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Mjlee079/hacker-news-sort-validator.git
cd hacker-news-sort-validator
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the script with:
```bash
node index.js
```

The script will:
1. Open Chrome browser
2. Navigate to Hacker News newest page
3. Check the sorting of the first 100 articles
4. Output the results
5. Close the browser

### Output

- Success case: `✅ Success: First 100 articles are correctly sorted from newest to oldest`
- Error case: Shows which articles are out of order with their timestamps

## Dependencies

- playwright: ^1.39.0

## License

MIT