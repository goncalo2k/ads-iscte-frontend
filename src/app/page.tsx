"use client";
import ContentContainer from "@/components/content-container/content-container";
import LoginComponent from "@/components/login/login";

export default function Home() {

  return (
    <>
      <ContentContainer maxWidth={true}>
        <LoginComponent></LoginComponent>
      </ContentContainer>
    </>
  );
}
