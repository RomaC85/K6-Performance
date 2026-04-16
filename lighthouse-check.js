const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const tempDir = path.join(__dirname, 'temp-lighthouse');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
process.env.TMP = tempDir;
process.env.TEMP = tempDir;
process.env.TMPDIR = tempDir;

const urls = [
  'https://raider-test-site.onrender.com/',
  'https://practicesoftwaretesting.com',
  'https://example.com'
];

const thresholds = {
  performance: 60,
  accessibility: 80
};

async function launchChrome() {
  return chromeLauncher.launch({
    chromeFlags: [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--user-data-dir=${path.join(tempDir, 'chrome-profile')}`
    ]
  });
}

async function killChrome(chrome) {
  try {
    await chrome.kill();
  } catch (error) {
    if (error && error.code === 'EPERM') {
      console.warn('Warning: Chrome temp cleanup failed with EPERM. Continuing.');
      return;
    }
    throw error;
  }
}

async function runAudit(url) {
  const chrome = await launchChrome();
  const options = {
    logLevel: 'error',
    output: 'json',
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);
  await killChrome(chrome);
  return runnerResult.lhr;
}

function formatScore(category) {
  if (!category || typeof category.score !== 'number') {
    return 'N/A';
  }
  return Math.round(category.score * 100);
}

function isPass(result) {
  return result.performance >= thresholds.performance && result.accessibility >= thresholds.accessibility;
}

async function main() {
  const results = [];

  for (const url of urls) {
    console.log(`\nRunning Lighthouse audit for: ${url}`);
    try {
      const lhr = await runAudit(url);
      const scores = {
        url,
        performance: formatScore(lhr.categories.performance),
        accessibility: formatScore(lhr.categories.accessibility),
        bestPractices: formatScore(lhr.categories['best-practices']),
        seo: formatScore(lhr.categories.seo),
        pwa: formatScore(lhr.categories.pwa)
      };
      scores.status = isPass(scores) ? 'PASS' : 'FAIL';
      results.push(scores);

      console.log(`Status: ${scores.status}`);
      console.log(`Performance: ${scores.performance}/100`);
      console.log(`Accessibility: ${scores.accessibility}/100`);
      console.log(`Best Practices: ${scores.bestPractices}/100`);
      console.log(`SEO: ${scores.seo}/100`);
      console.log(`PWA: ${scores.pwa}/100`);
    } catch (error) {
      console.error(`Error auditing ${url}:`, error.message);
      results.push({ url, status: 'ERROR', error: error.message });
    }
  }

  console.log('\n=== COMPARISON SUMMARY ===');
  console.log('URL'.padEnd(40), 'Status'.padEnd(8), 'Perf'.padEnd(6), 'Acc'.padEnd(6), 'BP'.padEnd(6), 'SEO'.padEnd(6), 'PWA');
  console.log('-'.repeat(80));

  results.forEach((r) => {
    if (r.status === 'ERROR') {
      console.log(r.url.padEnd(40), r.status.padEnd(8), 'N/A'.padEnd(6), 'N/A'.padEnd(6), 'N/A'.padEnd(6), 'N/A'.padEnd(6), 'N/A');
    } else {
      console.log(
        r.url.padEnd(40),
        r.status.padEnd(8),
        `${r.performance}`.padEnd(6),
        `${r.accessibility}`.padEnd(6),
        `${r.bestPractices}`.padEnd(6),
        `${r.seo}`.padEnd(6),
        `${r.pwa}`
      );
    }
  });
}

main().catch((error) => {
  console.error('Unexpected error:', error.message || error);
});
