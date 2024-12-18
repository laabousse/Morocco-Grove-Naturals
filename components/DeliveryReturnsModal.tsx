"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";

const DeliveryReturnsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer p-2 rounded-full transition-colors duration-200 ease-in-out"
      >
        <TbTruckDelivery className="text-xl" />
        <span className="hidden sm:inline">Delivery & Returns</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Delivery & Returns
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <section>
                <h3 className="text-lg font-semibold mb-2">
                  Delivery Information
                </h3>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                  <li>Standard Shipping: 3-5 business days</li>
                  <li>Express Shipping: 1-2 business days</li>
                  <li>Free shipping on orders over $200</li>
                  <li>Shipping rates calculated at checkout</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                  <li>30-day hassle-free returns</li>
                  <li>Items must be unused and in original packaging</li>
                  <li>Refund processed within 5-7 business days</li>
                  <li>
                    Return shipping costs paid by customer unless item is
                    defective
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  For any delivery or return inquiries, please contact our
                  customer support:
                </p>
                <p className="text-sm sm:text-base text-gray-800 font-medium mt-2">
                  Email: info@moroccogrove.com
                  <br />
                  Phone: +1 (555) 123-4567
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryReturnsModal;
