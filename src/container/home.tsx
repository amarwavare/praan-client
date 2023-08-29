"use client";
import styles from "../branding/home.module.css";
import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { PRAAN_SUBTITLE, PRAAN_TITLE } from "@/constants/constants";
import PRAAN_LOGO from "../branding/praanwt.svg";
import { ActionIcon } from "@mantine/core";
import { AiOutlineArrowRight } from "react-icons/ai";

function HomeContainer() {
    const router = useRouter();
    const onNavigateDashboard = () => router.push('/dashboard');
  return (
    <div className={styles.home_container__layout}>
      <Image src={PRAAN_LOGO} width={200} height={200} alt="Praan" />
      <h1>{PRAAN_TITLE}</h1>
      <h3>{PRAAN_SUBTITLE}</h3>
      <br /> <br /> <br />
        <ActionIcon
            className={styles.home_container__nextIcon}
            variant="subtle"
            color="dark"
            size={'xl'}
            name="next"
            title="Next"
            onClick={onNavigateDashboard}
        >
            <AiOutlineArrowRight size="1.3rem" />
        </ActionIcon>
    </div>
  );
}

export default HomeContainer;
