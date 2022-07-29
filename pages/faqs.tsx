import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { FAQSAPIResponse } from "../types";
import styles from "../styles/Faqs.module.css";
import { useRouter } from "next/router";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";

export interface IProps {
  data: FAQSAPIResponse;
}

const FAQS: NextPage<IProps> = ({ data }) => {
  // Traemos la información del idioma utilizando useRouter()
  const { locale } = useRouter();

  // Accedemos a los textos del Header que tenemos en nuestra
  // constante, usando el idioma como "key"
  const { FAQS } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  return (
    <div className={styles.container}>
      <Head>
        {/* Asignamos los valores dinámicamente */}
        <title>{`RandomIn - ${FAQS.TITLE}`}</title>
        <meta name="description" content={FAQS.DESCRIPTION} />
      </Head>
      {/* Asignamos los valores dinámicamente */}
      <h2 className={styles.colorText}>{FAQS.TITLE}</h2>
      {data.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};

// Accedemos a la propiedad "locale" que se encuentra
// dentro del contexto del método getStaticProps
export async function getStaticProps({
  locale,
}: {
  locale: string;
}): Promise<{ props: { data: FAQSAPIResponse } }> {
  const baseUrl = "http://localhost:3000/"; // Cambiar por la url del proyecto una vez deployada la API

  // Efectuamos el request agregando el idioma que recibimos
  // del contexto.
  const response = await fetch(`${baseUrl}/api/faqs/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}

export default FAQS;
