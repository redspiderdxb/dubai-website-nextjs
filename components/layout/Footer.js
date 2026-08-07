import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const services = [
        { name: 'Web Development', path: '/design-and-developemnt' },
        { name: 'Brochure Designing', path: '/brochure-design' },
        { name: 'Graphic Designing', path: '/graphic-design' },
        { name: 'E-commerce Development', path: '/ecommerce-developemnt' },
        { name: 'Email Marketing', path: '/email-marketing' },
        { name: 'Web Hosting', path: '/web-hositng' },
        { name: 'Logo Designing', path: '/logo-designing' },
        { name: 'Mobile App Development', path: '/mobile-app-developemnt' },
    ];

    const footerLinks = [
        { name: 'Home', path: '/' },
        { name: 'About us', path: '/aboutus' },
        { name: 'Our Work', path: '/our-work' },
        { name: 'Careers', path: '/careers' },
    ];

    const socialIcons = [
        { name: 'Facebook', icon: 'fb.svg', link: '#' },
        { name: 'Instagram', icon: 'insta.svg', link: '#' },
        { name: 'LinkedIn', icon: 'linke.svg', link: '#' },
        { name: 'YouTube', icon: 'youtube.svg', link: '#' },
    ];

    return (
        <>
            <footer className="rs-footer-sec py-5 dark-background" style={{ overflow: 'hidden' }}>
                <div className="container" style={{ maxWidth: '1600px', padding: '0 20px' }}>
                    {/* Top Row */}
                    <div className="row align-items-start gy-5">
                        {/* Left - Heading */}
                        <div 
                            className="col-lg-5 position-relative" 
                            data-aos="fade-right" 
                            data-aos-duration="900" 
                            data-aos-once="true"
                        >
                            <h2 className="rs-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                                Power up your website <br /> with <span style={{ color: '#e31e24' }}>our experts</span>
                            </h2>
                            <Image 
                                src="/assets/img/swim.png" 
                                alt="RedSpider swimming towards success" 
                                className="swim-foot" 
                                width={100} 
                                height={80} 
                                style={{ marginTop: '20px' }}
                            />
                        </div>

                        {/* Middle - Services */}
                        <div className="col-lg-4">
                            <ul className="rs-services" style={{ 
                                listStyle: 'none', 
                                padding: 0, 
                                columns: '2',
                                columnGap: '20px'
                            }}>
                                {services.map((service, index) => (
                                    <li 
                                        key={index}
                                        style={{ 
                                            marginBottom: '10px',
                                            breakInside: 'avoid'
                                        }}
                                        data-aos="fade-up" 
                                        data-aos-delay={index * 80} 
                                        data-aos-duration="600" 
                                        data-aos-once="true"
                                    >
                                        <Link 
                                            href={service.path}
                                            style={{ 
                                                color: '#fff', 
                                                textDecoration: 'none',
                                                fontSize: '15px',
                                                transition: 'color 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#e31e24'}
                                            onMouseLeave={(e) => e.target.style.color = '#fff'}
                                        >
                                            {service.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right - Contact */}
                        <div className="col-lg-3">
                            {/* Email */}
                            <div 
                                className="rs-contact-card red" 
                                style={{
                                    background: '#e31e24',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    color: '#fff'
                                }}
                                data-aos="fade-left" 
                                data-aos-delay="100" 
                                data-aos-duration="800" 
                                data-aos-once="true"
                            >
                                <small style={{ opacity: 0.8 }}>Get Questions?</small>
                                <h5 style={{ margin: '5px 0 0' }}>
                                    <a href="mailto:info@redspider.ae" style={{ color: '#fff', textDecoration: 'none' }}>
                                        info@redspider.ae
                                    </a>
                                </h5>
                                <span className="rs-icon" style={{ position: 'absolute', right: '15px', top: '15px' }}>
                                    <Image src="/assets/img/icons/email.svg" alt="Email" width={30} height={30} />
                                </span>
                            </div>
                            
                            {/* Phone */}
                            <div 
                                className="rs-contact-card dark mt-3" 
                                style={{
                                    background: '#1a1a2e',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                                data-aos="fade-left" 
                                data-aos-delay="250" 
                                data-aos-duration="800" 
                                data-aos-once="true"
                            >
                                <small style={{ opacity: 0.8 }}>Quick Answer?</small>
                                <h5 style={{ margin: '5px 0 0' }}>
                                    <a href="tel:+971555515475" style={{ color: '#fff', textDecoration: 'none' }}>
                                        +971 55 5515475
                                    </a>
                                </h5>
                                <span className="rs-icon" style={{ position: 'absolute', right: '15px', top: '15px' }}>
                                    <Image src="/assets/img/icons/ph-foot.svg" alt="Phone" width={30} height={30} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="row rs-footer-bottom align-items-end border-0" style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        {/* Left - Menu */}
                        <div className="col-lg-2 col-md-3">
                            <ul className="rs-menu" style={{ 
                                listStyle: 'none', 
                                padding: 0,
                                margin: 0
                            }}>
                                {footerLinks.map((link, index) => (
                                    <li 
                                        key={index}
                                        style={{ 
                                            marginBottom: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                        data-aos="fade-up" 
                                        data-aos-delay={index * 100} 
                                        data-aos-duration="600" 
                                        data-aos-once="true"
                                    >
                                        <span style={{ 
                                            color: '#e31e24', 
                                            fontWeight: 'bold',
                                            fontSize: '14px'
                                        }}>
                                            0{index + 1}
                                        </span>
                                        <Link 
                                            href={link.path}
                                            style={{ 
                                                color: '#fff', 
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                transition: 'color 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#e31e24'}
                                            onMouseLeave={(e) => e.target.style.color = '#fff'}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right - Copyright + Social */}
                        <div className="col-lg-10 col-md-9">
                            <div className="row align-items-center gy-3">
                                {/* Copyright */}
                                <div className="col-lg-4 col-md-12 text-md-start text-center">
                                    <p style={{ 
                                        color: '#aaa', 
                                        fontSize: '13px',
                                        margin: 0
                                    }}>
                                        © Copyright 2026, RedSpider. All Rights Reserved.
                                    </p>
                                </div>

                                {/* Social Icons */}
                                <div className="col-lg-4 col-md-12 text-center">
                                    <div className="rs-social" style={{ 
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}>
                                        {socialIcons.map((social, index) => (
                                            <a 
                                                key={index}
                                                href={social.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                aria-label={social.name}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '32px',
                                                    height: '32px',
                                                    background: 'rgba(255,255,255,0.08)',
                                                    borderRadius: '50%',
                                                    transition: 'all 0.3s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = '#e31e24';
                                                    e.target.style.transform = 'translateY(-3px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'rgba(255,255,255,0.08)';
                                                    e.target.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <Image 
                                                    src={`/assets/img/social/${social.icon}`} 
                                                    alt={social.name} 
                                                    width={16} 
                                                    height={16} 
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="col-lg-4 col-md-12 text-md-end text-center">
                                    <div className="rs-footer-links" style={{ 
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '15px',
                                        flexWrap: 'wrap'
                                    }}>
                                        <Link 
                                            href="/faq"
                                            style={{ 
                                                color: '#aaa', 
                                                textDecoration: 'none',
                                                fontSize: '13px',
                                                transition: 'color 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#e31e24'}
                                            onMouseLeave={(e) => e.target.style.color = '#aaa'}
                                        >
                                            FAQ's
                                        </Link>
                                        <Link 
                                            href="/blog"
                                            style={{ 
                                                color: '#aaa', 
                                                textDecoration: 'none',
                                                fontSize: '13px',
                                                transition: 'color 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#e31e24'}
                                            onMouseLeave={(e) => e.target.style.color = '#aaa'}
                                        >
                                            Blog
                                        </Link>
                                        <Link 
                                            href="/contactus"
                                            style={{ 
                                                color: '#aaa', 
                                                textDecoration: 'none',
                                                fontSize: '13px',
                                                transition: 'color 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#e31e24'}
                                            onMouseLeave={(e) => e.target.style.color = '#aaa'}
                                        >
                                            Get In Touch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll Top */}
            {showScrollTop && (
                <button 
                    id="scroll-top" 
                    className="scroll-top d-flex align-items-center justify-content-center"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '20px',
                        width: '45px',
                        height: '45px',
                        background: '#e31e24',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        fontSize: '24px',
                        cursor: 'pointer',
                        zIndex: '999',
                        boxShadow: '0 4px 15px rgba(227,30,36,0.4)',
                        transition: 'all 0.3s'
                    }}
                >
                    <i className="bi bi-arrow-up-short"></i>
                </button>
            )}

            {/* Fixed Contact */}
            <div className="rs-fixed-contact" style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                zIndex: '999'
            }}>
                <a
                    className="rs-fixed-contact__button rs-fixed-contact__button--whatsapp"
                    href="https://wa.me/971555515475"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '55px',
                        height: '55px',
                        borderRadius: '50%',
                        background: '#25d366',
                        boxShadow: '0 4px 15px rgba(37,211,102,0.4)',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: '#fff' }}>
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1.01 1.01 0 0 0-1.03.24l-1.57 1.97a15.18 15.18 0 0 1-6.91-6.91l1.97-1.68c.3-.3.39-.72.24-1.1a11.3 11.3 0 0 1-.56-3.53c0-.54-.45-.99-.99-.99H4.18c-.54 0-1.18.24-1.18.99C3 13.11 10.69 20.8 19.99 20.8c.71 0 1.01-.63 1.01-1.18v-3.25c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                </a>

                <a
                    className="rs-fixed-contact__button rs-fixed-contact__button--phone"
                    href="tel:+971555515475"
                    aria-label="Call us"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '55px',
                        height: '55px',
                        borderRadius: '50%',
                        background: '#e31e24',
                        boxShadow: '0 4px 15px rgba(227,30,36,0.4)',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: '#fff' }}>
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1.01 1.01 0 0 0-1.03.24l-1.57 1.97a15.18 15.18 0 0 1-6.91-6.91l1.97-1.68c.3-.3.39-.72.24-1.1a11.3 11.3 0 0 1-.56-3.53c0-.54-.45-.99-.99-.99H4.18c-.54 0-1.18.24-1.18.99C3 13.11 10.69 20.8 19.99 20.8c.71 0 1.01-.63 1.01-1.18v-3.25c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                </a>
            </div>
        </>
    );
}