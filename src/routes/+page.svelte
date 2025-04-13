<script lang="ts">
    import type { TicketFormData, FormErrors } from '$lib';

    const apiUrl = "https://nscc-0460670-tickethub-api-inft4000-efa8acc3dpg4g7c4.canadacentral-01.azurewebsites.net/api/TicketOrder";
    
    let formData = $state<TicketFormData>({
      concertId: 2,
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
  
      // Credit card validation (basic Luhn algorithm check)
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
        alert('Ticket purchase successful!');
      } catch (error) {
        alert('Failed to submit form. Please try again.');
      } finally {
        isSubmitting = false;
      }
    }
  </script>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <!-- Page header -->
    <div class="mx-auto max-w-lg text-center mb-12">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Purchase Tickets</h1>
      <p class="mt-4 text-lg leading-8 text-gray-600">
        Secure your spot at the concert with just a few simple steps.
      </p>
    </div>
  
      <!-- Form Card -->
      <div class="mx-auto max-w-lg bg-white shadow-lg rounded-lg">
        <form onsubmit={handleSubmit} class="p-8 space-y-8">
          <!-- Personal Information Section -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h2>
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  bind:value={formData.name}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                {#if errors.phone}
                  <p class="mt-1 text-sm text-red-600">{errors.phone}</p>
                {/if}
              </div>
  
              <div>
                <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  bind:value={formData.quantity}
                  min="1"
                  max="10"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>
  
          <!-- Payment Information Section -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">Payment Information</h2>
            <div class="space-y-4">
              <div>
                <label for="creditCard" class="block text-sm font-medium text-gray-700">Credit Card Number</label>
                <input
                  type="text"
                  id="creditCard"
                  bind:value={formData.creditCard}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
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
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                  {#if errors.securityCode}
                    <p class="mt-1 text-sm text-red-600">{errors.securityCode}</p>
                  {/if}
                </div>
              </div>
            </div>
          </div>
  
          <!-- Shipping Address Section -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">Billing Address</h2>
            <div class="space-y-4">
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  bind:value={formData.address}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
  
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
      </div>
    </div>