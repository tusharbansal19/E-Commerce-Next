// components/Footer.js
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Affiliate Program', href: '#' }
    ],
    account: [
      { name: 'Your Account', href: '#' },
      { name: 'Returns Centre', href: '#' },
      { name: 'Help Centre', href: '#' },
      { name: 'Your Orders', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ],
    services: [
      { name: 'Gift Cards', href: '#' },
      { name: 'Mobile App', href: '#' },
      { name: 'Shipping & Delivery', href: '#' },
      { name: 'Order Pickup', href: '#' },
      { name: 'Account Signup', href: '#' }
    ],
    help: [
      { name: 'Contact Us', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Live Chat', href: '#' },
      { name: 'Store Locator', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  }

  const socialIcons = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ]

  const paymentMethods = [
    'Visa', 'Mastercard', 'American Express', 'PayPal', 'Apple Pay', 'Google Pay'
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-purple-100">Get the latest deals and offers straight to your inbox</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-purple-400 mb-4 script-font">Freshly</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted online grocery store providing fresh, quality products delivered right to your doorstep. 
              We're committed to making your shopping experience convenient and enjoyable.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">support@freshly.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-400 mt-0.5" />
                <span className="text-gray-300">1234 Grocery Lane<br />Fresh City, FC 12345</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {socialIcons.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-2 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-colors hover:bg-gray-700`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Account</h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Freshly. All rights reserved. | Built with ❤️ for fresh food lovers
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  {paymentMethods.join(' • ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}