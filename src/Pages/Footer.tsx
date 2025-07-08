import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-900 py-4 mt-10">
      <div className="pr-4 text-end text-sm">
        <p>
          © {new Date().getFullYear()} | Built by{' '}
          <a
            href="https://github.com/okedo01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:underline"
          >
            Okedo01
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
