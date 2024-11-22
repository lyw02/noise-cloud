"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "@/amplifyconfiguration.json";

Amplify.configure(awsconfig);

function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default withAuthenticator(AuthWrapper);
