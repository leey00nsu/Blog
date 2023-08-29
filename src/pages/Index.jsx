import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const Index = () => {
  return (
    <Layout title="이윤수의 블로그" description="이윤수의 블로그입니다.">
      <div className={styles.container}>
        <h1 className={styles.highlight}>LEEYOONSU</h1>
        <h1>블로그</h1>
      </div>
    </Layout>
  );
};

export default Index;
