import React, { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem 5rem;
  background-color: black;
  position: relative;
  z-index: 500;

  @media only Screen and (max-width: 64em) {
    padding: 0.5rem 3rem;
  }
  @media only Screen and (max-width: 40em) {
    padding: 0.5rem 1.5rem;
  }
`;
const Logo = styled.a``;
const Nav = styled.nav`
  width: 15rem;
  max-width: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;

  @media only Screen and (max-width: 48em) {
    display: none;
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: inline-block;
  }
  position: relative;
  background-color: white;
  width: 2rem;
  height: 4px;
  margin-top: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  &::before,
  &::after {
    content: "";

    width: 4rem;
    height: 4px;
    display: inline-block;
    position: absolute;
    left: 0;
    cursor: pointer;

    transition: all 0.3s;
  }
`;

const MobileMenu = styled.nav`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: flex;
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  overflow-x: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.clicked ? "1" : 0)};
  visibility: ${(props) => (props.clicked ? "visible" : "hidden")};
  transition: all 0.5s;
  z-index: -10;
  background-color: black;
  border-radius: 20px;
  margin: 0.5rem;
`;

const Navbar = () => {
  const [click, setClick] = useState(false);
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    const element = ref.current;
    const mq = window.matchMedia("(max-width: 40em)");
    if (mq.matches) {
      gsap.to(element, {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        padding: "1rem 2.5rem",

        borderRadius: "0 0 50px 50px",

        border: "2px solid var(--white)",

        duration: 1,
        ease: "power1.out",

        scrollTrigger: {
          trigger: element,
          start: "bottom+=200 top",
          end: "+=100",
          scrub: true,
        },
      });
    } else {
      gsap.to(element, {
        position: "fixed",
        top: "1rem",
        left: "3rem",
        right: "3rem",
        padding: "1.5rem 2rem",

        borderRadius: "50px",

        border: "3px solid var(--white)",

        duration: 1,
        ease: "power1.out",

        scrollTrigger: {
          trigger: element,
          start: "bottom+=300 top",
          end: "+=250",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <Headers ref={ref}>
      <Logo>
        <Typography.Title level={3}>
          <Link to="/">Crypto</Link>
        </Typography.Title>
      </Logo>
      <Nav>
        <Link icon to="/">
          Home
        </Link>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        <Link to="/news">News</Link>
      </Nav>
      <HamburgerBtn clicked={click} onClick={() => setClick(!click)}>
        <span></span>
      </HamburgerBtn>
      <MobileMenu clicked={click}>
        <Link to="/" onClick={(e) => handleClick("home", e)}>
          Home
        </Link>
        <Link
          to="/cryptocurrencies"
          onClick={(e) => handleClick("Cryptocurrencies", e)}
        >
          Cryptocurrencies
        </Link>
        <Link to="/news" onClick={(e) => handleClick("news", e)}>
          News
        </Link>
      </MobileMenu>
    </Headers>
  );
};

export default Navbar;
