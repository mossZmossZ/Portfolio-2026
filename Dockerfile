FROM node:20-alpine AS base

WORKDIR /app
ENV NODE_ENV=production

# Install all dependencies (prod + dev) so Next/Tailwind/PostCSS can build
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js application
FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production runtime image
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user for better security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

# Copy only what is needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]

