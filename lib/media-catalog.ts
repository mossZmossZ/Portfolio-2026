export type MediaItem = {
  envKey: string;
  fallbackUrl: string;
};

type ResolvedMediaUrl = {
  url: string | null;
};

function parseAllowedMediaHosts() {
  const configuredHosts = (process.env.MEDIA_ALLOWED_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  return new Set(configuredHosts);
}

function isAllowedMediaUrl(url: string, fallbackUrl: string, allowedHosts: Set<string>) {
  let parsedUrl: URL;
  let parsedFallbackUrl: URL;

  try {
    parsedUrl = new URL(url);
    parsedFallbackUrl = new URL(fallbackUrl);
  } catch {
    return false;
  }

  const protocolIsAllowed =
    parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";

  if (!protocolIsAllowed || parsedUrl.username || parsedUrl.password) {
    return false;
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const fallbackHostname = parsedFallbackUrl.hostname.toLowerCase();

  return hostname === fallbackHostname || allowedHosts.has(hostname);
}

export const mediaCatalog: Record<string, MediaItem> = {
  "profile": {
    envKey: "PROFILE_IMAGE_URL",
    fallbackUrl: "https://s3.nattavee.com/resume/nattavee.JPG"
  },
  "certifications/kcna": {
    envKey: "CERT_IMAGE_KCNA_URL",
    fallbackUrl: "https://s3.nattavee.com/resume/Kubernetes%20and%20Cloud%20Native%20Associate%20jpeg.jpg"
  },
  "certifications/ncp-cn6": {
    envKey: "CERT_IMAGE_NCP_CN6_URL",
    fallbackUrl: "https://s3.nattavee.com/resume/NCP-CN.png"
  },
  "certifications/ncp-mci6": {
    envKey: "CERT_IMAGE_NCP_MCI6_URL",
    fallbackUrl: "https://s3.nattavee.com/resume/Nattavee-NCP-MCI_page-0001.jpg"
  },
  "certifications/cc-isc2": {
    envKey: "CERT_IMAGE_CC_ISC2_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80"
  },
  "certifications/fortinet-fca": {
    envKey: "CERT_IMAGE_FORTINET_FCA_URL",
    fallbackUrl: "https://s3.nattavee.com/resume/FCNA.jpg"
  },
  "projects/elearning": {
    envKey: "PROJECT_IMAGE_ELEARNING_URL",
    fallbackUrl: "https://s3.nattavee.com/resume/argo.png"
  },
  "projects/monitoring": {
    envKey: "PROJECT_IMAGE_MONITORING_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80"
  },
  "projects/homelab": {
    envKey: "PROJECT_IMAGE_HOMELAB_URL",
    fallbackUrl: "https://s3.nattavee.com/resume/Proxmox.png"
  }
};

export function resolveMediaUrl(pathKey: string): ResolvedMediaUrl {
  const item = mediaCatalog[pathKey];
  if (!item) {
    return { url: null };
  }

  const allowedHosts = parseAllowedMediaHosts();
  const envValue = process.env[item.envKey];

  if (envValue && isAllowedMediaUrl(envValue, item.fallbackUrl, allowedHosts)) {
    return {
      url: envValue
    };
  }

  return {
    url: isAllowedMediaUrl(item.fallbackUrl, item.fallbackUrl, allowedHosts)
      ? item.fallbackUrl
      : null
  };
}
