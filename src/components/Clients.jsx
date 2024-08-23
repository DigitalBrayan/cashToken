import React, { useEffect, useRef } from "react";
import { clients } from "../constants";
import styles from "../style";
import gsap from "gsap";

const Clients = () => {
  const logosContainerRef = useRef(null);

  useEffect(() => {
    const totalWidth = logosContainerRef.current.scrollWidth / 4;

    gsap.to(logosContainerRef.current, {
      x: -totalWidth,
      ease: "none",
      duration: clients.length * 3, // 3 segundos por logo
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });
  }, []);

  return (
    <section className={`${styles.flexCenter} my-4 overflow-hidden`}>
      <div
        ref={logosContainerRef}
        className={`${styles.flexCenter} flex-nowrap w-full`}
        style={{ display: "flex" }}
      >
        {clients.concat(clients).map((client, index) => (
          <div
            key={index}
            className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] m-5`}
          >
            <img
              src={client.logo}
              alt="client_logo"
              className="sm:w-[192px] w-[100px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
