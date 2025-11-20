'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const sliderRef = useRef(null);

    useEffect(() => {
        const $ = window.jQuery;
        if (!$ || !$.fn.slick) return;

        const slider = $(sliderRef.current);

        // Helper to get data attributes
        const d = (data) => slider.data(data);

        // Set Background Image
        slider.find("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });

        // Custom Arrow Button
        const prevButton =
            '<button type="button" class="slick-prev"><i class="' +
            d("prev-arrow") +
            '"></i></button>';
        const nextButton =
            '<button type="button" class="slick-next"><i class="' +
            d("next-arrow") +
            '"></i></button>';

        // Initialize Slick
        if (!slider.hasClass('slick-initialized')) {
            slider.slick({
                dots: d("dots") ? true : false,
                fade: d("fade") ? true : false,
                arrows: d("arrows") ? true : false,
                speed: d("speed") ? d("speed") : 1000,
                sliderNavfor: d("slidernavfor") ? d("slidernavfor") : false,
                autoplay: d("autoplay") == false ? false : true,
                infinite: d("infinite") == false ? false : true,
                slidesToShow: d("slide-show") ? d("slide-show") : 1,
                adaptiveHeight: d("adaptive-height") ? true : false,
                centerMode: d("center-mode") ? true : false,
                autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
                centerPadding: d("center-padding") ? d("center-padding") : "0",
                focusOnSelect: d("focuson-select") == false ? false : true,
                pauseOnFocus: d("pauseon-focus") ? true : false,
                pauseOnHover: d("pauseon-hover") ? true : false,
                variableWidth: d("variable-width") ? true : false,
                vertical: d("vertical") ? true : false,
                verticalSwiping: d("vertical") ? true : false,
                prevArrow: d("prev-arrow")
                    ? prevButton
                    : '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
                nextArrow: d("next-arrow")
                    ? nextButton
                    : '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
                rtl: $("html").attr("dir") == "rtl" ? true : false,
                responsive: [
                    {
                        breakpoint: 1600,
                        settings: {
                            arrows: d("xl-arrows") ? true : false,
                            dots: d("xl-dots") ? true : false,
                            slidesToShow: d("xl-slide-show")
                                ? d("xl-slide-show")
                                : d("slide-show"),
                            centerMode: d("xl-center-mode") ? true : false,
                            centerPadding: "0",
                        },
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            arrows: d("ml-arrows") ? true : false,
                            dots: d("ml-dots") ? true : false,
                            slidesToShow: d("ml-slide-show")
                                ? d("ml-slide-show")
                                : d("slide-show"),
                            centerMode: d("ml-center-mode") ? true : false,
                            centerPadding: 0,
                        },
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: d("lg-arrows") ? true : false,
                            dots: d("lg-dots") ? true : false,
                            slidesToShow: d("lg-slide-show")
                                ? d("lg-slide-show")
                                : d("slide-show"),
                            centerMode: d("lg-center-mode")
                                ? d("lg-center-mode")
                                : false,
                            centerPadding: 0,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: d("md-arrows") ? true : false,
                            dots: d("md-dots") ? true : false,
                            slidesToShow: d("md-slide-show")
                                ? d("md-slide-show")
                                : 1,
                            centerMode: d("md-center-mode")
                                ? d("md-center-mode")
                                : false,
                            centerPadding: 0,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: d("sm-arrows") ? true : false,
                            dots: d("sm-dots") ? true : false,
                            slidesToShow: d("sm-slide-show")
                                ? d("sm-slide-show")
                                : 1,
                            centerMode: d("sm-center-mode")
                                ? d("sm-center-mode")
                                : false,
                            centerPadding: 0,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            arrows: d("xs-arrows") ? true : false,
                            dots: d("xs-dots") ? true : false,
                            slidesToShow: d("xs-slide-show")
                                ? d("xs-slide-show")
                                : 1,
                            centerMode: d("xs-center-mode")
                                ? d("xs-center-mode")
                                : false,
                            centerPadding: 0,
                        },
                    },
                ],
            });
        }

        // Animation Logic
        const initAnimations = () => {
            slider.find('[data-ani-duration]').each(function () {
                var durationTime = $(this).data('ani-duration');
                $(this).css('animation-duration', durationTime);
            });

            slider.find('[data-ani-delay]').each(function () {
                var delayTime = $(this).data('ani-delay');
                $(this).css('animation-delay', delayTime);
            });

            slider.find('[data-ani]').each(function () {
                var animaionName = $(this).data('ani');
                $(this).addClass(animaionName);
                // Only add slider-animated to current slide initially
                if ($(this).closest('.slick-current').length) {
                    $(this).addClass('slider-animated');
                }
            });
        };

        initAnimations();

        // After Change Event for Animations
        slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $(slick.$slides).find('[data-ani]').removeClass('slider-animated');
            $(slick.$slides[currentSlide]).find('[data-ani]').addClass('slider-animated');
        });

        return () => {
            if (slider.hasClass('slick-initialized')) {
                slider.slick('unslick');
            }
        };
    }, []);

    return (
        <div className="hero-wrapper hero-1" id="hero">
            <div
                className="global-carousel"
                id="heroSlider1"
                ref={sliderRef}
                data-fade="true"
                data-slide-show="1"
                data-lg-slide-show="1"
                data-md-slide-show="1"
                data-sm-slide-show="1"
                data-xs-slide-show="1"
                data-arrows="false"
                data-autoplay-speed="3000"
                data-infinite="true"
            >
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
                                        <a href="#" className="btn style2">BOOK YOUR DATE</a>
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
                                        <a href="#" className="btn style2">START YOUR STORY</a>
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
    );
}
