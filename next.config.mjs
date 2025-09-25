// next.config.mjs
import { withContentlayer } from "next-contentlayer2";

const nextConfig = {
//  experimental: { typedRoutes: true },
typedRoutes: true,
};

export default withContentlayer(nextConfig);
