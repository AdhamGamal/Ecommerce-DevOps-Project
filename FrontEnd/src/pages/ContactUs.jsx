import React from "react";
import ContactUsForm from "../components/contact-us/ContactUsForm";
import NeedHelpSection from "../components/contact-us/NeedHelpSection";
import Faq from "../components/contact-us/Faq";

const ContactUs = () => {
  return (
    <>
      <NeedHelpSection />
      <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
        <Faq />
        <ContactUsForm />
      </div>
    </>
  );
};

export default ContactUs;
