"use client";
import Image from "next/image";
import githubLogo from "../assets/images/github-logo.png";
import ContentContainer from "@/components/content-container/content-container";
import { Button } from "@/components/ui/button";

export default function Home() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE!;
  const githubAuthEndpoint = process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL!;
  const loginEndpoint = "/login";

  const handleLogin = () => {
    window.location.href = `${apiBase}${githubAuthEndpoint}${loginEndpoint}`;
  };

  return (
    <>
      <ContentContainer maxWidth={true}>
        <h1 className="text-4xl">Welcome to the GitDash</h1>
        <div>
          <Button variant="ghost" onClick={handleLogin}>
            <Image
              aria-hidden
              src={githubLogo}
              alt="GitHub icon"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>Log in to Github</span>
          </Button>
        </div>
      </ContentContainer>
    </>
  );
}
