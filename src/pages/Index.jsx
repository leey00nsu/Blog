import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const Index = () => {
  return (
    <Layout title="이윤수의 블로그" description="이윤수의 블로그입니다.">
      <div className={styles.container}>
        <iframe
          style={{ width: "100%", height: "100%" }}
          src="https://babylon-monitor.vercel.app/"
        />
      </div>
    </Layout>
  );
};

export default Index;
