/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TOKEN: process.env.TOKEN,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY
    }
};

export default nextConfig;
