import React from 'react';

const HireRichard = () => {
  return (
    <div className="px-6 py-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Let’s Build Something Amazing Together
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Unlock the full potential of your projects with a dedicated and
          experienced partner. I specialize in creating scalable, efficient, and
          secure solutions tailored to your needs.
        </p>
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Get in Touch
        </a>
      </section>

      {/* Services Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Services I Offer</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <li>
            <h3 className="text-xl font-medium">Web Development</h3>
            <p className="text-gray-600">
              Build fast, secure, and scalable web applications with modern
              frameworks like Django and React.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-medium">API Design</h3>
            <p className="text-gray-600">
              Create robust APIs to integrate seamlessly with your systems or
              build SaaS products.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-medium">Consulting</h3>
            <p className="text-gray-600">
              Get expert guidance on scaling your business, improving workflows,
              and automating processes.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-medium">Custom Solutions</h3>
            <p className="text-gray-600">
              Tailored software solutions designed specifically for your unique
              challenges and goals.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HireRichard;
