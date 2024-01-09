# @valtown/add-last-updated

Another Markdown-related single-tasker script, provided
for folks who have the same problem or want another example
of how to use `vfile` and that ecosystem.

If you:

- Are using [Astro Starlight](https://starlight.astro.build/)
- And Cloudflare Pages or a similar static host that
  uses [shallow git clones](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/)
- And you want to show `lastUpdated` dates

Then you probably have incorrect lastUpdated dates,
because there isn't the git history to provide them. So
you'll need to use [lastUpdated](https://starlight.astro.build/reference/frontmatter/#lastupdated) in frontmatter.

This tool helps you make the transition.

## Example usage:

Assuming you are in your Astro Starlight docs directory,
run:

```sh
npx @valtown/add-last-updated src/content
```
