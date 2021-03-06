window.onload = () => {
    if (window.screen.width < 750) {
        document.getElementById('iconHolder').style.animationPlayState = 'running'
        setTimeout(() => {
            document.getElementById('iconHolder').style.display = 'none';
            document.getElementById('usePC').style.animationPlayState = 'running'
            setTimeout(() => document.getElementById('usePC').style.display = 'block', 490);
        }, 490)
        return;
    }
    fetch('https://api.github.com/repos/Hiro527/LaF/releases')
    .then(res => res.json())
    .then((data) => {
        const latest = data.filter(release => !release.draft && !release.prerelease)[0]
        const windowsRelease = latest.assets.filter(asset => asset.name == 'LaF_Setup_Windows_x64.exe')[0] || null;
        const macOSRelease = latest.assets.filter(asset => asset.name == 'LaF_Setup_macOS_x64.dmg')[0] || { size: 0, browser_download_url: '#' };
        const linuxRelease = latest.assets.filter(asset => asset.name == 'LaF_Setup_Linux_x86_64.AppImage')[0] || { size: 0, browser_download_url: '#' };
        const releaseInfo = {
            url: latest.html_url,
            body: latest.body,
            version: latest.tag_name,
            releaseTitle: latest.name,
            publishDate: latest.published_at,
            winInstaller: {
                name: 'LaF_Setup_Windows_x64.exe',
                url: windowsRelease.browser_download_url,
                size: windowsRelease.size ? Math.round(windowsRelease.size / (1024 ** 2) * 10) / 10 + 'MB' : 'Unavailable'
            },
            macInstaller: {
                name: 'LaF_Setup_macOS_x64.dmg',
                url: macOSRelease.browser_download_url,
                size: macOSRelease.size ? Math.round(macOSRelease.size / (1024 ** 2) * 10) / 10 + 'MB' : 'Unavailable'
            },
            linuxInstaller: {
                name: 'LaF_Setup_Linux_x86_64.AppImage',
                url: linuxRelease.browser_download_url,
                size: linuxRelease.size ? Math.round(linuxRelease.size / (1024 ** 2) * 10) / 10 + 'MB' : 'Unavailable'
            },
        };
        const ua = window.navigator.userAgent.toLowerCase();
        const os = ua.match(/(windows nt|mac os x|linux)/)[0];
        const platformElements = [
            {
                logo: document.getElementById('mpLogo'),
                name: document.getElementById('mpOS'),
                link: document.getElementById('mpLink'),
                size: document.getElementById('mpSize'),
                bit: document.getElementById('mpBit')
            },
            {
                logo: document.getElementById('spLogo1'),
                name: document.getElementById('spOS1'),
                link: document.getElementById('spLink1'),
                size: document.getElementById('spSize1'),
                bit: document.getElementById('spBit1')
            },
            {
                logo: document.getElementById('spLogo2'),
                name: document.getElementById('spOS2'),
                link: document.getElementById('spLink2'),
                size: document.getElementById('spSize2'),
                bit: document.getElementById('spBit2')
            }
        ];
        const platforms = [os].concat(['windows nt', 'mac os x', 'linux'].filter(item => item !== os));
        const osInfo = {
            'windows nt': ['./img/windows.png', 'Windows', '64bit', releaseInfo.winInstaller],
            'mac os x': ['./img/apple.svg', 'macOS', '64bit', releaseInfo.macInstaller],
            'linux': ['./img/linux.svg', 'Linux', '64bit', releaseInfo.linuxInstaller]
        }
        Object.values(platformElements).forEach(e => {
            e.logo.setAttribute('src', osInfo[platforms[0]][0]);
            e.name.innerText = osInfo[platforms[0]][1];
            e.link.setAttribute('href', osInfo[platforms[0]][3].url);
            e.size.innerText = osInfo[platforms[0]][3].size;
            e.bit.innerText = osInfo[platforms[0]][2];
            platforms.shift();
        })
        document.getElementById('releaseLink').setAttribute('href', releaseInfo.url);
        document.getElementById('versionText').innerText = releaseInfo.version
        document.getElementById('iconHolder').style.animationPlayState = 'running'
        setTimeout(() => {
            document.getElementById('iconHolder').style.display = 'none';
            document.getElementById('releaseInfo').style.animationPlayState = 'running';
            document.getElementById('badges').style.animationPlayState = 'running';
            setTimeout(() => {
                document.getElementById('releaseInfo').style.display = 'flex';
                document.getElementById('badges').style.display = 'block';
            }, 490);
        }, 490)
    });
}