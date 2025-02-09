import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShareModal = ({
  isOpen,
  onClose,
  productUrl,
  productImage,
  productPrice,
}) => {
  // Function to handle sharing to social media
  const shareToSocialMedia = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          productUrl
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          productUrl
        )}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank");
  };

  // Function to copy the product URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // Enable closing modal by clicking outside or pressing Esc
      className="relative bg-white p-6 rounded-lg shadow-lg w-96"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      ariaHideApp={false} // Avoid warnings during development
    >
      {/* Close Icon */}
      <button
        onClick={onClose}
        className="absolute top-2 right-5 text-gray-500 text-2xl font-semibold hover:text-red-700 transition-colors duration-300"
      >
        &times;
      </button>

      {/* Product Image and Price */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={productImage}
          alt="Product"
          className="w-32 h-32 object-cover rounded-lg mb-2"
        />
        <p className="text-lg font-bold text-secondary-color">{productPrice}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Share this product</h2>
      <div className="space-y-4">
        {/* Social Media Buttons */}
        <button
          onClick={() => shareToSocialMedia("facebook")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Share on Facebook
        </button>
        <button
          onClick={() => shareToSocialMedia("twitter")}
          className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300"
        >
          Share on Twitter
        </button>
        <button
          onClick={() => shareToSocialMedia("whatsapp")}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Share on WhatsApp
        </button>
        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          Copy Link
        </button>
      </div>
    </Modal>
  );
};

export default ShareModal;
