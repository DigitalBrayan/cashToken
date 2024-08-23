import React, { useEffect, useRef } from "react";
import styles from "../style";
import Button from "./Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra el plugin ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null); // Referencia para la sección
  const headingRef = useRef(null); // Referencia para el título
  const paragraphRef = useRef(null); // Referencia para el párrafo
  const buttonRef = useRef(null); // Referencia para el botón

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !paragraphRef.current || !buttonRef.current) return;

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
          end: "top 50%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animación para el botón
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5, // Retraso para que el botón aparezca después del título y párrafo
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
      <div className="flex-1 flex flex-col">
        <h2 ref={headingRef} className={styles.heading2}>
          Probemos nuestro servicio ahora!
        </h2>
        <p ref={paragraphRef} className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Todo lo que necesitas para aceptar pagos con tarjeta y hacer crecer tu
          negocio en cualquier parte del planeta.
        </p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button ref={buttonRef} />
      </div>
    </section>
  );
};

export default CTA;
