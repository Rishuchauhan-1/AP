import { useState } from 'react';
import { Mail, MessageSquare, Send, MapPin, Users } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions, suggestions, or want to submit a new AI tool? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Email Ritesh</h3>
                <p className="text-gray-600 text-sm">Co-Founder & Developer</p>
              </div>
            </div>
            <a
              href="mailto:ritesh_2503mc03@iitp.ac.in"
              className="text-blue-600 hover:text-blue-700 break-all text-lg"
            >
              ritesh_2503mc03@iitp.ac.in
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Email Rishu</h3>
                <p className="text-gray-600 text-sm">Co-Founder & Developer</p>
              </div>
            </div>
            <a
              href="mailto:rishu_2503ct03@iitp.ac.in"
              className="text-purple-600 hover:text-purple-700 break-all text-lg"
            >
              rishu_2503ct03@iitp.ac.in
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl border-2 border-green-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Submit AI Tool</h3>
                <p className="text-gray-600 text-sm">Suggest a new tool</p>
              </div>
            </div>
            <p className="text-gray-600">
              Know an amazing AI tool we should feature? Send us the details and we'll review it!
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border-2 border-orange-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Location</h3>
                <p className="text-gray-600 text-sm">Where we study</p>
              </div>
            </div>
            <p className="text-gray-600">
              Indian Institute of Technology Patna (IIT Patna)
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Send className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-gray-900">Send us a Message</h2>
          </div>
          
          {submitted ? (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-green-800 mb-2">Message Sent Successfully!</h3>
              <p className="text-green-700">Thank you for reaching out. We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition-all"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 text-lg"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Team Info */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Users className="w-8 h-8" />
            <h2 className="text-white">Our Team</h2>
          </div>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            We are students at IIT Patna, passionate about artificial intelligence and committed to making 
            AI tools accessible to everyone through comprehensive guides and honest reviews.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-lg">
                <span className="text-3xl">RT</span>
              </div>
              <h3 className="text-white mb-2">Ritesh Thakur</h3>
              <p className="text-blue-100 text-sm mb-3">Co-Founder & Developer</p>
              <a href="mailto:ritesh_2503mc03@iitp.ac.in" className="text-blue-200 hover:text-white text-sm break-all">
                ritesh_2503mc03@iitp.ac.in
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 shadow-lg">
                <span className="text-3xl">RK</span>
              </div>
              <h3 className="text-white mb-2">Rishu Kumar</h3>
              <p className="text-blue-100 text-sm mb-3">Co-Founder & Developer</p>
              <a href="mailto:rishu_2503ct03@iitp.ac.in" className="text-blue-200 hover:text-white text-sm break-all">
                rishu_2503ct03@iitp.ac.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
