import Image from "next/image";
import styles from "./page.module.css";
import VideoModal from "./components/VideoModal";
import GallerySlider from "./components/GallerySlider";
import InquiryForm from "./components/InquiryForm";
import HeroSection from "./components/HeroSection";

export default function Home() {
    return (
        <>

            {/* ==============================
    Hero Area
    ============================== */}
            <HeroSection />
            {/* ======== / Hero Section ======== */}

            {/* ==============================
    About Area
    ============================== */}
            <div className="space" id="about">
                <div className="container">
                    <div className="row flex-row-reverse align-items-center justify-content-between">
                        <div className="col-lg-7 ">
                            <div className="about-thumb mb-5 mb-lg-0 text-lg-end fade_left">
                                <img className="about-img-1" src="/assets/img/normal/about_1-1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="about-content-wrap title-anim">
                                <div className="title-area mb-0">
                                    <span className="sub-title">WHO WE ARE</span>
                                    <h2 className="sec-title">MORE THAN <br /> PHOTOS</h2>
                                    <p className="sec-text">At ImageryByB, we capture love and meaningful moments for those who want to feel something every time they look back. Based in Houston, Texas, our mission is simple: to give you more than photos and to give you proof that what you have is real. The way you laugh together, hold each other, exist together. That’s what we’re here for. Forever starts here.
                                    </p>
                                </div>
                                <div className="btn-wrap mt-40">
                                    <a href="#inquiry" className="btn">REACH OUT</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
    Service Area 01
    ============================== */}
            <div className="service-area-1 overflow-hidden">
                <div className="service-shape1_1 shape-mockup jump d-lg-block d-none" data-top="0" data-left="-5%">
                    <img src="/assets/img/normal/service_1-1.png" alt="img" />
                </div>
                <div className="container">
                    <div className="title-area text-center title-anim">
                        <span className="sub-title style2">HOW IT WORKS</span>
                        <h2 className="sec-title">THE PROCESS</h2>
                    </div>
                    <div className="row gx-90 gy-40 justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="service-card title-anim">
                                <div className="service-card_icon">
                                    <i className="fas fa-paper-plane" style={{ fontSize: '50px', color: 'var(--theme-color)' }}></i>
                                </div>
                                <div className="service-card_content">
                                    <h4 className="service-card_title h5">Step 1: Reach Out</h4>
                                    <p className="service-card_text">Submit your inquiry. We’ll take it from there.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="service-card title-anim">
                                <div className="service-card_icon">
                                    <i className="far fa-lightbulb" style={{ fontSize: '50px', color: 'var(--theme-color)' }}></i>
                                </div>
                                <div className="service-card_content">
                                    <h4 className="service-card_title h5">Step 2: Build the Vision</h4>
                                    <p className="service-card_text">We’ll schedule a call to get to know you, create a vision board, and map out the shots that matter most.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="service-card title-anim">
                                <div className="service-card_icon">
                                    <i className="fas fa-lock" style={{ fontSize: '50px', color: 'var(--theme-color)' }}></i>
                                </div>
                                <div className="service-card_content">
                                    <h4 className="service-card_title h5">Step 3: Lock It In</h4>
                                    <p className="service-card_text">Once you're ready, we’ll send the contract and deposit info to secure your date.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ==============================
    Video Area
    ============================== */}
            <div className="video-area-1 space-top overflow-hidden">
                <div className="container">
                    <div className="title-area text-center title-anim">
                        <span className="sub-title style2">ENJOY OUR MOMENTS</span>
                        <h2 className="sec-title">COME WITH US</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="video-wrap">
                                <div className="service-shape1_1 shape-mockup jump d-lg-block d-none z-index-3" data-top="-10%"
                                    data-right="-10%">
                                    <img src="/assets/img/normal/video-shape_1-1.png" alt="img" />
                                </div>
                                <div className="img-anim">
                                    <img src="/assets/img/normal/video_1-1.webp" alt="img" />
                                </div>
                                <VideoModal />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
    Counter Area
    ============================== */}
            <div className="counter-area-1" data-bg-src="/assets/img/bg/counter-1-bg.png">
                <div className="counter-wrap1 space counter-item">
                    <div className="container">
                        <div className="row gy-40 justify-content-lg-between justify-content-center">
                            <div className="col-sm-6 col-lg-auto">
                                <div className="counter-card">
                                    <div className="media-body">
                                        <h3 className="counter-card_number">
                                            <span className="odometer" data-odometer-final="256">.</span>
                                        </h3>
                                        <p className="counter-card_text">Weddings per year</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-auto">
                                <div className="counter-card">
                                    <div className="media-body">
                                        <h3 className="counter-card_number">
                                            <span className="odometer" data-odometer-final="28">.</span>
                                        </h3>
                                        <p className="counter-card_text">Years of celebration</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-auto">
                                <div className="counter-card">
                                    <div className="media-body">
                                        <h3 className="counter-card_number">
                                            <span className="odometer" data-odometer-final="1369">.</span>
                                        </h3>
                                        <p className="counter-card_text">Flower bouquest</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-auto">
                                <div className="counter-card">
                                    <div className="media-body">
                                        <h3 className="counter-card_number">
                                            <span className="odometer" data-odometer-final="256">.</span>
                                        </h3>
                                        <p className="counter-card_text">Sunny days per year</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-0">
                    <div className="marquee-wrap">
                        <div className="marquee__group">
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                            <div className="m-item">
                                Lets find some beautiful place to get lost
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
        Portfolio Area
    ============================== */}
            <div className="portfolio-area-1 space overflow-hidden" data-bg-src="/assets/img/bg/portfolio-1-bg.png">
                <div className="portfolio-shape1_1 shape-mockup jump d-lg-block d-none" data-top="0%" data-right="-10%">
                    <img src="/assets/img/normal/portfolio-shape_1-1.png" alt="img" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="title-area title-anim">
                                <span className="sub-title style2">WHAT WE OFFER</span>
                                <h2 className="sec-title">OUR SERVICES</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-30 masonary-active">
                        <div className="col-md-6 filter-item">
                            <h3 className="service-title mb-3" style={{ fontSize: '1.5rem', fontWeight: '600' }}>Wedding Photography</h3>
                            <div className="portfolio-thumb fade_left">
                                <a className="popup-image icon-btn" href="/assets/img/normal/byb.jpg"><i
                                    className="far fa-eye"></i></a>
                                <div className="img-anim">
                                    <img src="/assets/img/normal/byb.jpg" alt="portfolio" />
                                </div>
                                <div className="portfolio-details">
                                    <p>ImageryByB</p>
                                    <h3><a href="#">Wedding Photography</a></h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 filter-item">
                            <h3 className="service-title mb-3" style={{ fontSize: '1.5rem', fontWeight: '600' }}>Together Forever Session</h3>
                            <div className="portfolio-thumb fade_left">
                                <a className="popup-image icon-btn" href="/assets/img/portfolio/lopo.png"><i
                                    className="far fa-eye"></i></a>
                                <div className="img-anim">
                                    <img src="/assets/img/portfolio/lopo.png" alt="portfolio" />
                                </div>
                                <div className="portfolio-details">
                                    <p>Couples + Engagement</p>
                                    <h3><a href="#">Together Forever Session</a></h3>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* ==============================
    Gallery Area
    ============================== */}
            <div className="gallery-area-1 space overflow-hidden" id="gallery">
                <div className="container">
                    <div className="title-area text-center title-anim">
                        <span className="sub-title style2">MOMENTS CAPTURED</span>
                        <h2 className="sec-title">Through Our Lens</h2>
                    </div>
                    <GallerySlider />
                </div>
            </div>

            {/* ==============================
        Contact Areadddfsf
    ============================== */}

            <div className="contact-area-1 space overflow-hidden" id="inquiry" data-bg-src="/assets/img/bg/contact-1-bg.png">
                <div className="contact-shape1_1 shape-mockup jump d-lg-block d-none" data-top="0%" data-right="-8%">
                    <img src="/assets/img/normal/contact-shape_1-1.png" alt="img" />
                </div>
                <div className="contact-shape1_2 shape-mockup jump-reverse d-lg-block d-none" data-bottom="-3%" data-left="-12%">
                    <img src="/assets/img/normal/contact-shape_1-2.png" alt="img" />
                </div>
                <div className="container-fluid p-0">
                    <div className="contact-form-area space">
                        <div className="title-area text-center title-anim">
                            <span className="sub-title style2 text-white">READY TO START?
                            </span>
                            <h2 className="sec-title text-white">LETS CREATE MAGIC</h2>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <InquiryForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
    Testimonial Area
    ============================== */}
            <div className="testimonial-area-1 space-top overflow-hidden">
                <div className="container">
                    <div className="title-area title-anim">
                        <span className="sub-title style2">Feedbacks</span>
                        <h2 className="sec-title">Our Testimonials</h2>
                    </div>
                </div>
                <div className="container-fluid p-0">
                    <div className="row global-carousel testi-slider1" data-slide-show="3" data-lg-slide-show="2"
                        data-md-slide-show="2">
                        <div className="col-lg-4">
                            <div className="testi-box title-anim" data-bg-src="/assets/img/testimonial/testi_box-bg.html">
                                <div className="testi-box_thumb">
                                    <img src="/assets/img/testimonial/testi_1_1.html" alt="img" />
                                </div>
                                <div className="testi-box_profile">
                                    <h4 className="testi-box_name">Marks Daniel</h4>
                                    <span className="testi-box_desig">Writer, Photographer, Manager</span>
                                </div>
                                <p className="testi-box_text">&quot;Laculis primis leo pharetra ac varius diam class odio, turpis
                                    nascetur gravida senectus sollicitudin lacus cursus tortor&quot;</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testi-box title-anim" data-bg-src="/assets/img/testimonial/testi_box-bg.html">
                                <div className="testi-box_thumb">
                                    <img src="/assets/img/testimonial/testi_1_2.html" alt="img" />
                                </div>
                                <div className="testi-box_profile">
                                    <h4 className="testi-box_name">Louisa Abadie</h4>
                                    <span className="testi-box_desig">Writer, Photographer, Manager</span>
                                </div>
                                <p className="testi-box_text">&quot;Laculis primis leo pharetra ac varius diam class odio, turpis
                                    nascetur gravida senectus sollicitudin lacus cursus tortor&quot;</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testi-box title-anim" data-bg-src="/assets/img/testimonial/testi_box-bg.html">
                                <div className="testi-box_thumb">
                                    <img src="/assets/img/testimonial/testi_1_3.html" alt="img" />
                                </div>
                                <div className="testi-box_profile">
                                    <h4 className="testi-box_name">Andrew Daniel</h4>
                                    <span className="testi-box_desig">Writer, Photographer, Manager</span>
                                </div>
                                <p className="testi-box_text">&quot;Laculis primis leo pharetra ac varius diam class odio, turpis
                                    nascetur gravida senectus sollicitudin lacus cursus tortor&quot;</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testi-box title-anim" data-bg-src="/assets/img/testimonial/testi_box-bg.html">
                                <div className="testi-box_thumb">
                                    <img src="/assets/img/testimonial/testi_1_1.html" alt="img" />
                                </div>
                                <div className="testi-box_profile">
                                    <h4 className="testi-box_name">Marks Daniel</h4>
                                    <span className="testi-box_desig">Writer, Photographer, Manager</span>
                                </div>
                                <p className="testi-box_text">&quot;Laculis primis leo pharetra ac varius diam class odio, turpis
                                    nascetur gravida senectus sollicitudin lacus cursus tortor&quot;</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testi-box title-anim" data-bg-src="/assets/img/testimonial/testi_box-bg.html">
                                <div className="testi-box_thumb">
                                    <img src="/assets/img/testimonial/testi_1_2.html" alt="img" />
                                </div>
                                <div className="testi-box_profile">
                                    <h4 className="testi-box_name">Louisa Abadie</h4>
                                    <span className="testi-box_desig">Writer, Photographer, Manager</span>
                                </div>
                                <p className="testi-box_text">&quot;Laculis primis leo pharetra ac varius diam class odio, turpis
                                    nascetur gravida senectus sollicitudin lacus cursus tortor&quot;</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testi-box title-anim" data-bg-src="/assets/img/testimonial/testi_box-bg.html">
                                <div className="testi-box_thumb">
                                    <img src="/assets/img/testimonial/testi_1_3.html" alt="img" />
                                </div>
                                <div className="testi-box_profile">
                                    <h4 className="testi-box_name">Andrew Daniel</h4>
                                    <span className="testi-box_desig">Writer, Photographer, Manager</span>
                                </div>
                                <p className="testi-box_text">&quot;Laculis primis leo pharetra ac varius diam class odio, turpis
                                    nascetur gravida senectus sollicitudin lacus cursus tortor&quot;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
    Blog Area
    ============================== */}




            {/* ==============================
    Contact Info Area
    ============================== */}
            <div className="contact-area space" id="contact" data-bg-src="/assets/img/bg/contact-page-bg.html" style={{ marginTop: '-70px' }}>
                <div className="container">
                    <div className="row gy-4 justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="contact-info">
                                <div className="contact-icon">
                                    <i className="fas fa-map-marker-alt" style={{ fontSize: '48px', color: 'var(--theme-color)' }}></i>
                                </div>
                                <div className="contact-details">
                                    <h4 className="title">Office Address</h4>
                                    <span>Based in</span>
                                    <p>Houston, Texas</p>
                                    <p>Available for travel</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="contact-info">
                                <div className="contact-icon">
                                    <i className="fas fa-envelope" style={{ fontSize: '48px', color: 'var(--theme-color)' }}></i>
                                </div>
                                <div className="contact-details">
                                    <h4 className="title">Email Address</h4>
                                    <span>24/7 Anytime</span>
                                    <p>info@imagerybyb.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="contact-info">
                                <div className="contact-icon">
                                    <i className="fas fa-phone-alt" style={{ fontSize: '48px', color: 'var(--theme-color)' }}></i>
                                </div>
                                <div className="contact-details">
                                    <h4 className="title">Phone Number</h4>
                                    <span>24/7 Anytime</span>
                                    <p>+1 (346) 243-2684</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================
    Contact Form with Map
    ============================== */}

        </>
    );
}
