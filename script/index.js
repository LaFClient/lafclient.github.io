(function() {
    const downloadFile = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.click();
    }
    window.onload = () => {
        if (window.screen.width < 750) {
            document.getElementById('iconHolder').style.animationPlayState = 'running'
            setTimeout(() => {
                document.getElementById('iconHolder').style.display = 'none';
                document.getElementById('usePC').style.animationPlayState = 'running'
                setTimeout(() => document.getElementById('usePC').style.display = 'block', 490);
            }, 490)
            return;
        };
        fetch('https://api.github.com/repos/LaFClient/LaF/releases')
        .then(res => res.json())
        .then((data) => {
            const latest = data.filter(release => !release.draft && !release.prerelease)[0];
            const releaseInfo = {
                url: latest.html_url,
                body: latest.body,
                version: latest.tag_name,
                releaseTitle: latest.name,
                publishDate: latest.published_at,
                winInstaller: {
                    name: 'LaF_Setup_Windows.exe',
                    url: latest.assets.filter(asset => asset.name === 'LaF_Setup_Windows.exe')[0].browser_download_url,
                    size: Math.round(latest.assets.filter(asset => asset.name === 'LaF_Setup_Windows.exe')[0].size / (1024 ** 2) * 10) / 10 + 'MB'
                },
                macInstaller: {
                    name: 'LaF_Setup_macOS_x64.dmg',
                    url: latest.assets.filter(asset => asset.name === 'LaF_Setup_macOS_x64.dmg')[0].browser_download_url,
                    size: Math.round(latest.assets.filter(asset => asset.name === 'LaF_Setup_macOS_x64.dmg')[0].size / (1024 ** 2) * 10) / 10 + 'MB'
                },
                linuxInstaller: {
                    name: 'LaF_Setup_Linux_x86_64.AppImage',
                    url: latest.assets.filter(asset => asset.name === 'LaF_Setup_Linux_x86_64.AppImage')[0].browser_download_url,
                    size: Math.round(latest.assets.filter(asset => asset.name === 'LaF_Setup_Linux_x86_64.AppImage')[0].size / (1024 ** 2) * 10) / 10 + 'MB'
                },
            };
            const ua = window.navigator.userAgent.toLowerCase();
            const os = ua.match(/(windows nt|mac os x|linux)/)[0];
            const platformElements = [
                {
                    logo: document.getElementById('mpLogo'),
                    name: document.getElementById('mpOS'),
                    size: document.getElementById('mpSize'),
                    bit: document.getElementById('mpBit')
                },
                {
                    logo: document.getElementById('spLogo1'),
                    name: document.getElementById('spOS1'),
                    size: document.getElementById('spSize1'),
                    bit: document.getElementById('spBit1')
                },
                {
                    logo: document.getElementById('spLogo2'),
                    name: document.getElementById('spOS2'),
                    size: document.getElementById('spSize2'),
                    bit: document.getElementById('spBit2')
                }
            ];
            const platforms = [os].concat(['windows nt', 'mac os x', 'linux'].filter(item => item !== os));
            const osInfo = {
                'windows nt': ['./img/windows.svg', 'Windows', '32/64bit', releaseInfo.winInstaller],
                'mac os x': ['./img/apple.svg', 'macOS', '64bit', releaseInfo.macInstaller],
                'linux': ['./img/linux.svg', 'Linux', '64bit', releaseInfo.linuxInstaller]
            };
            Object.values(platformElements).forEach((e, i) => {
                const platform = platforms[i];
                e.logo.setAttribute('src', osInfo[platform][0]);
                e.name.innerText = osInfo[platform][1];
                e.size.innerText = osInfo[platform][3].size;
                e.bit.innerText = osInfo[platform][2];
                e.logo.parentElement.onclick = (evt) => {
                    evt.preventDefault();
                    downloadFile(osInfo[platform][3].url);
                }
            });

            document.getElementById('releaseLink').setAttribute('href', releaseInfo.url);
            document.getElementById('releaseBadge').setAttribute('src', `https://img.shields.io/badge/${ releaseInfo.version }-Release%20Note?labelColor=202225&color=006699&label=Release%20Note`);
            document.getElementById('versionText').innerText = releaseInfo.version;
            document.getElementById('iconHolder').style.animationPlayState = 'running';

            setTimeout(() => {
                document.getElementById('iconHolder').style.display = 'none';
                document.getElementById('releaseInfo').style.animationPlayState = 'running';
                document.getElementById('badges').style.animationPlayState = 'running';
                setTimeout(() => {
                    document.getElementById('releaseInfo').style.display = 'flex';
                    document.getElementById('badges').style.display = 'block';
                }, 490);
            }, 490);
        });
    }
})();