import React, { useEffect, useRef } from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra el plugin ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ icon, title, content, index, cardRef }) => (
  <div
    ref={cardRef}
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="icono" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  const featureRefs = useRef([]);
  const textRef = useRef(null); // Referencia para el texto

  useEffect(() => {
    // Animación para las tarjetas
    featureRefs.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // Animación para el texto del título y párrafo
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <section id="features" className={layout.section}>
      <div ref={textRef} className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Tú haces el negocio, <br className="sm:block hidden" /> nosotros manejamos
          el dinero.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Con la tarjeta de crédito adecuada, puedes mejorar tu vida financiera
          construyendo crédito, ganando recompensas y ahorrando dinero. Pero con cientos
          de tarjetas de crédito en el mercado.
        </p>

        <Button styles={`mt-10`} />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            {...feature}
            index={index}
            cardRef={(el) => (featureRefs.current[index] = el)}
          />
        ))}
      </div>
    </section>
  );
};

export default Business;
