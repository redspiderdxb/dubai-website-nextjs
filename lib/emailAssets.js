import {
  EMAIL_LOGO_BASE64,
  EMAIL_LOGO_CID,
  EMAIL_LOGO_MIME,
} from "./emailLogoData";

export function getEmailLogoCidSrc() {
  return `cid:${EMAIL_LOGO_CID}`;
}

export function getEmailLogoDataUri() {
  return `data:${EMAIL_LOGO_MIME};base64,${EMAIL_LOGO_BASE64}`;
}

export function getEmailLogoAttachment() {
  return {
    filename: "logo.png",
    content: EMAIL_LOGO_BASE64,
    content_id: EMAIL_LOGO_CID,
    disposition: "inline",
    content_type: EMAIL_LOGO_MIME,
  };
}

export function getEmailTemplateProps(extraProps = {}, { forSend = false } = {}) {
  return {
    logoUrl: forSend ? getEmailLogoCidSrc() : getEmailLogoDataUri(),
    ...extraProps,
  };
}
