"use client"
import ContactForm from "@/components/contact/contactForm";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";

const ContactPage = () => {
  return (
    <>
      <Heading level={1}>お問い合わせ</Heading>
      <Box variant="roundedMaxMd" className="md:max-w-md md:mx-auto">
        <ContactForm />
      </Box>
    </>
  );
};

export default ContactPage;
