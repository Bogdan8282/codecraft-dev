import React from "react";
import { Link } from "react-router-dom";

const ContactUs: React.FC = () => {
  return (
    <div className="w-full mx-auto flex items-center px-6 h-[calc(100vh-160px)]">
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 w-1/2 text-left justify-center">
          <h2>Зворотній зв'язок</h2>
          <p>
            Якщо у вас виникли питання щодо нашого сервісу або вам потрібна
            допомога, відправте нам електронний лист за адресою{" "}
            <Link to="mailto:bogdanmatrofajlo@gmail.com" className="text-white">
              bogdanmatrofajlo@gmail.com
            </Link>{" "}
            і ми обов'язково вам допоможемо.
          </p>
          <p>
            Наша служба підтримки зазвичай відповідає не пізніше ніж через 24
            години.
          </p>
        </div>
        <img src="customer-support.jpg" alt="headphones" className="w-1/2 rounded-lg" />
      </div>
    </div>
  );
};

export default ContactUs;
