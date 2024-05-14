// components/ContactForm.js
"use client"
import React, { useState } from 'react';

const Contact= () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Replace with your actual form submission logic (e.g., API call)
      const response = await fetch('/api/submit-contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, note }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setName('');
      setEmail('');
      setNote('');
      setSuccessMessage('Your message has been sent successfully!');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto ">
      <h2 className="text-5xl font-bold mb-8 text-black text-center ">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm text-black font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className=" text-black text-sm font-medium mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="note" className="text-sm  text-black font-medium mb-2">
            Leave a Note (Optional)
          </label>
          <textarea
            id="note"
            name="note"
            rows={5}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
      <h1 className='text-black text-center '>Feel Free To Connect With Me</h1>
    </section>
  );
};

export default Contact;
