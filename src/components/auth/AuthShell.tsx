import Image from "next/image";

interface AuthShellProps {
  /** Bold headline shown at the bottom of the teal panel. */
  panelHeadline: string;
  children: React.ReactNode;
}

/**
 * Split-screen auth layout: teal brand panel on the left (hidden on mobile),
 * form content on the right. Used by Create Account and Log in.
 */
export default function AuthShell({ panelHeadline, children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_20px_60px_-30px_rgba(30,34,41,0.45)] md:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-b from-[#5fb6a4] to-[#2f6f63] p-8 md:flex">
          {/* soft radial highlight, top-right */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 inline-flex w-fit items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-sm">
            <Image
              src="/logo2.jpeg"
              alt="AlatChat AI"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-sm font-bold tracking-tight text-ink">
              AlatChat AI
            </span>
          </div>

          <h2 className="relative z-10 max-w-[16ch] text-3xl font-bold leading-tight text-white">
            {panelHeadline}
          </h2>
        </div>

        {/* Form area */}
        <div className="flex flex-col justify-center p-7 sm:p-10">{children}</div>
      </div>
    </div>
  );
}
