import React, { useEffect, useRef } from "react";
import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra el plugin ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const CardDeal = () => {
  const textRef = useRef(null); // Referencia para el texto
  const imageRef = useRef(null); // Referencia para la imagen

  useEffect(() => {
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

    // Animación para la imagen de la tarjeta
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <section className={layout.section}>
      <div ref={textRef} className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Encuentra una mejor oferta de tarjeta <br className="sm:block hidden" />{" "}
          en unos pocos pasos sencillos.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T. persona
          que se dedica a la imprenta) desconocido usó una galería de textos y los
          mezcló de tal manera que logró hacer un libro de textos especimen. No
          sólo sobrevivió 500 años, sino que también ingresó como texto de relleno
          en documentos electrónicos, quedando esencialmente igual al original.
          Fue popularizado en los 60s con la creación de las hojas "Letraset", las
          cuales contenían pasajes de Lorem Ipsum, y más recientemente con
          software de autoedición, como por ejemplo Aldus PageMaker, el cual
          incluye versiones de Lorem Ipsum.
        </p>

        <Button styles={`mt-10`} />
      </div>

      <div ref={imageRef} className={layout.sectionImg}>
        <img src={card} alt="facturación" className="w-[100%] h-[100%]" />
      </div>
    </section>
  );
};

export default CardDeal;
