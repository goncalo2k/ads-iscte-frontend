"use client";
import ContentContainer from "@/components/content-container/content-container";
import { Button } from "@/components/ui/button";
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
