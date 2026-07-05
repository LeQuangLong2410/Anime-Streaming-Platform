/**
 * Static Asset Accessibility Test
 * 
 * This script verifies that static assets are NOT blocked by authentication middleware.
 * Run this after starting the development server: npm run dev
 * 
 * Usage: node test-static-assets.js
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const staticAssets = [
  '/videos/banner.mp4',
  '/images/anime/poster/logoz.png',
  '/favicon.ico',
];

async function testAsset(path) {
  try {
    const url = `${baseUrl}${path}`;
    const response = await fetch(url, { 
      method: 'HEAD',
      redirect: 'manual' // Don't follow redirects to sign-in
    });
    
    const status = response.status;
    const isSuccess = status === 200;
    const isRedirect = status >= 300 && status < 400;
    
    if (isSuccess) {
      console.log(`✅ ${path} - HTTP ${status} (OK)`);
      return true;
    } else if (isRedirect) {
      console.log(`❌ ${path} - HTTP ${status} (REDIRECTED - Authentication is blocking this asset!)`);
      console.log(`   Location: ${response.headers.get('location')}`);
      return false;
    } else {
      console.log(`⚠️  ${path} - HTTP ${status} (${response.statusText})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${path} - Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing Static Asset Accessibility\n');
  console.log(`Base URL: ${baseUrl}\n`);
  
  const results = [];
  
  for (const asset of staticAssets) {
    const success = await testAsset(asset);
    results.push({ asset, success });
  }
  
  console.log('\n' + '='.repeat(60));
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  if (successCount === totalCount) {
    console.log(`\n✅ ALL TESTS PASSED (${successCount}/${totalCount})`);
    console.log('\n✓ Static assets are NOT blocked by authentication middleware');
    console.log('✓ Videos, images, and icons load correctly');
    console.log('✓ Middleware configuration is correct');
  } else {
    console.log(`\n❌ SOME TESTS FAILED (${successCount}/${totalCount} passed)`);
    console.log('\n⚠️  Some static assets are being blocked by middleware');
    console.log('⚠️  Check middleware.ts configuration');
    console.log('⚠️  Verify matcher regex excludes these file types');
  }
  
  console.log('\n' + '='.repeat(60));
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(baseUrl);
    return true;
  } catch (error) {
    console.log('❌ Development server is not running!');
    console.log('\nPlease start the server first:');
    console.log('   npm run dev');
    console.log('\nThen run this test again.');
    return false;
  }
}

// Main execution
(async () => {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await runTests();
  }
  process.exit(0);
})();
