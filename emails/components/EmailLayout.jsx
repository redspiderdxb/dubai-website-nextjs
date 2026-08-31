import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import {
  BRAND,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_LINK,
} from "../constants";

export default function EmailLayout({ preview, children, logoUrl = "" }) {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      {preview ? <Preview>{preview}</Preview> : null}
      <Body style={bodyStyle}>
        <Container style={outerContainer}>
          <Section style={headerSection}>
            <Link href={SITE_URL} style={logoLink}>
              {logoUrl ? (
                <Img
                  src={logoUrl}
                  width="170"
                  height="48"
                  alt={SITE_NAME}
                  style={logoImage}
                />
              ) : (
                <Text style={logoFallback}>{SITE_NAME}</Text>
              )}
            </Link>
          </Section>

          <Section style={cardSection}>{children}</Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footerTitle}>{SITE_NAME}</Text>
            <Text style={footerText}>
              Web design, development & digital marketing in Dubai
            </Text>
            <Text style={footerText}>
              <Link href={`tel:${SUPPORT_PHONE_LINK}`} style={footerLink}>
                {SUPPORT_PHONE}
              </Link>
              {" · "}
              <Link href={`mailto:${SUPPORT_EMAIL}`} style={footerLink}>
                {SUPPORT_EMAIL}
              </Link>
            </Text>
            <Text style={socialRow}>
              {SOCIAL_LINKS.map((item, index) => (
                <span key={item.name}>
                  <Link href={item.href} style={footerLink}>{item.name}</Link>
                  {index < SOCIAL_LINKS.length - 1 ? " · " : ""}
                </span>
              ))}
            </Text>
            <Text style={copyright}>
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: BRAND.background,
  margin: "0",
  padding: "24px 12px",
  fontFamily: BRAND.bodyFont,
  fontWeight: BRAND.bodyFontWeight,
};

const outerContainer = {
  maxWidth: "600px",
  margin: "0 auto",
};

const headerSection = {
  backgroundColor: BRAND.red,
  borderRadius: "12px 12px 0 0",
  border: `1px solid ${BRAND.redDark}`,
  borderBottom: "none",
  textAlign: "center",
  padding: "28px 24px",
};

const logoLink = {
  textDecoration: "none",
};

const logoImage = {
  display: "block",
  margin: "0 auto",
  border: "0",
};

const logoFallback = {
  color: BRAND.white,
  fontSize: "20px",
  fontWeight: String(BRAND.headingFontWeight),
  margin: "0",
  textAlign: "center",
};

const cardSection = {
  backgroundColor: BRAND.white,
  borderRadius: "0 0 12px 12px",
  border: `1px solid ${BRAND.border}`,
  borderTop: "none",
  padding: "32px 28px",
};

const divider = {
  borderColor: BRAND.border,
  margin: "24px 0",
};

const footerSection = {
  textAlign: "center",
  padding: "0 8px",
};

const footerTitle = {
  color: BRAND.text,
  fontSize: "14px",
  fontWeight: BRAND.headingFontWeight,
  fontFamily: BRAND.headingFont,
  margin: "0 0 6px",
};

const footerText = {
  color: BRAND.muted,
  fontSize: "13px",
  lineHeight: "22px",
  margin: "0 0 8px",
};

const socialRow = {
  color: BRAND.muted,
  fontSize: "13px",
  lineHeight: "22px",
  margin: "0 0 8px",
};

const footerLink = {
  color: BRAND.red,
  textDecoration: "none",
};

const copyright = {
  color: BRAND.muted,
  fontSize: "12px",
  lineHeight: "20px",
  margin: "8px 0 0",
};
