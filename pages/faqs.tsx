import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Faqs.module.css";

type FAQ = { id: number; title: string; description: string };

export interface IProps {
  data: FAQ[];
}

const FAQS: NextPage<IProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>RandomIn - Preguntas Frecuentes</title>
        <meta
          name="description"
          content="Preguntas frecuentes del uso de la app RandomIn"
        />
      </Head>
      <h2 className={styles.colorText}>Preguntas Frecuentes</h2>
      {data.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://my-json-server.typicode.com/DH-Esp-Frontend/ctd-fe3-s2-c6-integracion-terminado/db"
  );

  const data = await response.json();

  return {
    props: { data: data.faqs },
  };
}

export default FAQS;
