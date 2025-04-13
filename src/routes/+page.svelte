<script lang="ts">
  import type { TicketFormData, FormErrors } from '$lib';

  const apiUrl = "https://nscc-0460670-tickethub-api-inft4000-efa8acc3dpg4g7c4.canadacentral-01.azurewebsites.net/api/TicketOrder";
  
  // Define a type for ticket keys
  type TicketType = 'vip' | 'general' | 'early';

  // Ticket types with their IDs and prices
  const ticketTypes = {
    vip: { 
      id: 1, 
      name: "VIP EXPERIENCE", 
      price: 299.99, 
      serviceFee: 24.99,
      description: "Early entry, exclusive merchandise, premium seating"
    },
    general: { 
      id: 2, 
      name: "GENERAL ADMISSION", 
      price: 129.99, 
      serviceFee: 19.99,
      description: "Standard entry, general seating area"
    },
    early: { 
      id: 3, 
      name: "EARLY BIRD", 
      price: 89.99, 
      serviceFee: 14.99,
      description: "Limited availability, restricted viewing"
    }
  };
  
  let selectedTicketType = $state<TicketType>("vip");
  let totalPrice = $state(324.98); // Initial price (vip + fees)
  
  let formData = $state<TicketFormData>({
    concertId: 1, // Default to VIP
    email: '',
    name: '',
    phone: '',
    quantity: 1,
    creditCard: '',
    expiration: '',
    securityCode: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada'
  });

  let errors = $state<FormErrors>({});
  let isSubmitting = $state(false);

  function updatePrice() {
    const ticket = ticketTypes[selectedTicketType];
    const subtotal = ticket.price * formData.quantity;
    const serviceFee = ticket.serviceFee * formData.quantity;
    totalPrice = parseFloat((subtotal + serviceFee).toFixed(2));
  }
  
  function changeTicketType(type: TicketType) {
    selectedTicketType = type;
    formData.concertId = ticketTypes[type].id;
    updatePrice();
  }
  
  // Watch for quantity changes to update price
  $effect(() => {
    if (formData.quantity) {
      updatePrice();
    }
  });
  
  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (North American format)
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Credit card validation
    if (!formData.creditCard.match(/^\d{16}$/)) {
      newErrors.creditCard = 'Please enter a valid 16-digit credit card number';
    }

    // Expiration date validation (MM/YY format)
    if (!formData.expiration.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiration = 'Please enter a valid expiration date (MM/YY)';
    }

    // Security code validation
    if (!formData.securityCode.match(/^\d{3,4}$/)) {
      newErrors.securityCode = 'Please enter a valid security code';
    }

    // Postal code validation (Canadian format)
    if (!formData.postalCode.match(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/)) {
      newErrors.postalCode = 'Please enter a valid postal code';
    }

    // Required field validation
    const requiredFields: (keyof TicketFormData)[] = ['name', 'address', 'city', 'province'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    isSubmitting = true;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Reset form or show success message
      alert('Tickets secured! Check your email for confirmation.');
    } catch (error) {
      alert('Failed to process your order. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
  <!-- Concert details -->
  <div class="mb-12 text-center">
    <h1 class="text-4xl font-extrabold tracking-tight text-black sm:text-5xl mb-2">EMINEM: THE REVIVAL TOUR</h1>
    <p class="text-xl text-red-600 font-bold">JUNE 15, 2025 • ROGERS ARENA • TORONTO, ON</p>
    <div class="mt-6 p-4 bg-black text-white rounded-lg inline-block">
      <p class="font-bold">TICKETS SELLING FAST - LIMITED AVAILABILITY!</p>
      <p class="text-sm mt-1">Early access ends in <span class="text-red-500 font-bold">23:59:42</span></p>
    </div>
  </div>
  
  <!-- Ticket selection options -->
  <div class="mx-auto max-w-lg mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="p-4 bg-black text-white">
      <h2 class="text-xl font-bold">SELECT YOUR TICKET PACKAGE</h2>
    </div>
    <div class="p-6">
      {#each Object.entries(ticketTypes) as [type, ticket]}
        <div class="flex items-center mb-4 last:mb-0">
          <input 
            type="radio" 
            id={type} 
            name="ticket-type" 
            class="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500" 
            checked={selectedTicketType === type}
            onchange={() => changeTicketType(type as TicketType)} 
          />
          <label for={type} class="ml-3">
            <span class="text-lg font-medium text-gray-900">{ticket.name} - ${ticket.price.toFixed(2)}</span>
            <p class="text-sm text-gray-500">{ticket.description}</p>
          </label>
        </div>
      {/each}
    </div>
  </div>

  <!-- Form Card -->
  <div class="mx-auto max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="p-4 bg-black text-white">
      <h2 class="text-xl font-bold">SECURE YOUR TICKETS NOW</h2>
    </div>
    <form onsubmit={e => { e.preventDefault(); handleSubmit(); }} class="p-8 space-y-8">
      <!-- Personal Information Section -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-900 border-b pb-2 border-red-200">Personal Information</h2>
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              required
            />
            {#if errors.name}
              <p class="mt-1 text-sm text-red-600">{errors.name}</p>
            {/if}
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              required
            />
            {#if errors.email}
              <p class="mt-1 text-sm text-red-600">{errors.email}</p>
            {/if}
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              placeholder="10-digit number"
              required
            />
            {#if errors.phone}
              <p class="mt-1 text-sm text-red-600">{errors.phone}</p>
            {/if}
          </div>

          <div>
            <label for="quantity" class="block text-sm font-medium text-gray-700">Number of Tickets (Max 8)</label>
            <input
              type="number"
              id="quantity"
              bind:value={formData.quantity}
              min="1"
              max="8"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>

      <!-- Payment Information Section (Generated by AI)-->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-900 border-b pb-2 border-red-200">Payment Information</h2>
        <div class="space-y-4">
          <div>
            <label for="creditCard" class="block text-sm font-medium text-gray-700">Credit Card Number</label>
            <div class="mt-1 flex rounded-md shadow-sm bg-white border border-gray-300">
              <span class="inline-flex items-center rounded-l-md border-r border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                id="creditCard"
                bind:value={formData.creditCard}
                class="block w-full rounded-r-md border-0 ring-0 focus:ring-0 focus:outline-none sm:text-sm"
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </div>
            {#if errors.creditCard}
              <p class="mt-1 text-sm text-red-600">{errors.creditCard}</p>
            {/if}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="expiration" class="block text-sm font-medium text-gray-700">Expiration (MM/YY)</label>
              <input
                type="text"
                id="expiration"
                bind:value={formData.expiration}
                placeholder="MM/YY"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                required
              />
              {#if errors.expiration}
                <p class="mt-1 text-sm text-red-600">{errors.expiration}</p>
              {/if}
            </div>

            <div>
              <label for="securityCode" class="block text-sm font-medium text-gray-700">Security Code</label>
              <input
                type="text"
                id="securityCode"
                bind:value={formData.securityCode}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="CVV"
                required
              />
              {#if errors.securityCode}
                <p class="mt-1 text-sm text-red-600">{errors.securityCode}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Billing Address Section -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-900 border-b pb-2 border-red-200">Billing Address</h2>
        <div class="space-y-4">
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              bind:value={formData.address}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              required
            />
            {#if errors.address}
              <p class="mt-1 text-sm text-red-600">{errors.address}</p>
            {/if}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                bind:value={formData.city}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                required
              />
              {#if errors.city}
                <p class="mt-1 text-sm text-red-600">{errors.city}</p>
              {/if}
            </div>

            <div>
              <label for="province" class="block text-sm font-medium text-gray-700">Province</label>
              <input
                type="text"
                id="province"
                bind:value={formData.province}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                required
              />
              {#if errors.province}
                <p class="mt-1 text-sm text-red-600">{errors.province}</p>
              {/if}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                bind:value={formData.postalCode}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="A1A 1A1"
                required
              />
              {#if errors.postalCode}
                <p class="mt-1 text-sm text-red-600">{errors.postalCode}</p>
              {/if}
            </div>

            <div>
              <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                bind:value={formData.country}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 sm:text-sm"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Purchase Summary -->
      <div class="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h3 class="font-medium text-gray-900">Order Summary</h3>
        <div class="mt-2 flex justify-between">
          <span class="text-sm text-gray-500">
            {ticketTypes[selectedTicketType].name} Ticket (x{formData.quantity})
          </span>
          <span class="text-sm font-medium text-gray-900">
            ${(ticketTypes[selectedTicketType].price * formData.quantity).toFixed(2)}
          </span>
        </div>
        <div class="mt-1 flex justify-between">
          <span class="text-sm text-gray-500">Service & Handling Fees</span>
          <span class="text-sm font-medium text-gray-900">
            ${(ticketTypes[selectedTicketType].serviceFee * formData.quantity).toFixed(2)}
          </span>
        </div>
        <div class="mt-3 pt-3 border-t border-gray-200 flex justify-between">
          <span class="font-medium">Total</span>
          <span class="font-bold text-red-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <!-- Terms & Conditions (Generated by AI)-->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input id="terms" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-red-600 focus:ring-red-500" required />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="font-medium text-gray-700">I agree to the terms and conditions</label>
          <p class="text-gray-500">By purchasing, you accept our <a href="#" class="text-red-600 hover:text-red-500">Terms of Service</a> and <a href="#" class="text-red-600 hover:text-red-500">Privacy Policy</a>.</p>
        </div>
      </div>

      <button
        type="submit"
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'PROCESSING...' : 'SECURE YOUR TICKETS'}
      </button>
      
      <!-- Trust signals (Generated by AI)-->
      <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          <span>Secure Checkout</span>
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span>Official Retailer</span>
        </div>
      </div>
    </form>
  </div>
</div>