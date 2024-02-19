/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";

const Layout = (props) => {
const title = "Welcome to Nextjs";
const {user} = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <Script src="https://js.stripe.com/v3"></Script>
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/" className="navbar-brand">Home</Link>
          </NavItem>
          <NavItem className="ml-auto">
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register" className="nav-link">Sign up</Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href="/" className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}>
                  Logout
              </Link>
            ) : (
              <Link href="/login" className="nav-link">Sign in</Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;