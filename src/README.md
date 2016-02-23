# loading-page

Displaying a loading page for your user while your single page app is loading shouldn't be hard... let [loading-page][1] do the work.

See it in action in our [sample](https://cdn.rawgit.com/jhoguet/loading-page/master/dist/sample.html?v=sha)...

### Getting Started

1. Put all of your Loading Page content (to include styles) inside a div with class name `loading-page`
2. Also put the loading-page javascript inline in the div
3. When your app is ready, call `window.loadingPage.doneLoading()`
```html
<div class="loading-page">
	<style>h1 { text-align : center; }</style>
	<h1>Loading all sorts of goodies...</h1>
    <script>{{loading-page.min.js}}</script>
</div>
```

And if you want to transition your content in, we will inject the `loaded` class on body when we are done transitioning the loading page away.

### How it Works
The script will create an iframe and inject it onto the page with your `.loading-page` element cloned inside. 

The iframe has little opinion of styles, and so it is important that your `.loading-page` included any styles you need for your loading page. The iframe will fill the screen with a high z-index so it is the top layer and all the user sees, allowing you to load content in the main window. 

We use an iframe for one primary reason, css. We beleive that the only thing on the html page should be the loading page content and a script tag for your app. This means that your app styles shouldn't be on the page yet. This allows you to iterate on your app without needing to iterate on your html. When you do load your app styles, it can be very practical to shield them from changing your loading page styles. For instance, your app styles probably wants to apply some defaults to font, spacing, etc. But this may break / not look good on your loading page... and lets be honest, its a loading page. Once you have it working, you don't want to have to worry if your app changes break your loading page. 

By putting it all in an iFrame it is completely insulated from your app, and your app is completely isolated from it. 

In fact, when using [loading-page][1] you shouldn't find any remnant that we were ever there. We remove the `.loading-page` element (which contained the script tag that got us running). We delete the iframe we inject shortly after you call `doneLoading()` and we delete the global then too.

We lied... we do leave the `loaded` class on `body`, consider it a gift :)

When you call `doneLoading()` we will fade out the loading page, at which point your content will be visible.

If you want to animate your content in, leverage the `loaded` class we put on body when we're done.


### Building

`npm run build` will do everything for you. This is an unusual project in that we are committing built artifacts (like this readme actually). This is because we expect people will get [loading-page][1] into their app is by copy-pasta rather than  a package manager, so we want the content in github to be the content they would copy.

### Backlog
- [ ] Ability to customize animation
- [ ] document how you could update the loading page while you are loading content
- [ ] animate main content (fade in) after fading out the loading page

[1]: https://github.com/jhoguet/loading-page