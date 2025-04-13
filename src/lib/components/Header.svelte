<script lang="ts">
  import { page } from '$app/stores'; // cannot get this to work with $app/state
</script>

<header class="bg-black shadow-md">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 justify-between items-center">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <span class="text-2xl font-bold text-white">
            <span class="text-red-600">E</span>TOUR
          </span>
        </a>
      </div>

      <!-- Navigation -->
      <div class="hidden sm:flex sm:space-x-8">
        <a
          href="/"
          class="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-red-400"
          class:border-b-2={$page.url.pathname === '/'}
          class:border-red-500={$page.url.pathname === '/'}
        >
          Home
        </a>
        <!-- <a
          href="/concerts"
          class="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-red-400"
          class:border-b-2={$page.url.pathname === '/concerts'}
          class:border-red-500={$page.url.pathname === '/concerts'}
        >
          Concerts
        </a>
        <a
          href="/about"
          class="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-red-400"
          class:border-b-2={$page.url.pathname === '/about'}
          class:border-red-500={$page.url.pathname === '/about'}
        >
          About
        </a> -->
      </div>

      <!-- Right side - Tour date banner -->
      <div class="hidden md:block">
        <div class="bg-red-600 px-4 py-1 rounded text-white text-sm font-bold animate-pulse">
          THE REVIVAL TOUR 2025
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Hero banner for the concert -->
  <div class="bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 py-3">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div class="text-white">
        <span class="text-sm font-medium mr-2">EMINEM: THE REVIVAL TOUR</span>
        <span class="text-xs bg-red-600 px-2 py-0.5 rounded">OFFICIAL TICKETS</span>
      </div>
      <div class="text-white text-sm">
        <span class="hidden sm:inline mr-4">ON SALE NOW</span>
        <a href="/" class="bg-white text-black px-3 py-1 rounded-sm font-bold hover:bg-red-600 hover:text-white transition-colors duration-200">
          BUY NOW
        </a>
      </div>
    </div>
  </div>
</header>