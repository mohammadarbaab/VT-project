const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            AI VideoTranscriber
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Professional video transcription powered by AI. Fast, accurate, and reliable for all your transcription needs.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {['Features', 'Pricing', 'API', 'Support'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact/Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Stay Updated</h4>
                        <div className="flex space-x-2">
                            <input 
                                type="email" 
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                            />
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            © 2025 AI VideoTranscriber. All rights reserved.
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;