import React, { useEffect, useRef } from "react";
import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra el plugin ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null); // Referencia para la sección
  const headingRef = useRef(null); // Referencia para el título
  const paragraphRef = useRef(null); // Referencia para el párrafo
  const cardsRef = useRef([]); // Referencia para las tarjetas de feedback

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !paragraphRef.current) return;

    // Animación para el título y párrafo
    gsap.fromTo(
      [headingRef.current, paragraphRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animación para las tarjetas de feedback
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: index * 0.2, // Retraso escalonado para cada tarjeta
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, [feedback]); // Añadir dependencias si es necesario

  return (
    <section
      ref={sectionRef}
      id="clients"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
    >
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h2 ref={headingRef} className={styles.heading2}>
          Lo que la gente <br className="sm:block hidden" /> dice sobre nosotros
        </h2>
        <div className="w-full md:mt-0 mt-6">
          <p ref={paragraphRef} className={`${styles.paragraph} text-left max-w-[450px]`}>
            Todo lo que necesitas para aceptar pagos con tarjeta y hacer crecer tu negocio
            en cualquier parte del mundo.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
        {feedback.map((card, index) => (
          <FeedbackCard
            key={card.id}
            {...card}
            ref={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
