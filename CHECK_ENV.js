#!/usr/bin/env node

/**
 * Environment Variable Checker for Clerk Authentication
 * 
 * This script validates your Clerk API keys before starting the app.
 * Run: node CHECK_ENV.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking Clerk Environment Variables...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ ERROR: .env.local file not found!');
  console.log('\n📝 Create .env.local in your project root with:');
  console.log('   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...');
  console.log('   CLERK_SECRET_KEY=sk_test_...');
  console.log('\n📖 See SETUP_CLERK_KEYS.md for detailed instructions.\n');
  process.exit(1);
}

// Read .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

let publishableKey = '';
let secretKey = '';

lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed.startsWith('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=')) {
    publishableKey = trimmed.split('=')[1]?.trim() || '';
  }
  if (trimmed.startsWith('CLERK_SECRET_KEY=')) {
    secretKey = trimmed.split('=')[1]?.trim() || '';
  }
});

let hasErrors = false;

// Validate Publishable Key
console.log('1️⃣  Checking NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY...');
if (!publishableKey) {
  console.error('   ❌ NOT FOUND in .env.local');
  hasErrors = true;
} else if (
  publishableKey === 'your_publishable_key_here' ||
  publishableKey === 'pk_test_REPLACE_WITH_YOUR_PUBLISHABLE_KEY' ||
  publishableKey.includes('REPLACE')
) {
  console.error('   ❌ INVALID: Still using placeholder value');
  console.log('   💡 Replace with your actual Clerk publishable key');
  console.log('   📍 Get it from: https://dashboard.clerk.com/');
  hasErrors = true;
} else if (!publishableKey.startsWith('pk_test_') && !publishableKey.startsWith('pk_live_')) {
  console.error('   ❌ INVALID FORMAT: Must start with pk_test_ or pk_live_');
  console.log(`   📋 Current value: ${publishableKey.substring(0, 20)}...`);
  hasErrors = true;
} else {
  console.log(`   ✅ Valid format: ${publishableKey.substring(0, 15)}...`);
}

// Validate Secret Key
console.log('\n2️⃣  Checking CLERK_SECRET_KEY...');
if (!secretKey) {
  console.error('   ❌ NOT FOUND in .env.local');
  hasErrors = true;
} else if (
  secretKey === 'your_secret_key_here' ||
  secretKey === 'sk_test_REPLACE_WITH_YOUR_SECRET_KEY' ||
  secretKey.includes('REPLACE')
) {
  console.error('   ❌ INVALID: Still using placeholder value');
  console.log('   💡 Replace with your actual Clerk secret key');
  console.log('   📍 Get it from: https://dashboard.clerk.com/');
  hasErrors = true;
} else if (!secretKey.startsWith('sk_test_') && !secretKey.startsWith('sk_live_')) {
  console.error('   ❌ INVALID FORMAT: Must start with sk_test_ or sk_live_');
  console.log(`   📋 Current value: ${secretKey.substring(0, 20)}...`);
  hasErrors = true;
} else {
  console.log(`   ✅ Valid format: ${secretKey.substring(0, 15)}...`);
}

console.log('\n' + '─'.repeat(60));

if (hasErrors) {
  console.error('\n❌ CONFIGURATION INVALID\n');
  console.log('📖 Quick Fix Guide:');
  console.log('   1. Visit https://dashboard.clerk.com/');
  console.log('   2. Create/select your application');
  console.log('   3. Go to "API Keys"');
  console.log('   4. Copy your Publishable Key (pk_test_...)');
  console.log('   5. Copy your Secret Key (sk_test_...)');
  console.log('   6. Paste them into .env.local');
  console.log('   7. Run: npm run dev\n');
  console.log('📄 Detailed guide: SETUP_CLERK_KEYS.md\n');
  process.exit(1);
} else {
  console.log('\n✅ ALL CHECKS PASSED!\n');
  console.log('🎉 Your Clerk configuration is valid.');
  console.log('🚀 You can now run: npm run dev\n');
  process.exit(0);
}
