import Image from "next/image";
import githubLogo from "../assets/images/github-logo.png";
import PageContainer from "@/components/page-container/page-container-component";

export default function Home() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE!;
  const githubAuthEndpoint = process.env.NEXT_GITHUB_AUTHENTICATION_ENDPOINT_URL!;
  const loginEndpoint = "/login";
  
  return (
    <div>
      <main >
        <PageContainer>
          <a
            href={`${apiBase}${githubAuthEndpoint}${loginEndpoint}`}
          >
            <Image
              aria-hidden
              src={githubLogo}
              alt="GitHub icon"
              width={16}
              height={16}
            />
            Log in to Github
          </a>
        </PageContainer>
      </main>
      <footer>
      </footer>
    </div>
  );
}
