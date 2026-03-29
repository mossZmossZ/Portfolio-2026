export type MediaItem = {
  envKey: string;
  fallbackUrl: string;
};

export const mediaCatalog: Record<string, MediaItem> = {
  "profile": {
    envKey: "PROFILE_IMAGE_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
  },
  "certifications/kcna": {
    envKey: "CERT_IMAGE_KCNA_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  "certifications/ncp-cn6": {
    envKey: "CERT_IMAGE_NCP_CN6_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
  },
  "certifications/ncp-mci6": {
    envKey: "CERT_IMAGE_NCP_MCI6_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80"
  },
  "certifications/cc-isc2": {
    envKey: "CERT_IMAGE_CC_ISC2_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80"
  },
  "certifications/fortinet-fca": {
    envKey: "CERT_IMAGE_FORTINET_FCA_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80"
  },
  "projects/elearning": {
    envKey: "PROJECT_IMAGE_ELEARNING_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80"
  },
  "projects/monitoring": {
    envKey: "PROJECT_IMAGE_MONITORING_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80"
  },
  "projects/homelab": {
    envKey: "PROJECT_IMAGE_HOMELAB_URL",
    fallbackUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80"
  }
};

export function resolveMediaUrl(pathKey: string): { url: string | null; envKey: string | null } {
  const item = mediaCatalog[pathKey];
  if (!item) {
    return { url: null, envKey: null };
  }

  const envValue = process.env[item.envKey];
  return {
    url: envValue || item.fallbackUrl,
    envKey: item.envKey
  };
}