"use client";
import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import { IconDashboard, IconCloudUpload, IconLogout } from "@tabler/icons-react";
import Image from "next/image";
import PRAAN_LOGO from "../../branding/praanwt.svg";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "../store";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "upload", label: "Upload", icon: IconCloudUpload },
];

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));
  return (
    <Provider store={store}>
    <section style={{ display: "flex" }}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <Navbar height={700} width={{ sm: 300 }} p="md">
          <Navbar.Section grow>
            <Group className={classes.header} position="apart">
              <Image src={PRAAN_LOGO} width={140} height={80} alt="Praan" />
              <Code sx={{ fontWeight: 700 }}>v1.0</Code>
            </Group>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a
              href="#"
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                router.push('/');
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} onClick={() => router.push('/')} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      </nav>
      {children}
    </section>
    </Provider>
  );
}
