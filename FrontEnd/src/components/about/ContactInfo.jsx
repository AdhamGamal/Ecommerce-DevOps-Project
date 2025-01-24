import React from "react";
import img1 from "../../assets/images/abdelrahman.jpg";
import img2 from "../../assets/images/aayman.jpg";
import img3 from "../../assets/images/heba.jpg";
import img4 from "../../assets/images/mariam.jpg";
import img5 from "../../assets/images/hossam.jpg";
import img6 from "../../assets/images/abdallah.jpg";
import female from "../../assets/images/female.jpg";
import male from "../../assets/images/male.jpg";
import imgContact from "../../assets/images/contact3.png";

const contacts = [
  {
    id: 1,
    src: male,
    email: "https://github.com/AdhamGamal",
    name: "Adham",
  },
  {
    id: 2,
    src: img3,
    email: "https://www.linkedin.com/in/heba-ali-3b8617205",
    name: "Heba",
  },
  {
    id: 3,
    src: male,
    email: "https://github.com/imorsi7",
    name: "Mahmoud",
  },
  {
    id: 4,
    src: female,
    email: "",
    name: "Maha",
  },
  {
    id: 5,
    src: male,
    email: "",
    name: "Khaled",
  },
];

const ContactInfo = () => {
  return (
    <div className="bg-back-color text-white sticky top-full overflow-hidden">
      <div className="h-56 relative my-12">
        {/* Background Image */}
        <img
          src={imgContact}
          alt="Contact Background"
          loading="lazy"
          className="hidden sm:inline-block absolute z-20 top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay for Text */}
        <div className="absolute  z-50 inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
          {/* Text Container */}
          <div className="text-center p-6 bg-black bg-opacity-50 rounded-lg max-w-2xl">
            {/* Heading */}
            {/* <p className="text-btn-primary uppercase text-sm mb-2">
              Like Elegance?!
            </p> */}
            <p className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">
              Discover the DevOPs Engineers Behind the Screens
            </p>

            {/* Contact Cards */}
            <div className="flex flex-wrap justify-center gap-4">
              {contacts.map((contact) => (
                <a
                  href={contact.email}
                  key={contact.id}
                  className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-300"
                >
                  {/* Contact Image */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={contact.src}
                      alt={contact.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contact Name */}
                  <p className="text-sm font-medium text-white">
                    {contact.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
