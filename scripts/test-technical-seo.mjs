import assert from "node:assert/strict";
import test from "node:test";

// Read-only checks against a running production build. No forms are submitted.
// Example: SEO_TEST_ORIGIN=http://127.0.0.1:3000 node --test scripts/test-technical-seo.mjs
const origin = process.env.SEO_TEST_ORIGIN || "http://127.0.0.1:3000";
const canonicalOrigin = "https://mouldingstl.com";

async function request(path) {
  const response = await fetch(new URL(path, origin), { redirect: "manual" });
  return { status: response.status, html: await response.text() };
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]+)>`, "gi"))].map((match) =>
    Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attribute) =>
      [attribute[1].toLowerCase(), attribute[2].replaceAll("&amp;", "&")],
    )),
  );
}

function indexingDirectives(html) {
  return tags(html, "meta")
    .filter(({ name }) => name === "robots" || name === "googlebot")
    .flatMap(({ content }) => content.split(",").map((directive) => directive.trim()));
}

function schemas(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((match) => JSON.parse(match[1]));
}

test("every sitemap page retains canonical/indexability, corrected business identity and a high-priority hero", async (t) => {
  const sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
  assert.ok(urls.length >= 16, "the sitemap must include all active marketing routes");
  for (const url of urls) {
    assert.equal(url.origin, canonicalOrigin);
    assert.ok(!["/seo-dashboard", "/services/gazebos-pergolas"].includes(url.pathname));
    assert.ok(!url.pathname.startsWith("/lp/"));
    await t.test(url.pathname, async () => {
      const { status, html } = await request(url.pathname);
      assert.equal(status, 200);
      const canonicals = tags(html, "link").filter(({ rel }) => rel === "canonical");
      assert.equal(canonicals.length, 1);
      assert.equal(new URL(canonicals[0].href).href, url.href);
      const directives = indexingDirectives(html);
      assert.ok(directives.includes("index"));
      assert.ok(directives.includes("max-image-preview:large"));
      assert.ok(!directives.includes("noindex"));
      const business = schemas(html).find((schema) => schema["@id"] === `${canonicalOrigin}/#business`);
      assert.equal(business.address.streetAddress, "1750 Salzman Ave");
      assert.equal(business.address.postalCode, "63133");
      assert.equal(business.parentOrganization["@id"], "https://ckcwoodworks.com/#business");
      const hero = tags(html, "img").find(({ fetchpriority }) => fetchpriority === "high");
      assert.ok(hero, "the hero must be discoverable in the initial HTML");
      assert.equal(hero.loading, "eager");
      assert.ok(tags(html, "link").some((link) => link.rel === "preload" && link.as === "image" && link.fetchpriority === "high" && link.imagesrcset === hero.srcset));
    });
  }
});

test("unknown and archived pages remain true noindex 404s without inherited canonical/index directives", async (t) => {
  for (const path of ["/technical-seo-nonexistent-page", "/services/technical-seo-nonexistent-service", "/services/gazebos-pergolas"]) {
    await t.test(path, async () => {
      const { status, html } = await request(path);
      assert.equal(status, 404);
      assert.ok(indexingDirectives(html).includes("noindex"));
      assert.ok(!indexingDirectives(html).includes("index"));
      assert.equal(tags(html, "link").filter(({ rel }) => rel === "canonical").length, 0);
    });
  }
});

test("ad landing page and dashboard stay excluded from search", async (t) => {
  for (const path of ["/lp/picture-frame-moulding", "/seo-dashboard"]) {
    await t.test(path, async () => {
      const { status, html } = await request(path);
      assert.equal(status, 200);
      const directives = indexingDirectives(html);
      assert.ok(directives.includes("noindex"));
      assert.ok(directives.includes("nofollow"));
      assert.ok(!directives.includes("index"));
    });
  }
});

test("privacy remains indexable and commercial service uses CKC's established identity", async () => {
  const privacy = await request("/privacy-policy");
  assert.equal(privacy.status, 200);
  assert.ok(indexingDirectives(privacy.html).includes("index"));
  assert.ok(!indexingDirectives(privacy.html).includes("noindex"));
  assert.equal(tags(privacy.html, "link").find(({ rel }) => rel === "canonical").href, `${canonicalOrigin}/privacy-policy`);
  const commercial = schemas((await request("/commercial")).html).find((schema) => schema["@id"] === `${canonicalOrigin}/commercial#service`);
  assert.equal(commercial.provider["@id"], "https://ckcwoodworks.com/#business");
});

test("header, footer and landing-page logos offer small responsive sources without changing intrinsic proportions", async () => {
  for (const path of ["/", "/lp/picture-frame-moulding"]) {
    const logos = tags((await request(path)).html, "img").filter(({ src }) => src?.includes("moulding-stl-inverted-logo.webp"));
    assert.ok(logos.length >= (path === "/" ? 2 : 1));
    for (const logo of logos) {
      assert.equal(logo.width, "1600");
      assert.equal(logo.height, "1768");
      assert.ok(logo.sizes && !logo.sizes.includes("100vw"));
      assert.match(logo.srcset, /[?&]w=128&.*? 128w/);
      assert.doesNotMatch(logo.srcset, /\s[12]x(?:,|$)/);
    }
  }
});
