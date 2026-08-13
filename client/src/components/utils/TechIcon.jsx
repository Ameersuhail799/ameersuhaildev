import React from "react";
import { FiCode, FiDatabase, FiGlobe, FiShield, FiLock, FiLayers, FiServer } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import nextJsIcon from "../../assets/images/NextJsIcon.svg";
import ReactIcon from "../../assets/images/react.svg";
import TailwindIcon from "../../assets/images/TailwindCssIcon.svg";
import FigmaIcon from "../../assets/images/FigmaIcon.svg";
import FirebaseIcon from "../../assets/images/FirebaseIcon.svg";
import HtmlIcon from "../../assets/images/HtmlIcon.svg";
import CssIcon from "../../assets/images/CssIcon.svg";
import BootstrapIcon from "../../assets/images/BootStrapIcon.svg";
import AosIcon from "../../assets/images/AosIcon.png";
import reduxIcon from "../../assets/images/ReduxIcon.svg";
import reactRouterIcon from "../../assets/icons/reactRouter.svg";
import apiIcon from "../../assets/icons/apiIcon.svg";

const iconMap = {
  nextjs: { type: "asset", src: nextJsIcon, alt: "Next" },
  react: { type: "asset", src: ReactIcon, alt: "React" },
  tailwind: { type: "asset", src: TailwindIcon, alt: "Tailwind CSS" },
  typescript: { type: "svg", node: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3178C6" className="w-full h-full"><path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.278 12.028h-2.292v7.125H7.111v-7.125H4.82v-2.028h7.006v2.028zm8.014 2.806c0-.986-.417-1.722-1.611-2.222l-1.111-.472c-.444-.194-.667-.444-.667-.75 0-.361.333-.583.861-.583.694 0 1.25.306 1.472.917l1.75-.972c-.472-1.028-1.444-1.75-3.167-1.75-1.972 0-3.194 1.056-3.194 2.611 0 1.25.667 1.944 2.111 2.528l.944.389c.667.278.889.556.889.917 0 .444-.444.75-1.167.75-.972 0-1.639-.444-1.889-1.278l-1.806.75c.472 1.5 1.833 2.472 3.75 2.472 2.167 0 3.417-1.139 3.417-2.708z"/></svg> },
  html: { type: "asset", src: HtmlIcon, alt: "HTML" },
  css: { type: "asset", src: CssIcon, alt: "CSS" },
  redux: { type: "asset", src: reduxIcon, alt: "Redux" },
  javascript: { type: "svg", node: <svg xmlns="http://www.w3.org/2000/svg" aria-label="JavaScript" role="img" viewBox="-76.8 -76.8 665.60 665.60" fill="#000000"><rect x="-76.8" y="-76.8" width="665.60" height="665.60" rx="332.8" fill="#f7df1e"></rect><rect width="512" height="512" rx="15%" fill="#f7df1e"></rect><path d="M324 370c10 17 24 29 47 29c20 0 33-10 33 -24c0-16 -13 -22 -35 -32l-12-5c-35-15 -58 -33 -58 -72c0-36 27 -64 70 -64c31 0 53 11 68 39l-37 24c-8-15 -17 -21 -31 -21c-14 0-23 9 -23 21c0 14 9 20 30 29l12 5c41 18 64 35 64 76c0 43-34 67 -80 67c-45 0-74 -21 -88 -49zm-170 4c8 13 14 25 31 25c16 0 26-6 26 -30V203h48v164c0 50-29 72 -72 72c-39 0-61 -20 -72 -44z"></path></svg> },
  nodemailer: { type: "icon", node: FiGlobe, color: "#0f9dce" },
  mongoose: { type: "icon", node: FiDatabase, color: "#850000" },
  jwt: { type: "icon", node: FiLock, color: "#546e7a" },
  zustand: { type: "icon", node: FiShield, color: "#ff7a00" },
  figma: { type: "asset", src: FigmaIcon, alt: "Figma" },
  api: { type: "asset", src: apiIcon, alt: "Api" },
  "rest api": { type: "icon", node: FiGlobe, color: "#47A248" },
  firebase: { type: "asset", src: FirebaseIcon, alt: "Firebase" },
  mongodb: { type: "icon", node: FiDatabase, color: "#47A248" },
  postgresql: { type: "icon", node: FiDatabase, color: "#0EA5E9" },
  bcrypt: { type: "icon", node: FiLock, color: "#7c3aed" },
  authentication: { type: "icon", node: FiShield, color: "#dc2626" },
  aos: { type: "asset", src: AosIcon, alt: "AOS" },
  cloudinary: { type: "icon", node: FiGlobe, color: "#0f52ba" },
  "socket.io": { type: "icon", node: FiGlobe, color: "#111827" },
  "react-router": { type: "asset", src: reactRouterIcon, alt: "React-Router" },
  axios: { type: "icon", node: FiGlobe, color: "#5A29E4" },
  stripe: { type: "icon", node: FiGlobe, color: "#635BFF" },
  express: { type: "icon", node: FiServer, color: "#000000" },
  nodejs: { type: "icon", node: FiServer, color: "#68A063" },
  prisma: { type: "icon", node: FiDatabase, color: "#0F172A" },
  framer: { type: "icon", node: FiLayers, color: "#0055FF" },
  gsap: { type: "icon", node: FiLayers, color: "#88CE02" },
  bootstrap: { type: "asset", src: BootstrapIcon, alt: "Bootstrap" },
  sass: { type: "icon", node: FiCode, color: "#CF649A" },
  graphql: { type: "icon", node: FiGlobe, color: "#E10098" },
  vite: { type: "icon", node: FiCode, color: "#646CFF" },
  github: { type: "icon", node: FaGithub, color: "#181717" },
};

const renderSvgNode = (node, props) => {
  if (!node) return null;

  if (typeof node === "string") {
    return <span dangerouslySetInnerHTML={{ __html: node }} {...props} />;
  }

  if (React.isValidElement(node)) {
    return React.cloneElement(node, props);
  }

  if (typeof node === "function") {
    const SvgComponent = node;
    return <SvgComponent {...props} />;
  }

  return null;
};

const TechIcon = ({ tech, className = "", title }) => {
  const entry = iconMap[String(tech || "").trim().toLowerCase()];

  if (!entry) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border border-Primary/10 bg-white/70 text-[10px] font-semibold uppercase text-Primary/60 ${className}`}
        title={title || tech}
      >
        {String(tech || "").slice(0, 2)}
      </span>
    );
  }

  if (entry.type === "asset") {
    return <img src={entry.src} alt={entry.alt || tech} title={title || tech} className={`h-full w-full object-contain ${className}`} loading="lazy" />;
  }

  if (entry.type === "svg") {
    const sharedProps = {
      title: title || tech,
      "aria-label": title || tech,
      className,
      style: { color: entry.color },
    };

    return renderSvgNode(entry.node, sharedProps);
  }

  const Icon = entry.node;
  return (
    <Icon
      title={title || tech}
      aria-label={title || tech}
      className={className}
      style={{ color: entry.color }}
    />
  );
};

export default TechIcon;
