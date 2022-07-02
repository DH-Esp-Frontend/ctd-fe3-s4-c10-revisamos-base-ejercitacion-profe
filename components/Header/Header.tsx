import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Header.module.css";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Image src="/red.png" layout="fixed" width={50} height={50} alt="logo" />
      <Link href="./">Home</Link>
      <Link href="./faqs">Preguntas Frecuentes</Link>
    </header>
  );
};

export default Header;
