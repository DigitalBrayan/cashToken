import React, { useEffect, useRef } from "react";
import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra el plugin ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef(null); // Referencia para la sección
  const logoRef = useRef(null); // Referencia para el logo
  const descriptionRef = useRef(null); // Referencia para la descripción
  const footerLinksRef = useRef([]); // Referencia para los enlaces del pie de página
  const socialMediaRef = useRef([]); // Referencia para los íconos de redes sociales

  useEffect(() => {
    if (!sectionRef.current || !logoRef.current || !descriptionRef.current) return;

    // Animación para el logo y la descripción
    gsap.fromTo(
      [logoRef.current, descriptionRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animación para los enlaces del pie de página
    if (footerLinksRef.current.length > 0) {
      gsap.fromTo(
        footerLinksRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2, // Retraso escalonado para cada enlace
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Animación para los íconos de redes sociales
    if (socialMediaRef.current.length > 0) {
      gsap.fromTo(
        socialMediaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2, // Retraso escalonado para cada ícono
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.flexCenter} ${styles.paddingY} flex-col`}
    >
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-[1] flex flex-col justify-start mr-10">
          <img
            ref={logoRef}
            src={logo}
            alt="hoobank"
            className="w-[280px] h-[72.14px] object-contain"
          />
          <p
            ref={descriptionRef}
            className={`${styles.paragraph} mt-4 max-w-[312px]`}
          >
            Una nueva forma de hacer los pagos fácil, confiable y seguro.
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) {
              footerLinksRef.current = Array.from(el.children);
            }
          }}
          className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10"
        >
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
            >
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={(el) => {
          if (el) {
            socialMediaRef.current = Array.from(el.children);
          }
        }}
        className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]"
      >
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
          Copyright Ⓒ 2022 CashToken. Todos los derechos reservados.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              ref={(el) => {
                if (el) {
                  socialMediaRef.current[index] = el;
                }
              }}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
