// app/order-details/page.tsx
'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function OrderDetailsForm() {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // EmailJS configuration (replace these with your actual values)
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'your_emailjs_service_id',
    TEMPLATE_ID: 'your_emailjs_template_id',
    PUBLIC_KEY: 'your_emailjs_public_key'
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    setSubmitError(null);

    try {
      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Send form data through EmailJS
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        e.currentTarget,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Redirect to confirmation page
      window.location.href = '/order-confirmation';
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitError('Failed to submit details. Please try again later.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              full Name
            </label>
            <input
              type="tel"
              name="phone_number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="sam zarila"
              disabled={formSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              email address
            </label>
            <input
              type="tel"
              name="phone_number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="zarilasam99@gmail.com"
              disabled={formSubmitting}
            />
          </div>
          

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone_number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+265 XXX XXX XXX"
              disabled={formSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              location
            </label>
            <input
              type="tel"
              name="phone_number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="soche, Blantyre"
              disabled={formSubmitting}
            />
          </div>
          <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Courier Service *
                    </label>
                    <select
                        name="courier_service"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={formSubmitting}
                    >
                        <option value="">Select a courier service</option>
                        <option value="dhl">CTS</option>
                        <option value="fedex">SPEED</option>
                       
                        <option value="self_pickup">Self Pickup</option>
                    </select>
                    </div>

          

          {submitError && (
            <p className="text-red-500 text-sm">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={formSubmitting}
             className="w-full flex items-center justify-center bg-black text-white py-3 rounded-md"
          >
            {formSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Details'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}