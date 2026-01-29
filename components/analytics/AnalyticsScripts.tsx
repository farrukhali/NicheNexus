import { getSiteConfig } from '@/lib/site-config'

export default async function AnalyticsScripts() {
    const siteConfig = await getSiteConfig();

    return (
        <>
            {/* Microsoft Clarity */}
            {siteConfig.clarityId && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${siteConfig.clarityId}");
                        `
                    }}
                />
            )}

            {/* Google Analytics 4 */}
            {siteConfig.ga4Id && (
                <>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${siteConfig.ga4Id}');
                            `
                        }}
                    />
                </>
            )}
        </>
    );
}
