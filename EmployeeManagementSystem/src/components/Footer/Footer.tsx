// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer text-center">
      <div className="container pt-4">
        <section className="mb-4">
          <a className="btn btn-link btn-floating btn-lg footer-icon m-1" href="#!" role="button"><FaFacebookF /></a>
          <a className="btn btn-link btn-floating btn-lg footer-icon m-1" href="#!" role="button"><FaTwitter /></a>
          <a className="btn btn-link btn-floating btn-lg footer-icon m-1" href="#!" role="button"><FaGoogle /></a>
          <a className="btn btn-link btn-floating btn-lg footer-icon m-1" href="#!" role="button"><FaInstagram /></a>
          <a className="btn btn-link btn-floating btn-lg footer-icon m-1" href="#!" role="button"><FaLinkedinIn /></a>
          <a className="btn btn-link btn-floating btn-lg footer-icon m-1" href="#!" role="button"><FaGithub /></a>
        </section>
      </div>

      <div className="text-center p-3">
        <span className='p'>© {new Date().getFullYear()} Copyright:</span>
        <a className="text-white ms-1" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>
  );
};

export default Footer;
