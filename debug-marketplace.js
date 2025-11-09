// Debug script to test marketplace functionality
// Run this in your browser console on the deployed site

console.log('=== Marketplace Debug Info ===');

// Check environment variables
console.log('Environment Variables:');
console.log('SUPABASE_URL:', window.location.origin.includes('localhost') ? 
  'http://localhost:8080' : 'Check deployment env vars');

// Check if user is authenticated
console.log('Current URL:', window.location.href);
console.log('User authenticated:', !!localStorage.getItem('sb-ibckoaekfcefniquqcnu-auth-token'));

// Check if marketplace route exists
const testMarketplace = () => {
  const currentPath = window.location.pathname;
  console.log('Current path:', currentPath);
  
  if (currentPath !== '/marketplace') {
    console.log('Attempting to navigate to marketplace...');
    window.location.href = '/marketplace';
  } else {
    console.log('Already on marketplace page');
    
    // Check for marketplace elements
    const marketplaceTitle = document.querySelector('h1');
    const createButton = document.querySelector('button');
    
    console.log('Marketplace title found:', !!marketplaceTitle);
    console.log('Create button found:', !!createButton);
    
    if (marketplaceTitle) {
      console.log('Title text:', marketplaceTitle.textContent);
    }
  }
};

// Check navigation
const navLinks = document.querySelectorAll('nav a, nav button');
const marketplaceNav = Array.from(navLinks).find(link => 
  link.textContent.toLowerCase().includes('marketplace')
);

console.log('Navigation links found:', navLinks.length);
console.log('Marketplace nav link found:', !!marketplaceNav);

if (marketplaceNav) {
  console.log('Marketplace nav text:', marketplaceNav.textContent);
  console.log('Marketplace nav href:', marketplaceNav.href);
}

// Test Supabase connection
const testSupabase = async () => {
  try {
    const response = await fetch('https://ibckoaekfcefniquqcnu.supabase.co/rest/v1/marketplace_items?select=*&limit=1', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY2tvYWVrZmNlZm5pcXVxY251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjkxMTYsImV4cCI6MjA3Mjg0NTExNn0.FFSS6aQT8QeI1LdA2UaTVL_1pZXvAdG00PY2McBovT8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY2tvYWVrZmNlZm5pcXVxY251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjkxMTYsImV4cCI6MjA3Mjg0NTExNn0.FFSS6aQT8QeI1LdA2UaTVL_1pZXvAdG00PY2McBovT8'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Supabase connection: SUCCESS');
      console.log('Marketplace items count:', data.length);
    } else {
      console.log('Supabase connection: FAILED');
      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());
    }
  } catch (error) {
    console.log('Supabase connection: ERROR');
    console.log('Error:', error.message);
  }
};

// Run tests
testMarketplace();
testSupabase();

console.log('=== End Debug Info ===');
console.log('If marketplace is not visible, check:');
console.log('1. Are you logged in?');
console.log('2. Is the navigation showing the Marketplace link?');
console.log('3. Does /marketplace URL work directly?');
console.log('4. Are there any console errors?');