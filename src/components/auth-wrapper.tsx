"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "@/amplifyconfiguration.json";
// import { AmplifyOutputs } from "@aws-amplify/core/internals/utils";

Amplify.configure(awsconfig);

function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default withAuthenticator(AuthWrapper);
