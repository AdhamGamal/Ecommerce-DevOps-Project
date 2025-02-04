import React from "react";
import customerService from "../../assets/images/customerService.png";
import Button from "../UI/Button";

const NeedHelpSection = () => {
  return (
    <section className="bg-light-color text-white py-8 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 mx-auto px-4  justify-center gap-2">
        {/* Header and Content */}
        <div className="text-center lg:text-left col-span-2 order-last md:order-first">
          <h2 className="text-4xl font-bold mb-4">NEED HELP?</h2>
          <p className="text-lg mb-2">
            If you have inquiries or need assistance, do not hesitate to chat
            with us.
          </p>
          <p className="text-lg mb-4">
            We are available 7 Days a week between 9am and 8pm.
          </p>

          <div className="">
            <Button
              onClick={() => {}}
              className={`w-1/2 m-auto  `}
              primary={false}
            >
              <span>
                {/* Live Chat SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 3.75H3.75a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25H6l3 3v-3h11.25a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25z"
                  />
                </svg>
              </span>
              <span className=" font-bold">LIVE CHAT </span>
            </Button>
          </div>
          <p className="text-lg mt-4">
            You can also reach us on{" "}
            <span className="font-semibold">123456</span>.
          </p>
          <p className="text-lg">
            From Sunday to Thursday, between 10am and 7pm.
          </p>
        </div>

        {/* Image */}
        <div className="mx-auto w-80 h-80w-80 p-5 border-2 border-zinc-800 rounded-full shadow-lg shadow-zinc-800 overflow-hidden ">
          <img
            src={customerService}
            alt="Customer Support"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default NeedHelpSection;
