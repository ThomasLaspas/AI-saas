import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pgiyjcnrihxvwrkmcyux.supabase.co",
      "oaidalleapiprodscus.blob.core.windows.net",
      "replicate.delivery",
    ],
  },
};

export default withNextVideo(nextConfig);