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
                        id="google-analytics"
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

            {/* Google Tag Manager */}
            {siteConfig.seoSettings?.gtm_container_id && (
                <script
                    id="gtm-script"
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${siteConfig.seoSettings.gtm_container_id}');
                        `
                    }}
                />
            )}
        </>
    );
}
