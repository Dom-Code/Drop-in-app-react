import React from 'react';

function Footer() {
  return (
    <footer id="footer-container">
      <small className="f6 db tc">
        © 2022
        <b className="ttu"> Dropin Inc</b>
        ., All Rights Reserved
      </small>
      <div className="tc mt3">
        <a href="/" title="Language" className="f6 dib ph2 link mid-gray dim disabled">Language</a>
        <a href="/" title="Terms" className="f6 dib ph2 link mid-gray dim disabled">Terms of Use</a>
        <a href="/" title="Privacy" className="f6 dib ph2 link mid-gray dim">Privacy</a>
      </div>
    </footer>
  );
}

export default Footer;
