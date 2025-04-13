<script lang="ts">
    import { page } from '$app/stores';
  </script>
  
  <header class="bg-white shadow-sm">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <a href="/" class="flex items-center">
            <span class="text-2xl font-semibold text-gray-900">TicketHub</span>
          </a>
        </div>
  
        <!-- Navigation -->
        <div class="hidden sm:flex sm:space-x-8">
          <a 
            href="/" 
            class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
            class:border-b-2={$page.url.pathname === '/'}
            class:border-indigo-500={$page.url.pathname === '/'}
          >
            Home
          </a>
          <!-- <a 
            href="/concerts" 
            class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
            class:border-b-2={$page.url.pathname === '/concerts'}
            class:border-indigo-500={$page.url.pathname === '/concerts'}
          >
            Concerts
          </a>
          <a 
            href="/about" 
            class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
            class:border-b-2={$page.url.pathname === '/about'}
            class:border-indigo-500={$page.url.pathname === '/about'}
          >
            About
          </a> -->
        </div>
  
        <!-- Right side buttons -->
        <!-- <div class="flex items-center space-x-4">
          <button class="text-sm font-medium text-gray-900 hover:text-gray-600">
            Sign In
          </button>
          <button class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Get Started
          </button>
        </div> -->
      </div>
    </nav>
  </header>