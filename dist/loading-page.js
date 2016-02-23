(function(){
    // remove this script type from the page so that we don't get infinite loop
    var script = document.querySelector('.loading-page script');
    script.parentNode.removeChild(script);

    var originalLoadingPageEl = document.querySelector('.loading-page');

    var html = '<!DOCTYPE html><html lang="en"><head>    <meta charset="utf-8">    <meta http-equiv="X-UA-Compatible" content="IE=Edge">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    </head><body>{{iframe-inner-html}}</body></html>';

    html = html.replace('{{iframe-inner-html}}', originalLoadingPageEl.outerHTML);

    var iframe = document.createElement('iframe');
    iframe.setAttribute('style',  "position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    // remove the element, now that we have it in an iframe
    originalLoadingPageEl.parentNode.removeChild(originalLoadingPageEl);

    function LoadingPage(){
        this.element = function(callback){
            callback(iframe.contentWindow.document.querySelector('.loading-page'));
            return this;
        }.bind(this);

        this.doneLoading = function () {
            delete window.loadingPage;

            this.element(function(el){
                el.classList.add('fade-out');
            });

            setTimeout(function(){
                document.body.removeChild(iframe);
                document.body.classList.add('loaded');
            }, 250);

        };
    }

    window.loadingPage = new LoadingPage();
})();