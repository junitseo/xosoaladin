const siteUrl = 'https://xosoaladin.com/'
module.exports = {
    siteUrl,
    exclude: ['/404'],
    generateRobotsTxt: true,
    changefreq: 'weekly',
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: ['/404', '/admin.xossoaladin.com', '/readme.html'],
            },
            { userAgent: '*', allow: '/' },
        ],
        additionalSitemaps: [
            `${siteUrl}sitemap.xml`,
            `${siteUrl}giaimagiacmo-sitemap.xml`,
            `${siteUrl}dudoan-sitemap.xml`,
            `${siteUrl}tintuc-sitemap.xml`,
        ],
    },
}
