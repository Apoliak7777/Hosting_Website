import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How long does setup take?",
    answer: "Our deployment system is fully automated. Your server will be online and ready to use within 60 seconds after your payment is confirmed."
  },
  {
    question: "Do you offer DDoS Protection?",
    answer: "Yes! All of our game and VPS servers include enterprise-grade 480Gbps DDoS protection at no additional cost."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely. You can upgrade your server plan at any time through our Client Area. Upgrades are applied automatically with no data loss."
  },
  {
    question: "Where are your servers located?",
    answer: "Our primary datacenter is in Frankfurt, Germany. We also have high-performance nodes in New York, USA."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-4 md:px-12 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="glass-dark border border-white/10 rounded-2xl overflow-hidden"
          >
            <button 
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-lg font-bold text-white">{faq.question}</span>
              <ChevronDown 
                className={`text-accent-blue transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5 text-gray-text">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
