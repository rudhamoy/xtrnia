import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-6 py-16">
      <SignUp forceRedirectUrl="/register" />
    </div>
  );
}
