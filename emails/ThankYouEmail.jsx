import { Button, Heading, Link, Section, Text } from "@react-email/components";
import EmailLayout from "./components/EmailLayout";
import {
  BRAND,
  SITE_URL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_LINK,
} from "./constants";

export default function ThankYouEmail({
  name = "there",
  logoUrl = "",
  faviconUrl = "",
}) {
  return (
    <EmailLayout
      preview={`Thank you for contacting RedSpider, ${name}`}
      logoUrl={logoUrl}
      faviconUrl={faviconUrl}
    >
      <Heading style={heading}>Thank you for reaching out</Heading>

      <Text style={paragraph}>Dear {name},</Text>

      <Text style={paragraph}>
        Thank you for contacting RedSpider. We have received your enquiry and
        our team will get back to you shortly — usually within one business
        day.
      </Text>

      <Section style={highlightBox}>
        <Text style={highlightTitle}>What happens next?</Text>
        <Text style={highlightItem}>1. Our team reviews your enquiry</Text>
        <Text style={highlightItem}>2. We contact you to discuss your needs</Text>
        <Text style={highlightItem}>3. We prepare a tailored proposal if needed</Text>
      </Section>

      <Text style={paragraph}>
        If your request is urgent, call us directly at{" "}
        <Link href={`tel:${SUPPORT_PHONE_LINK}`} style={inlineLink}>
          {SUPPORT_PHONE}
        </Link>
        . Our support centre is available 24/7.
      </Text>

      <Section style={buttonSection}>
        <Button href={SITE_URL} style={button}>
          Visit our website
        </Button>
      </Section>

      <Text style={signOff}>
        Best regards,
        <br />
        The RedSpider Team
      </Text>
    </EmailLayout>
  );
}

const heading = {
  color: BRAND.text,
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
  margin: "0 0 20px",
};

const paragraph = {
  color: BRAND.text,
  fontSize: "15px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const highlightBox = {
  backgroundColor: "#fef2f2",
  border: `1px solid #fecaca`,
  borderRadius: "10px",
  padding: "16px 18px",
  margin: "8px 0 20px",
};

const highlightTitle = {
  color: BRAND.red,
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "22px",
  margin: "0 0 10px",
};

const highlightItem = {
  color: BRAND.text,
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 4px",
};

const inlineLink = {
  color: BRAND.red,
  textDecoration: "none",
  fontWeight: "600",
};

const buttonSection = {
  textAlign: "center",
  margin: "8px 0 24px",
};

const button = {
  backgroundColor: BRAND.red,
  borderRadius: "8px",
  color: BRAND.white,
  display: "inline-block",
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "1",
  padding: "14px 28px",
  textDecoration: "none",
};

const signOff = {
  color: BRAND.muted,
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0",
};
