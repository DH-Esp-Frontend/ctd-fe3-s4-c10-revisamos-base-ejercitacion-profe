import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import {
  defaultLocale,
  localeNames,
  locales,
  TEXTS_BY_LANGUAGE,
} from "../../locale/constants";

const Header: FC = () => {
  // Traemos la información del idioma utilizando useRouter()
  const { locale, asPath } = useRouter();

  // Accedemos a los textos del Header que tenemos en nuestra
  // constante, usando el idioma como "key"
  const { HEADER } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <figure>
            <Image
              src="/red.png"
              layout="fixed"
              width={50}
              height={50}
              alt="logo"
            />
          </figure>
        </div>
        {/* Asignamos los nombres de la barra de navegación
         dinámicamente utilizando las constantes */}
        <div className={styles.navbar}>
          <Link href="./">{HEADER.HOME}</Link>
          <Link href="./faqs">{HEADER.FAQS}</Link>
        </div>
      </div>
      <div className={styles.localeSwitch}>
        {/* Creamos la botonera para cambiar de idioma.
            Mediante el atributo locale le indicamos a Next que idioma queremos utilizar al hacer la
            redirección
           */}
        <Link href={asPath} locale={locales.ES_ES}>
          <p className={locale === locales.ES_ES ? styles.active : ""}>
            <Image
              src="/spanish.png"
              alt="spanish"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.ES_ES as keyof typeof localeNames]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.PT_BR}>
          <p className={locale === locales.PT_BR ? styles.active : ""}>
            <Image
              src="/brazil.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.PT_BR as keyof typeof localeNames]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.EN_US}>
          <p className={locale === locales.EN_US ? styles.active : ""}>
            <Image
              src="/usa.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.EN_US as keyof typeof localeNames]}
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
