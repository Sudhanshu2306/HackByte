import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex justify-center">
        <footer className="bg-black text-white p-8 w-[90%] rounded-t-4xl">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-center  pb-6 text-center md:text-left">
                <div className="text-2xl font-bold">Positivus</div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm mt-4 md:mt-0">
                <a href="#" className="hover:underline">About us</a>
                <a href="#" className="hover:underline">Services</a>
                <a href="#" className="hover:underline">Use Cases</a>
                <a href="#" className="hover:underline">Pricing</a>
                <a href="#" className="hover:underline">Blog</a>
                </div>
                <div className="flex space-x-4 text-lg mt-4 md:mt-0">
                <a href="#" className="hover:text-gray-400"><FaLinkedinIn /></a>
                <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
                <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
                </div>
            </div>

            {/* Middle Section */}
            <div className="flex flex-col md:flex-row justify-between items-start py-6 text-center md:text-left">
                {/* Contact Section */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <p className="bg-[#B4FF4A] text-black font-bold px-3 py-1 inline-block rounded-md">Contact us:</p>
                <p className="mt-2">Email: info@positivus.com</p>
                <p>Phone: 555-567-8901</p>
                <p>Address: 1234 Main St, Moonstone City, Stardust State 12345</p>
                </div>

                {/* Subscription Section */}
                <div className="bg-black border-[0.5px] p-2 rounded-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#B4FF4A] w-full md:w-auto"
                />
                <button className="bg-[#B4FF4A] text-black px-4 py-2 rounded-lg font-semibold w-full md:w-auto">Subscribe to news</button>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 pt-4 text-center text-sm">
                <p>&copy; 2023 Positivus. All Rights Reserved. <a href="#" className="hover:underline">Privacy Policy</a></p>
            </div>
        </footer>
    </div>
  );
}