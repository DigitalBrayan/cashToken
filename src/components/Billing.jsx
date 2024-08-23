import React, { useEffect, useRef } from "react";
import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra el plugin ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const Billing = () => {
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

    // Animación para la imagen de facturación
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        x: -50,
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
    <section id="product" className={layout.sectionReverse}>
      <div ref={imageRef} className={layout.sectionImgReverse}>
        <img
          src={bill}
          alt="facturación"
          className="w-[100%] h-[100%] relative z-[5]"
        />

        {/* inicio del gradiente */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* fin del gradiente */}
      </div>

      <div ref={textRef} className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Controla fácilmente tu <br className="sm:block hidden" /> facturación y
          cobros
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T. persona
          que se dedica a la imprenta) desconocido usó una galería de textos y los
          mezcló de tal manera que logró hacer un libro de textos especimen. No
          sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno
          en documentos electrónicos, quedando esencialmente igual al original.
          Fue popularizado en los 60s con la creación de las hojas "Letraset", las
          cuales contenian pasajes de Lorem Ipsum, y más recientemente con
          software de autoedición, como por ejemplo Aldus PageMaker, el cual
          incluye versiones de Lorem Ipsum.
        </p>

        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img
            src={apple}
            alt="apple_store"
            className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
          />
          <img
            src={google}
            alt="google_play"
            className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
