import { SignIn } from "@clerk/nextjs";

export default function RetailerSignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <SignIn signUpUrl="/retailer/sign-up" fallbackRedirectUrl="/retailer/dashboard" />
    </div>
  );
}
