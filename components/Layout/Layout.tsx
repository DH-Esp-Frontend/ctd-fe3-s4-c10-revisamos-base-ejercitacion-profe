import { FC } from "react";
import styles from "../../styles/Layout.module.css";
import Header from "../Header";

const Layout: FC<{ children: JSX.Element }> = ({ children }) => (
  <div className={styles.container}>
    <Header />
    {children}
  </div>
);

export default Layout;
