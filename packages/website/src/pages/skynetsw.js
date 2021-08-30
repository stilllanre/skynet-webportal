import * as React from "react";
import { Section, SectionTitle } from "../components/Layout";
import Seo from "../components/seo";

setTimeout(() => {
    document.cookie = "skynetsw=1";
    window.location.reload();
}, 5000);

const NotFoundPage = () => (
  <>
    <Seo title="Checking browser comatibility" />

    <Section className="bg-white text-center">
      <div className="space-y-8 py-40">
        <SectionTitle>Checking browser compatibility, please wait...</SectionTitle>

        <a href="https://siasky.net" className="inline-block text-primary text-xs" target="_blank" rel="noopener noreferrer">
          go to siasky.net
        </a>
      </div>
    </Section>
  </>
);

export default NotFoundPage;
