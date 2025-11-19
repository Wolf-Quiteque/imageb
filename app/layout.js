import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>ImageryByB - Wedding & Event Photography</title>
        <meta name="description" content="ImageryByB - Capturing love and meaningful moments in Houston, Texas." />
        <meta name="keywords" content="ImageryByB, Wedding Photography, Houston, Texas, Couples, Engagement" />
        <meta name="robots" content="INDEX,FOLLOW" />

        {/* Mobile Specific Metas */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Favicons - Place favicon.ico in the root directory */}
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicons/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/assets/img/favicons/ms-icon-144x144.html" />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&amp;family=Prompt:wght@100;200;300;400;500;600;700;800&amp;display=swap"
          rel="stylesheet"
        />

        {/* All CSS File */}
        {/* Bootstrap */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        {/* Fontawesome Icon */}
        <link rel="stylesheet" href="/assets/css/all.min.css" />
        {/* Magnific Popup */}
        <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
        {/* Slick Slider */}
        <link rel="stylesheet" href="/assets/css/slick.min.css" />
        {/* Odometer */}
        <link rel="stylesheet" href="/assets/css/odometer.css" />
        {/* Theme Custom CSS */}
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body suppressHydrationWarning>
        {/* Cursor */}
        <div className="cursor"></div>
        <div className="cursor-follower"></div>
        {/* Cursor End */}

        {/*==============================
        Preloader
    ==============================*/}
        {/* <div className="preloader ">
          <div className="preloader-inner">
            <img src="/assets/img/logo-white.svg" alt="ovation" />
            <span className="loader"></span>
          </div>
        </div> */}

        <div className="sidemenu-wrapper">
          <div className="sidemenu-content">
            <button className="closeButton sideMenuCls"><i className="fas fa-times"></i></button>
            <div className="widget footer-widget">
              <div className="widget-about">
                <div className="footer-logo">
                  <a href="index.html"><img src="/assets/img/imageryb2b-logo-white.webp" alt="Ovation" /></a>
                </div>
                <p className="about-text">At ImageryByB, we capture love and meaningful moments for those who want to feel something every time they look back.</p>
                <div className="social-btn style2">
                  <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
                  <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                  <a href="https://pinterest.com/"><i className="fab fa-pinterest-p"></i></a>
                  <a href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="widget widget_nav_menu footer-widget">
              <h3 className="widget_title">Quick Links</h3>
              <ul className="menu">
                <li><a href="project-details.html">Together Forever Session</a></li>
                <li><a href="blog.html">Magazine</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="reservation.html">Schedule</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/*==============================
        Mobile Menu
    ============================== */}
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-area text-center">
            <button className="menu-toggle"><i className="fas fa-times"></i></button>
            <div className="mobile-logo">
              <a href="index.html"><img src="/assets/img/imageryb2b-logo.webp" alt="Ovation" /></a>
            </div>
            <div className="mobile-menu">
              <ul>
                <li><a href="project-details.html">Together Forever Session</a></li>
                <li><a href="blog.html">Magazine</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="reservation.html">Schedule</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/*==============================
        Header Area
    ==============================*/}
        <header className="nav-header header-layout1">
          <div className="header-top">
            <div className="container-fluid">
              <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
                <div className="col-auto d-none d-lg-block">
                  <div className="header-links">
                    <ul>
                      <li><i className="far fa-clock"></i>Working: 8.00am - 5.00pm</li>
                      <li><i className="far fa-envelope"></i><a
                        href="mailto:info@imagerybyb.com">info@imagerybyb.com</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="header-links">
                    <ul>
                      <li className="d-none d-sm-block">
                        <ul className="header-sub-links">
                          <li><a href="contact.html">Help</a></li>
                          <li><a href="contact.html">Support</a></li>
                          <li><a href="contact.html">Contact</a></li>
                        </ul>
                      </li>
                      <li>
                        <div className="social-links">
                          <span className="me-2">Visit Us:</span>
                          <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                          <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                          <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                          <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky-wrapper">
            {/* Main Menu Area */}
            <div className="menu-area">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto">
                    <div className="header-logo">
                      <a href="index.html"><img src="/assets/img/imageryb2b-logo.webp" alt="logo" /></a>
                    </div>
                  </div>
                  <div className="col-auto">
                    <nav className="main-menu d-none d-lg-inline-block">
                      <ul>
                        <li><a href="project-details.html">Together Forever Session</a></li>
                        <li><a href="blog.html">Magazine</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="reservation.html">Schedule</a></li>
                        <li><a href="contact.html">Contact</a></li>
                      </ul>
                    </nav>
                    <div className="navbar-right d-inline-flex d-lg-none">
                      <button type="button" className="menu-toggle icon-btn"><i className="fas fa-bars"></i></button>
                    </div>
                  </div>
                  <div className="col-auto d-none d-lg-block">
                    <div className="header-button">
                      <a href="contact.html" className="btn d-none d-xl-block">
                        Inquire Now
                      </a>
                      <button type="button" className="sidebar-btn sideMenuToggler">
                        Menu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}




        {/*==============================
        Footer Area
    ==============================*/}
        <footer className="footer-wrapper footer-layout1 overflow-hidden" data-bg-src="/assets/img/bg/footer-1-bg.html">
          <div className="shape-mockup footer1-shape1 jump" data-top="20%" data-left="-2%">
            <img src="/assets/img/normal/footer-1-shape1.html" alt="img" />
          </div>
          <div className="shape-mockup footer1-shape2 jump-reverse" data-top="-10%" data-right="-10%">
            <img src="/assets/img/normal/footer-1-shape2.html" alt="img" />
          </div>
          <div className="container">
            <div className="footer-top">
              <div className="row align-items-center justify-content-between">
                <div className="col-sm-auto">
                  <div className="footer-logo mb-40 mb-sm-0">
                    <a href="index.html"><img src="/assets/img/imageryb2b-logo.webp" alt="logo" /></a>
                  </div>
                </div>
                <div className="col-sm-auto">
                  <div className="social-btn style2">
                    <a href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                    <a href="https://behance.com/"><i className="fab fa-behance"></i></a>
                    <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget-area">
              <div className="row justify-content-between">
                <div className="col-md-6 col-xl-3 col-lg-4">
                  <div className="widget footer-widget">
                    <div className="widget-contact">
                      <h3 className="widget_title">Contact Info</h3>
                      <ul className="contact-info-list">
                        <li>Based in Houston, Texas</li>
                        <li>Phone: +1 (346) 243-2684</li>
                        <li>E-mail: info@imagerybyb.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-auto col-lg-4">
                  <div className="widget widget_nav_menu footer-widget">
                    <h3 className="widget_title">Information</h3>
                    <div className="menu-all-pages-container list-column2">
                      <ul className="menu">
                        <li><a href="project-details.html">Together Forever Session</a></li>
                        <li><a href="blog.html">Magazine</a></li>
                        <li><a href="about.html">About</a></li>
                      </ul>
                      <ul className="menu">
                        <li><a href="reservation.html">Schedule</a></li>
                        <li><a href="contact.html">Contact</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="widget footer-widget">
                    <h3 className="widget_title">Subscribe Now</h3>
                    <p className="footer-text">Don’t worry we don’t spam your email</p>
                    <form className="newsletter-form">
                      <div className="form-group">
                        <input className="form-control" type="email" placeholder="Email Address" required />
                      </div>
                      <button type="submit" className="btn">SUBSCRIBE</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-menu-area">
              <ul className="footer-menu-list">
                <li>
                  <a href="project-details.html">TOGETHER FOREVER SESSION</a>
                </li>
                <li>
                  <a href="blog.html">MAGAZINE</a>
                </li>
                <li>
                  <a href="about.html">ABOUT</a>
                </li>
                <li>
                  <a href="reservation.html">SCHEDULE</a>
                </li>
                <li>
                  <a href="contact.html">CONTACT</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright-wrap text-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-auto align-self-center">
                  <p className="copyright-text">© 2025 </p>
                  <p className="copyright-text"><a href="#">ImageryByB.</a> All Rights Reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="scroll-top">
          <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
              style={{ transition: "stroke-dashoffset 10ms linear 0s", strokeDasharray: "307.919, 307.919", strokeDashoffset: "307.919" }}>
            </path>
          </svg>
        </div>

        {/*==============================
        All Js File
    ============================== */}
        {/* Jquery */}
        <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        {/* Slick Slider */}
        <Script src="/assets/js/slick.min.js" />
        {/* Bootstrap */}
        <Script src="/assets/js/bootstrap.min.js" />
        {/* Magnific Popup */}
        <Script src="/assets/js/jquery.magnific-popup.min.js" />
        {/* Counter Up */}
        <Script src="/assets/js/jquery.counterup.min.js" />
        {/* Range Slider */}
        <Script src="/assets/js/jquery-ui.min.js" />
        {/* odometer */}
        <Script src="/assets/js/odometer.min.js" />
        <Script src="/assets/js/viewport.jquery.js" />


        {/* Isotope Filter */}
        <Script src="/assets/js/imagesloaded.pkgd.min.js" />
        <Script src="/assets/js/isotope.pkgd.min.js" />
        {/* gsap */}
        <Script src="/assets/js/gsap.min.js" />
        <Script src="/assets/js/ScrollSmoother.min.js" />
        <Script src="/assets/js/ScrollTrigger.min.js" />
        <Script src="/assets/js/SplitText.min.js" />

        {/* Main Js File */}
        <Script src="/assets/js/main.js" />
      </body>


    </html >
  );
}
