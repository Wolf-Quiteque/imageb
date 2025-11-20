import Image from "next/image";
import styles from "./page.module.css";
import VideoModal from "./components/VideoModal";
import GallerySlider from "./components/GallerySlider";

export default function Home() {
    return (
        <>

            {/* ==============================
    Hero Area
    ============================== */}
            <div className="hero-wrapper hero-1" id="hero">
                <div className="global-carousel" id="heroSlider1" data-fade="true" data-slide-show="1" data-lg-slide-show="1"
                    data-md-slide-show="1" data-sm-slide-show="1" data-xs-slide-show="1" data-arrows="false" data-autoplay-speed="3000">
                    <div className="hero-slider" data-bg-src="/assets/img/hero/hero_bg_1_1.png">
                        <div className="hero-shape1_1 shape-mockup movingX" data-bottom="0" data-left="0">
                            <img src="/assets/img/hero/hero_shape_1_1.png" alt="img" />
                        </div>
                        <div className="hero-shape1_2 shape-mockup movingX" data-top="-25%" data-right="35%">
                            <img src="/assets/img/hero/hero_shape_1_2.png" alt="img" />
                        </div>
                        <div className="container">
                            <div className="row flex-row-reverse">

                                <div className="col-lg-6 col-md-12">
                                    <div className="hero-style1">
                                        <span className="hero-subtitle d-none d-md-block" data-ani="slideindown" data-ani-delay="0.5s">Your Love Story Deserves</span>
                                        <span className="hero-subtitle2 d-none d-md-block" data-ani="slideindown" data-ani-delay="0.4s">Every stolen glance, every joyful tear, every promise whispered.</span>
                                        <h1 className="hero-title" data-ani="slideindown" data-ani-delay="0.1s">WEDDING DAY</h1>
                                        <h1 className="hero-title" data-ani="slideinup" data-ani-delay="0.1s">MAGIC</h1>
                                        <div className="btn-group" data-ani="slideinup" data-ani-delay="0.4s">
                                            <a href="contact.html" className="btn style2">BOOK YOUR DATE</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 align-self-end">
                                    <div className="hero-thumb1" data-ani="slideinleft" data-ani-delay="0.1s">
                                        <img src="/assets/img/hero/hero_1_1.png" alt="img" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="hero-slider" data-bg-src="/assets/img/hero/hero_bg_1_1.png">
                        <div className="hero-shape1_1 shape-mockup movingX" data-bottom="0" data-left="0">
                            <img src="/assets/img/hero/hero_shape_1_1.png" alt="img" />
                        </div>
                        <div className="hero-shape1_2 shape-mockup movingX" data-top="-25%" data-right="35%">
                            <img src="/assets/img/hero/hero_shape_1_2.png" alt="img" />
                        </div>
                        <div className="container">
                            <div className="row flex-row-reverse">

                                <div className="col-lg-6 col-md-12">
                                    <div className="hero-style1">
                                        <span className="hero-subtitle d-none d-md-block" data-ani="slideindown" data-ani-delay="0.5s">Celebrate Your Forever</span>
                                        <span className="hero-subtitle2 d-none d-md-block" data-ani="slideindown" data-ani-delay="0.4s">The way you laugh together, hold each other, love each other—captured beautifully.</span>
                                        <h1 className="hero-title" data-ani="slideindown" data-ani-delay="0.1s">TOGETHER FOREVER</h1>
                                        <h1 className="hero-title" data-ani="slideinup" data-ani-delay="0.1s">SESSIONS</h1>
                                        <div className="btn-group" data-ani="slideinup" data-ani-delay="0.4s">
                                            <a href="contact.html" className="btn style2">START YOUR STORY</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 align-self-end">
                                    <div className="hero-thumb1" data-ani="slideinleft" data-ani-delay="0.1s">
                                        <img src="/assets/img/hero/hero_1_2.png" alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ======== / Hero Section ======== */}

            {/* ==============================
    About Area
    ============================== */}
            <div className="space">
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
                                    <a href="contact.html" className="btn">REACH OUT</a>
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
                            <div className="portfolio-thumb fade_left">
                                <a className="popup-image icon-btn" href="/assets/img/normal/byb.jpg"><i
                                    className="far fa-eye"></i></a>
                                <div className="img-anim">
                                    <img src="/assets/img/normal/byb.jpg" alt="portfolio" />
                                </div>
                                <div className="portfolio-details">
                                    <p>ImageryByB</p>
                                    <h3><a href="project-details.html">Wedding Photography</a></h3>
                                </div>
                            </div>
                        </div>

                           <div className="col-md-6 filter-item">
                            <div className="portfolio-thumb fade_left">
                                <a className="popup-image icon-btn" href="/assets/img/portfolio/lopo.png"><i
                                    className="far fa-eye"></i></a>
                                <div className="img-anim">
                                    <img src="/assets/img/portfolio/lopo.png" alt="portfolio" />
                                </div>
                                 <div className="portfolio-details">
                                    <p>Couples + Engagement</p>
                                    <h3><a href="project-details.html">Together Forever Session</a></h3>
                                </div>
                            </div>
                        </div>
                   
                 
                    </div>
                </div>
            </div>

            {/* ==============================
    Gallery Area
    ============================== */}
            <div className="gallery-area-1 space overflow-hidden">
                <div className="container">
                    <div className="title-area text-center title-anim">
                        <span className="sub-title style2">PRESERVE YOUR MEMORIES</span>
                        <h2 className="sec-title">Keepsakes & Prints</h2>
                    </div>
                    <GallerySlider />
                </div>
            </div>

            {/* ==============================
        Contact Areadddfsf
    ============================== */}
    
            <div className="contact-area-1 space overflow-hidden" data-bg-src="/assets/img/bg/contact-1-bg.png">
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
                        <div className="row">
                            <div className="col-lg-12">
                                <form action="https://tfhtml.themepul.com/ovation/demo/mail.php" method="POST"
                                    className="contact-form ajax-contact">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group form-icon-left">
                                                <i className="far fa-user"></i>
                                                <input type="text" className="form-control style-border" name="name" id="name"
                                                    placeholder="Enter full name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group form-icon-left">
                                                <i className="far fa-envelope"></i>
                                                <input type="text" className="form-control style-border" name="email" id="email"
                                                    placeholder="Enter email address" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group form-icon-left">
                                                <i className="far fa-calendar"></i>
                                                <input type="date" className="form-control style-border" name="date" id="date" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group form-icon-left">
                                                <i className="far fa-calendar"></i>
                                                <input type="text" className="form-control style-border" name="number" id="number"
                                                    placeholder="Number of guest" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group form-icon-left">
                                                <i className="far fa-calendar"></i>
                                                <input type="text" className="form-control style-border" name="message" id="meal"
                                                    placeholder="Meal preference" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-btn col-12 text-center">
                                        <button type="submit" className="btn">MAKE RESERVATION</button>
                                    </div>
                                </form>
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
        

        </>
    );
}
