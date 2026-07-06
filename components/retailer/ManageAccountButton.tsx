"use client";

import { useClerk } from "@clerk/nextjs";

export default function ManageAccountButton() {
  const { openUserProfile } = useClerk();

  return (
    <button
      type="button"
      onClick={() => openUserProfile()}
      className="rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-light"
    >
      Manage name, email &amp; password
    </button>
  );
}
