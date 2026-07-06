import { SignUp } from "@clerk/nextjs";

export default function RetailerSignUpPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <SignUp signInUrl="/retailer/sign-in" fallbackRedirectUrl="/retailer/dashboard" />
    </div>
  );
}
