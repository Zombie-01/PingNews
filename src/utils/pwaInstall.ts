/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/pwaInstall.ts

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export const initInstallPrompt = (): void => {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    (window as any).deferredPrompt = deferredPrompt; // Optional global access
  });
};

export const showInstallPrompt = async (): Promise<boolean> => {
  const prompt = deferredPrompt || (window as any).deferredPrompt;
  if (!prompt) return false;

  prompt.prompt();
  const { outcome } = await prompt.userChoice;
  deferredPrompt = null;
  (window as any).deferredPrompt = null;

  return outcome === "accepted";
};

export const isAppInstalled = (): boolean => {
  return window.matchMedia("(display-mode: standalone)").matches;
};
