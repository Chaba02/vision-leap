
import React from 'react';

const ChappFooter = () => {
  return (
    <footer className="bg-chapp-black py-8 px-6 sm:px-8 lg:px-20">
      <div className="container-chapp">
        <div className="text-center">
          <p className="text-body-sm text-chapp-gray-400">
            © 2025 Chapp. Tutti i diritti riservati.
          </p>
          <div className="flex justify-center items-center gap-6 mt-4">
            <a
              href="#"
              className="text-body-sm text-chapp-gray-500 hover:text-chapp-gray-300 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span className="w-1 h-1 bg-chapp-gray-600 rounded-full"></span>
            <a
              href="#"
              className="text-body-sm text-chapp-gray-500 hover:text-chapp-gray-300 transition-colors duration-300"
            >
              Termini di Servizio
            </a>
            <span className="w-1 h-1 bg-chapp-gray-600 rounded-full"></span>
            <a
              href="#"
              className="text-body-sm text-chapp-gray-500 hover:text-chapp-gray-300 transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-chapp-gray-800">
            <p className="text-caption text-chapp-gray-500">
              Specialisti in Web-App e Business Intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ChappFooter;
